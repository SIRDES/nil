import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import { checkAuth } from '@/lib/auth-utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/messages/[id]
 * Update a message by its MongoDB _id.
 * Used by admins to change status (New → Read → Resolved)
 * and optionally set resolvedBy.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await checkAuth();
    if (session instanceof NextResponse) return session;

    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    // Only allow updating specific admin-controlled fields
    const allowedUpdates: Record<string, unknown> = {};

    if (body.status) allowedUpdates.status = body.status;
    if (body.resolvedBy) allowedUpdates.resolvedBy = body.resolvedBy;

    if (Object.keys(allowedUpdates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update. Allowed: status, resolvedBy.' },
        { status: 400 }
      );
    }

    const message = await Message.findByIdAndUpdate(id, allowedUpdates, {
      new: true,
      runValidators: true,
    });

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.error('Error updating message:', error);

    // Handle Mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }

    // Handle invalid ObjectId format
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid message ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/messages/[id]
 * Remove a message by its MongoDB _id.
 * Used by admins to trash old messages.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await checkAuth();
    if (session instanceof NextResponse) return session;

    await dbConnect();

    const { id } = await params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);

    // Handle invalid ObjectId format
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid message ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}

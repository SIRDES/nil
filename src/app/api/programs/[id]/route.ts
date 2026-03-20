import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Program from '@/models/Program';
import { checkAuth } from '@/lib/auth-utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/programs/[id]
 * Fetch a single program by its MongoDB _id.
 * Used by the public program detail page.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { id } = await params;

    const program = await Program.findById(id).lean();

    if (!program) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(program, { status: 200 });
  } catch (error) {
    console.error('Error fetching program:', error);

    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid program ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch program' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/programs/[id]
 * Update an existing program by its MongoDB _id.
 * Expects JSON body with the fields to update.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await checkAuth();
    if (session instanceof NextResponse) return session;

    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    const program = await Program.findByIdAndUpdate(id, body, {
      new: true,          // Return the updated document
      runValidators: true, // Run Mongoose schema validators on update
    });

    if (!program) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(program, { status: 200 });
  } catch (error) {
    console.error('Error updating program:', error);

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
        { error: 'Invalid program ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update program' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/programs/[id]
 * Remove a program by its MongoDB _id.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await checkAuth();
    if (session instanceof NextResponse) return session;

    await dbConnect();

    const { id } = await params;

    const program = await Program.findByIdAndDelete(id);

    if (!program) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Program deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting program:', error);

    // Handle invalid ObjectId format
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid program ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete program' },
      { status: 500 }
    );
  }
}

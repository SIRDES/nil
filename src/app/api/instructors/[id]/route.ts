import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Instructor from '@/models/Instructor';
import Program from '@/models/Program';
import { checkAuth } from '@/lib/auth-utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/instructors/[id]
 * Fetch a single instructor by their MongoDB _id.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { id } = await params;

    const instructor = await Instructor.findById(id).populate('assignedPrograms', 'name');

    if (!instructor) {
      return NextResponse.json({ error: 'Instructor not found' }, { status: 404 });
    }

    return NextResponse.json(instructor, { status: 200 });
  } catch (error) {
    console.error('Error fetching instructor:', error);

    // Handle invalid ObjectId format
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json({ error: 'Invalid instructor ID format' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to fetch instructor' }, { status: 500 });
  }
}

/**
 * PUT /api/instructors/[id]
 * Update an existing instructor by their MongoDB _id.
 * Expects JSON body with the fields to update
 * (e.g. availabilityStatus, bio, assignedPrograms).
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await checkAuth();
    if (session instanceof NextResponse) return session;

    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    const instructor = await Instructor.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate('assignedPrograms', 'name category duration');

    if (!instructor) {
      return NextResponse.json(
        { error: 'Instructor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(instructor, { status: 200 });
  } catch (error) {
    console.error('Error updating instructor:', error);

    // Handle duplicate email on update
    if (
      error instanceof Error &&
      'code' in error &&
      (error as Record<string, unknown>).code === 11000
    ) {
      return NextResponse.json(
        { error: 'An instructor with this email already exists' },
        { status: 409 }
      );
    }

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
        { error: 'Invalid instructor ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update instructor' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/instructors/[id]
 * Remove an instructor by their MongoDB _id.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await checkAuth();
    if (session instanceof NextResponse) return session;

    await dbConnect();

    const { id } = await params;

    const instructor = await Instructor.findByIdAndDelete(id);

    if (!instructor) {
      return NextResponse.json(
        { error: 'Instructor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Instructor deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting instructor:', error);

    // Handle invalid ObjectId format
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid instructor ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete instructor' },
      { status: 500 }
    );
  }
}

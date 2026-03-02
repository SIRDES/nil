import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/admins/[id]
 * Update an admin user's role, status, or other profile fields.
 * Does NOT allow updating the password through this endpoint.
 * Excludes passwordHash from the response.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    // Prevent password updates through this endpoint
    // (a separate "Reset Password" flow should handle that)
    delete body.passwordHash;
    delete body.password;

    const admin = await AdminUser.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).select('-passwordHash');

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(admin, { status: 200 });
  } catch (error) {
    console.error('Error updating admin:', error);

    // Handle duplicate email on update
    if (
      error instanceof Error &&
      'code' in error &&
      (error as Record<string, unknown>).code === 11000
    ) {
      return NextResponse.json(
        { error: 'An admin user with this email already exists' },
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
        { error: 'Invalid admin user ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update admin user' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admins/[id]
 * Remove an admin user from the system.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { id } = await params;

    const admin = await AdminUser.findByIdAndDelete(id);

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Admin user deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting admin:', error);

    // Handle invalid ObjectId format
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid admin user ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete admin user' },
      { status: 500 }
    );
  }
}

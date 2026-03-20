import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Registration from '@/models/Registration';
import Program from '@/models/Program';
import { withAuth } from '@/lib/auth-utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/register/[id]
 * Update an existing registration by its MongoDB _id.
 * Admins use this to change status (Pending → Enrolled),
 * toggle paymentReceived, and update internalNotes.
 */
// export const GET = withAuth(async () => {

// export async function PUT(request: NextRequest, { params }: RouteParams) {
//   try {
//     await dbConnect();

//     const { id } = await params;
//     const body = await request.json();

//     const registration = await Registration.findByIdAndUpdate(id, body, {
//       new: true,
//       runValidators: true,
//     }).populate('programId', 'name category duration price');

//     if (!registration) {
//       return NextResponse.json(
//         { error: 'Registration not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(registration, { status: 200 });
//   } catch (error) {
//     console.error('Error updating registration:', error);

//     // Handle Mongoose validation errors
//     if (error instanceof Error && error.name === 'ValidationError') {
//       return NextResponse.json(
//         { error: 'Validation failed', details: error.message },
//         { status: 400 }
//       );
//     }

//     // Handle invalid ObjectId format
//     if (error instanceof Error && error.name === 'CastError') {
//       return NextResponse.json(
//         { error: 'Invalid registration ID format' },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { error: 'Failed to update registration' },
//       { status: 500 }
//     );
//   }
// }

export const PUT = withAuth(async (request: NextRequest, { params }: RouteParams) => {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    const registration = await Registration.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate('programId', 'name category duration price');

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(registration, { status: 200 });
  } catch (error) {
    console.error('Error updating registration:', error);

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
        { error: 'Invalid registration ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update registration' },
      { status: 500 }
    );
  }
})

/**
 * DELETE /api/register/[id]
 * Remove a registration record by its MongoDB _id.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { id } = await params;

    const registration = await Registration.findByIdAndDelete(id);

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Registration deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting registration:', error);

    // Handle invalid ObjectId format
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid registration ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete registration' },
      { status: 500 }
    );
  }
}

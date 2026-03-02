import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Registration from '@/models/Registration';
import Program from '@/models/Program';

/**
 * Calculates age from a date of birth.
 */
function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * GET /api/register
 * Fetch all registrations for the admin dashboard.
 * Populates the programId field to display the program name.
 */
export async function GET() {
  try {
    await dbConnect();

    const registrations = await Registration.find({})
      .populate('programId', 'name category duration price')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(registrations, { status: 200 });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/register
 * Create a new registration from the public website wizard
 * or the admin "Add Registration" modal.
 *
 * Crucial: If the program is "Mature Entrance", validates that
 * dateOfBirth is provided and the applicant is 25+ years old.
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate required fields
    const { firstName, lastName, email, phone, location, programId } = body;

    if (!firstName || !lastName || !email || !phone || !location || !programId) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: 'firstName, lastName, email, phone, location, and programId are required.',
        },
        { status: 400 }
      );
    }

    // ── Mature Entrance Age Validation ──
    // Look up the program to check if it's a Mature Entrance program
    const program = await Program.findById(programId).lean();

    if (!program) {
      return NextResponse.json(
        { error: 'Invalid programId — program not found' },
        { status: 400 }
      );
    }

    const isMatureEntrance =
      program.name?.toLowerCase().includes('mature entrance') ||
      program.category?.toLowerCase().includes('mature entrance');

    if (isMatureEntrance) {
      if (!body.dateOfBirth) {
        return NextResponse.json(
          {
            error: 'Date of birth is required',
            details: 'The Mature Entrance program requires a valid date of birth for age verification.',
          },
          { status: 400 }
        );
      }

      const age = calculateAge(new Date(body.dateOfBirth));

      if (age < 25) {
        return NextResponse.json(
          {
            error: 'Age requirement not met',
            details: `Applicants for the Mature Entrance program must be at least 25 years old. Calculated age: ${age}.`,
          },
          { status: 400 }
        );
      }
    }

    const registration = await Registration.create(body);

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error('Error creating registration:', error);

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
        { error: 'Invalid programId format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create registration' },
      { status: 500 }
    );
  }
}

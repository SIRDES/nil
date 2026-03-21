import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Instructor from '@/models/Instructor';
import Program from '@/models/Program';
import { checkAuth } from '@/lib/auth-utils';

/**
 * GET /api/instructors
 * Fetch all instructors with populated program names.
 * Used by both the public website and admin dashboard.
 */
export async function GET() {
 try {
 await dbConnect();

 const instructors = await Instructor.find({})
 .populate('assignedPrograms', 'name category duration')
 .sort({ createdAt: -1 })
 .lean();

 return NextResponse.json(instructors, { status: 200 });
 } catch (error) {
 console.error('Error fetching instructors:', error);
 return NextResponse.json(
 { error: 'Failed to fetch instructors' },
 { status: 500 }
 );
 }
}

/**
 * POST /api/instructors
 * Create a new instructor profile from the admin dashboard.
 * Expects JSON body with instructor fields.
 * Returns 201 on success.
 */
export async function POST(request: NextRequest) {
 try {
 const session = await checkAuth();
 if (session instanceof NextResponse) return session;

 await dbConnect();

 const body = await request.json();

 // Validate required fields
 const { firstName, lastName, email, professionalTitle } = body;

 if (!firstName || !lastName || !email || !professionalTitle) {
 return NextResponse.json(
 {
 error: 'Missing required fields',
 details: 'firstName, lastName, email, and professionalTitle are required.',
 },
 { status: 400 }
 );
 }

 const instructor = await Instructor.create(body);

 return NextResponse.json(instructor, { status: 201 });
 } catch (error) {
 console.error('Error creating instructor:', error);

 // Handle duplicate email
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

 return NextResponse.json(
 { error: 'Failed to create instructor' },
 { status: 500 }
 );
 }
}

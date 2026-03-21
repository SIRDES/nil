import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Program from '@/models/Program';
import { checkAuth } from '@/lib/auth-utils';

/**
 * GET /api/programs
 * Fetch all programs, sorted by newest first.
 * Used by both the public website and admin dashboard.
 */
export async function GET() {
 try {
 await dbConnect();

 const programs = await Program.aggregate([
 {
 $lookup: {
 from: 'registrations',
 localField: '_id',
 foreignField: 'programId',
 as: 'registrations',
 }
 },
 {
 $addFields: {
 activeStudents: {
 $size: {
 $filter: {
 input: '$registrations',
 as: 'reg',
 cond: { $in: ['$$reg.status', ['Enrolled', 'Pending']] }
 }
 }
 }
 }
 },
 { $project: { registrations: 0 } },
 { $sort: { createdAt: -1 } }
 ]);

 return NextResponse.json(programs, { status: 200 });
 } catch (error) {
 console.error('Error fetching programs:', error);
 return NextResponse.json(
 { error: 'Failed to fetch programs' },
 { status: 500 }
 );
 }
}

/**
 * POST /api/programs
 * Create a new program from the admin "Add New Program" form.
 * Expects JSON body with program fields.
 * Returns 201 on success.
 */
export async function POST(request: NextRequest) {
 try {
 const session = await checkAuth();
 if (session instanceof NextResponse) return session;

 await dbConnect();

 const body = await request.json();

 // Validate required fields
 const { name, description, duration, price } = body;

 if (!name || !description || !duration || price == null) {
 return NextResponse.json(
 {
 error: 'Missing required fields',
 details: 'name, description, duration, and price are required.',
 },
 { status: 400 }
 );
 }

 const program = await Program.create(body);

 return NextResponse.json(program, { status: 201 });
 } catch (error) {
 console.error('Error creating program:', error);

 // Handle Mongoose validation errors
 if (error instanceof Error && error.name === 'ValidationError') {
 return NextResponse.json(
 { error: 'Validation failed', details: error.message },
 { status: 400 }
 );
 }

 return NextResponse.json(
 { error: 'Failed to create program' },
 { status: 500 }
 );
 }
}

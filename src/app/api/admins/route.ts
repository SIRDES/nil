import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';

const SALT_ROUNDS = 12;

/**
 * GET /api/admins
 * Fetch all admin users for the admin dashboard.
 * Excludes passwordHash from the response for security.
 */
export async function GET() {
  try {
    await dbConnect();

    const admins = await AdminUser.find({})
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin users' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admins
 * Create a new admin user from the "Add New Admin" form.
 * Hashes the temporary password with bcryptjs before saving.
 * Returns 409 on duplicate email.
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    const { firstName, lastName, email, password, role } = body;
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: 'firstName, lastName, email, and password are required.',
        },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Hash the temporary password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const admin = await AdminUser.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role: role || 'Support',
      status: body.status || 'Pending',
      avatarUrl: body.avatarUrl || undefined,
    });

    // Return the created admin without the password hash
    const adminResponse = await AdminUser.findById(admin._id)
      .select('-passwordHash')
      .lean();

    return NextResponse.json(adminResponse, { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);

    // Handle duplicate email (MongoDB unique constraint)
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

    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}

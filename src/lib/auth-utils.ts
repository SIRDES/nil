import { NextResponse } from 'next/server';
import { auth } from '@/auth';

/**
 * Flexible authentication check for API route handlers.
 * Returns the session if authorized, or a NextResponse (401/403/500) if not.
 * 
 * Usage:
 * const session = await checkAuth();
 * if (session instanceof NextResponse) return session;
 */
export async function checkAuth(options?: { roles?: string[] }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Optional: Check for specific roles if provided
    if (options?.roles && options.roles.length > 0) {
      const userRole = (session.user as any).role;
      if (!options.roles.includes(userRole)) {
        return NextResponse.json(
          { message: 'Forbidden: Insufficient permissions' },
          { status: 403 }
        );
      }
    }

    return session;
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
  

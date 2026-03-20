import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

/**
 * Higher-order function to protect API route handlers.
 * Checks for a valid session and optional role requirements.
 * 
 * @param handler - The original Next.js route handler.
 * @param options - Configuration for protection (e.g., allowed roles).
 * @returns A wrapped handler with authentication logic.
 */
export function withAuth(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>,
  options?: { roles?: string[] }
) {
  return async (request: NextRequest, ...args: any[]) => {
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

      // Call the original handler if authorized
      return await handler(request, ...args);
    } catch (error) {
      console.error('Auth check error:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  };
}

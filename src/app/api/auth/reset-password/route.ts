import { NextRequest, NextResponse } from 'next/server';
import { resetPassword } from '@/lib/api/auth';
import { handleApiError } from '@/lib/api/middleware';

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const result = await resetPassword(token, newPassword);

    return NextResponse.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid or expired reset token') {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }
    return handleApiError(error, 'Reset password');
  }
}
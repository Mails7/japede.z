import { NextRequest, NextResponse } from 'next/server';
import { createPasswordResetToken } from '@/lib/api/auth';
import { handleApiError } from '@/lib/api/middleware';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const resetToken = await createPasswordResetToken(email);

    console.log(`Password reset token for ${email}: ${resetToken}`);

    return NextResponse.json({
      success: true,
      message: 'Password reset token created. Check your email.',
      token: process.env.NODE_ENV === 'development' ? resetToken : undefined
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      return NextResponse.json(
        { error: 'If this email exists in our system, you will receive a reset link.' },
        { status: 200 }
      );
    }
    return handleApiError(error, 'Forgot password');
  }
}
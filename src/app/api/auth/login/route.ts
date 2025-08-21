import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/api/auth';
import { handleApiError } from '@/lib/api/middleware';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await authenticateUser(email, password);

    return NextResponse.json({
      success: true,
      token: result.token,
      user: result.user
    });
  } catch (error) {
    return handleApiError(error, 'Login');
  }
}
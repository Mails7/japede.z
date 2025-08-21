import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/api/auth';
import { handleApiError } from '@/lib/api/middleware';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const result = await createUser({
      email,
      password,
      name,
      phone
    });

    return NextResponse.json({
      success: true,
      user: result.user
    });
  } catch (error) {
    return handleApiError(error, 'Register');
  }
}
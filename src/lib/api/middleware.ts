import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/api/auth';
import type { User } from '@/types';

export interface AuthenticatedRequest extends NextRequest {
  user?: User;
}

export async function requireAuth(request: NextRequest): Promise<User | NextResponse> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.substring(7);
  const user = await getUserFromToken(token);
  
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  return user;
}

export async function requireAdmin(request: NextRequest): Promise<User | NextResponse> {
  const userOrResponse = await requireAuth(request);
  
  if (userOrResponse instanceof NextResponse) {
    return userOrResponse;
  }

  if (!userOrResponse.profile?.isAdmin) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  return userOrResponse;
}

export function handleApiError(error: any, context: string) {
  console.error(`${context} error:`, error);
  
  if (error instanceof Error) {
    if (error.message === 'User not found') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (error.message === 'Invalid credentials') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    if (error.message === 'User already exists') {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
  }
  
  return NextResponse.json({ error: `Failed to ${context.toLowerCase()}` }, { status: 500 });
}
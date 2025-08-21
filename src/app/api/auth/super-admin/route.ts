import { NextRequest, NextResponse } from 'next/server';
import { createSuperAdmin } from '@/lib/api/auth';
import { db } from '@/lib/db';
import { handleApiError } from '@/lib/api/middleware';

export async function POST(request: NextRequest) {
  try {
    const result = await createSuperAdmin();

    return NextResponse.json({
      success: true,
      message: result.message,
      user: result.user
    });
  } catch (error) {
    return handleApiError(error, 'Super admin creation');
  }
}

export async function GET() {
  try {
    const superAdmin = await db.user.findFirst({
      where: {
        profile: {
          isAdmin: true
        }
      },
      include: {
        profile: true
      }
    });

    return NextResponse.json({
      exists: !!superAdmin,
      user: superAdmin ? {
        id: superAdmin.id,
        email: superAdmin.email,
        name: superAdmin.name,
        profile: superAdmin.profile
      } : null
    });
  } catch (error) {
    return handleApiError(error, 'Check super admin');
  }
}
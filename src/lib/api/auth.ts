import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import type { JWTPayload, User, AuthResponse } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: { profile: true }
    });

    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      isAdmin: user.profile?.isAdmin || false
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile: user.profile
      }
    };
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export async function createUser(userData: {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  isAdmin?: boolean;
}) {
  try {
    const existingUser = await db.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(userData.password);

    const user = await db.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        phone: userData.phone
      }
    });

    const profile = await db.profile.create({
      data: {
        userId: user.id,
        fullName: userData.name,
        phone: userData.phone,
        email: userData.email,
        isAdmin: userData.isAdmin || false
      }
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile
      }
    };
  } catch (error) {
    console.error('User creation error:', error);
    throw error;
  }
}

export async function createSuperAdmin() {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
  const superAdminName = process.env.SUPER_ADMIN_NAME;

  if (!superAdminEmail || !superAdminPassword) {
    throw new Error('Super admin credentials not configured');
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email: superAdminEmail },
      include: { profile: true }
    });

    if (existingUser && existingUser.profile?.isAdmin) {
      return { message: 'Super admin already exists' };
    }

    const result = await createUser({
      email: superAdminEmail,
      password: superAdminPassword,
      name: superAdminName,
      isAdmin: true
    });

    return { 
      message: 'Super admin created successfully',
      user: result.user 
    };
  } catch (error) {
    console.error('Super admin creation error:', error);
    throw error;
  }
}

export async function getUserFromToken(token: string) {
  try {
    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    const user = await db.user.findUnique({
      where: { id: payload.userId },
      include: { profile: true }
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profile: user.profile
    };
  } catch (error) {
    console.error('Get user from token error:', error);
    return null;
  }
}

export async function createPasswordResetToken(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
    
    const expiresAt = new Date(Date.now() + 3600000);

    await db.passwordResetToken.deleteMany({
      where: { email }
    });

    await db.passwordResetToken.create({
      data: {
        email,
        token: resetToken,
        expiresAt
      }
    });

    return resetToken;
  } catch (error) {
    console.error('Create password reset token error:', error);
    throw error;
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    const resetToken = await db.passwordResetToken.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date()
        }
      }
    });

    if (!resetToken) {
      throw new Error('Invalid or expired reset token');
    }

    const hashedPassword = await hashPassword(newPassword);

    await db.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword }
    });

    await db.passwordResetToken.delete({
      where: { id: resetToken.id }
    });

    return { message: 'Password reset successfully' };
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
}
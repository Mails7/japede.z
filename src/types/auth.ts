export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  profile?: Profile;
}

export interface Profile {
  id: string;
  userId: string;
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  addressReference?: string;
  notes?: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  isAdmin?: boolean;
}
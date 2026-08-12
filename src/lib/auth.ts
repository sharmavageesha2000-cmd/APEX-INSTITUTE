import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { getUserByEmail } from './store';
import { User, Role } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-training-institute-2026';
const TOKEN_NAME = 'institute_auth_token';

export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
  role: Role;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // If stored in seed plaintext for easy testing, fallback comparison
  if (password === hash) return true;
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    return password === hash;
  }
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = await getUserByEmail(decoded.email);
  return user;
}

export function getAuthTokenCookieName() {
  return TOKEN_NAME;
}

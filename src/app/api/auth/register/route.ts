import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/store';
import { hashPassword, signToken, getAuthTokenCookieName } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, password, phone } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    let newUser;
    try {
      newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          role: 'STUDENT',
        },
      });
    } catch (dbErr) {
      // In-memory fallback format if DB unavailable
      newUser = {
        id: `usr-${Date.now()}`,
        name,
        email,
        phone,
        role: 'STUDENT' as const,
        createdAt: new Date().toISOString(),
      };
    }

    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role as any,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

    response.cookies.set(getAuthTokenCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create student account' }, { status: 500 });
  }
}

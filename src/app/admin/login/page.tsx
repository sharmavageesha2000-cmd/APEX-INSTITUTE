import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { AdminLoginClientView } from '@/components/auth/AdminLoginClientView';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Sign In | Apex Tech Institute',
  description: 'Restricted administrative sign in for Apex Tech Institute management.',
};

export default async function AdminLoginPage() {
  const user = await getCurrentUser();

  // If already authenticated as ADMIN, go straight to /admin
  if (user && user.role === 'ADMIN') {
    redirect('/admin');
  }

  return (
    <div className="py-16 max-w-md mx-auto px-4 min-h-[75vh] flex flex-col justify-center">
      <AdminLoginClientView />
    </div>
  );
}

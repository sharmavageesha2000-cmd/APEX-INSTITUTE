import React from 'react';
import { LoginClientView } from '@/components/auth/LoginClientView';

export const metadata = {
  title: 'Portal Sign In | Apex Tech Institute',
  description: 'Student and Faculty Portal sign in for Apex Tech Institute.',
};

interface LoginPageProps {
  searchParams: {
    redirect?: string;
    tab?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const initialTab = searchParams.tab === 'faculty' ? 'FACULTY' : 'STUDENT';

  return (
    <div className="py-12 max-w-md mx-auto px-4">
      <LoginClientView redirectUrl={searchParams.redirect} defaultTab={initialTab} />
    </div>
  );
}

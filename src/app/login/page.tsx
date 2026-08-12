import React from 'react';
import { LoginClientView } from '@/components/auth/LoginClientView';

interface LoginPageProps {
  searchParams: {
    redirect?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <div className="py-12 max-w-md mx-auto px-4">
      <LoginClientView redirectUrl={searchParams.redirect} />
    </div>
  );
}

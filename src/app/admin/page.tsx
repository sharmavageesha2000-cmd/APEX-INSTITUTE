import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import {
  getDomains,
  getCourses,
  getEnquiries,
  getUsers,
  getAllEnrollments,
  getBlogs,
  getEvents,
  getSiteSettings,
} from '@/lib/store';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const [
    domains,
    courses,
    enquiries,
    users,
    enrollments,
    blogs,
    events,
    settings,
  ] = await Promise.all([
    getDomains(),
    getCourses(),
    getEnquiries(),
    getUsers(),
    getAllEnrollments(),
    getBlogs(),
    getEvents(),
    getSiteSettings(),
  ]);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <AdminDashboardClient
        initialTab={searchParams?.tab}
        initialDomains={domains}
        initialCourses={courses}
        initialEnquiries={enquiries}
        initialUsers={users}
        initialEnrollments={enrollments}
        initialBlogs={blogs}
        initialEvents={events}
        initialSettings={settings}
      />
    </div>
  );
}

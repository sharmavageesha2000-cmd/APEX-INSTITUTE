'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Enrollment, Enquiry, Course } from '@/lib/types';
import {
  GraduationCap,
  BookOpen,
  User as UserIcon,
  Award,
  Download,
  Bell,
  Settings,
  HelpCircle,
  Calendar,
  LogOut,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bookmark,
  FileText,
  Edit,
  Save,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface StudentDashboardClientProps {
  user: User;
  enrollments: Enrollment[];
  enquiries: Enquiry[];
  savedCourses?: Course[];
}

export const StudentDashboardClient: React.FC<StudentDashboardClientProps> = ({
  user,
  enrollments,
  enquiries,
  savedCourses = [],
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'ENROLLED' | 'PROFILE' | 'CLASSES' | 'ANNOUNCEMENTS' | 'CERTIFICATES' | 'DOWNLOADS' | 'SAVED' | 'ENQUIRIES' | 'SETTINGS'
  >('ENROLLED');

  const [editProfileMode, setEditProfileMode] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    phone: user.phone || '',
    city: user.city || '',
    education: user.education || 'B.Tech / BE',
    graduationYear: user.graduationYear || '2025',
    careerInterest: user.careerInterest || 'Information Technology',
  });

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditProfileMode(false);
    alert('Profile information updated successfully!');
  };

  return (
    <div className="space-y-8">
      {/* 12. WELCOME BANNER */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 p-6 sm:p-8 rounded-3xl border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-md shadow-pink-500/20 shrink-0">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">Welcome back, {user.name}!</h1>
              <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-purple-200">
                ACTIVE STUDENT
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              {user.email} • {user.city || 'Bangalore'} • Track your progress & live classes below.
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* DASHBOARD TABS NAVIGATION */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-purple-100 shadow-sm overflow-x-auto scrollbar-none text-xs font-bold">
        {[
          { id: 'ENROLLED', label: 'My Courses', icon: BookOpen },
          { id: 'CLASSES', label: 'Upcoming Classes', icon: Calendar },
          { id: 'CERTIFICATES', label: 'Certificates', icon: Award },
          { id: 'DOWNLOADS', label: 'Downloads', icon: Download },
          { id: 'SAVED', label: 'Saved Courses', icon: Bookmark },
          { id: 'ENQUIRIES', label: 'My Enquiries', icon: HelpCircle },
          { id: 'ANNOUNCEMENTS', label: 'Notices', icon: Bell },
          { id: 'PROFILE', label: 'My Profile', icon: UserIcon },
          { id: 'SETTINGS', label: 'Settings', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bright-btn-primary'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENTS */}
      {/* 1. ENROLLED COURSES WITH PROGRESS INDICATOR (e.g. Course Progress: 65%) */}
      {activeTab === 'ENROLLED' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Active Program Enrollments</h2>
            <Link href="/courses" className="text-xs font-bold text-purple-700 hover:underline">
              + Enroll in New Course
            </Link>
          </div>

          {enrollments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrollments.map((enr) => (
                <div key={enr.id} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {enr.status}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{enr.batchTiming}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base">{enr.courseTitle}</h3>

                  {/* COURSE PROGRESS INDICATOR REQUIREMENT */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">Course Progress</span>
                      <span className="text-purple-700">{enr.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                      <div
                        className="bg-gradient-to-r from-pink-600 to-purple-600 h-full rounded-full"
                        style={{ width: `${enr.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      href={`/courses/${enr.courseSlug || 'full-stack-mern-nextjs-masterclass'}`}
                      className="bright-btn-primary font-bold text-xs px-4 py-2 flex items-center gap-1"
                    >
                      <span>Continue Learning</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] text-slate-500 font-medium">Enrolled: {enr.enrolledAt.slice(0, 10)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-purple-100 space-y-3 shadow-sm">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <div className="text-sm font-bold text-slate-900">No active course enrollments</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                Explore our 50+ certification programs and enroll to start your learning journey.
              </p>
              <Link
                href="/courses"
                className="inline-block bright-btn-primary text-xs px-5 py-2.5"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      )}

      {/* 2. UPCOMING CLASSES */}
      {activeTab === 'CLASSES' && (
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span>Upcoming Live Zoom Batches & Labs</span>
          </h2>
          <div className="space-y-3">
            {[
              {
                title: 'Next.js 14 Server Actions & Microservices Live Lab',
                time: 'Today • 7:30 PM - 9:30 PM IST',
                instructor: 'Rohan Deshmukh (Ex-Amazon)',
                status: 'LIVE IN 2 HOURS',
              },
              {
                title: 'System Design & Database Query Tuning Session',
                time: 'Tomorrow • 7:30 PM - 9:30 PM IST',
                instructor: 'Rohan Deshmukh',
                status: 'SCHEDULED',
              },
            ].map((cls, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">{cls.title}</div>
                  <div className="text-slate-600 font-medium">{cls.time} • Mentored by {cls.instructor}</div>
                </div>
                <button
                  onClick={() => alert(`Launching Zoom classroom for: ${cls.title}`)}
                  className="bright-btn-primary font-bold text-xs px-4 py-2"
                >
                  Join Class Room
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CERTIFICATES */}
      {activeTab === 'CERTIFICATES' && (
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>ISO Verified Certification Credentials</span>
          </h2>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 max-w-md">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                ISO 9001:2026 VERIFIED
              </span>
              <span className="text-xs text-slate-500 font-medium">Issued</span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Full Stack Web Engineering Certificate</h3>
            <p className="text-xs text-slate-500 font-medium">Credential ID: APEX-CERT-2026-9812</p>
            <button
              onClick={() => alert('Downloading official PDF certificate bundle!')}
              className="w-full bright-btn-secondary text-xs py-2.5 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-purple-600" />
              <span>Download Verified Certificate PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. DOWNLOADS */}
      {activeTab === 'DOWNLOADS' && (
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-600" />
            <span>My Downloadable Study Resources & Code Kits</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              { title: 'Full Stack Interview Prep Handbook (45 Pages)', size: '4.2 MB PDF' },
              { title: 'System Design Architecture Blueprints & Terraform Templates', size: '12.8 MB ZIP' },
              { title: 'ATS Optimized Software Engineer Resume Template', size: '1.1 MB DOCX' },
            ].map((d, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-slate-900">{d.title}</div>
                  <div className="text-slate-500 font-medium">{d.size}</div>
                </div>
                <button
                  onClick={() => alert(`Downloading ${d.title}`)}
                  className="p-2 text-purple-700 hover:text-purple-900 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PROFILE (VIEW & EDIT PROFILE) */}
      {activeTab === 'PROFILE' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-purple-100 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Student Profile Information</h2>
            <button
              onClick={() => setEditProfileMode(!editProfileMode)}
              className="bright-btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>{editProfileMode ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>

          {editProfileMode ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">City</label>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Qualification</label>
                  <input
                    type="text"
                    value={profileForm.education}
                    onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bright-btn-primary font-bold text-xs px-6 py-2.5 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">Full Name:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.name}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">Email Address:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.email}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">Mobile Phone:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.phone || '+91 9123456789'}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">City / Location:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.city || 'Bangalore'}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">Qualification:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.education || 'B.Tech / BE'}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-medium">Career Interest:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{user.careerInterest || 'Information Technology'}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. MY ENQUIRIES */}
      {activeTab === 'ENQUIRIES' && (
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-600" />
            <span>Track Submitted Enquiries & Free Counselling Sessions</span>
          </h2>
          <div className="space-y-3 text-xs">
            {enquiries.length > 0 ? (
              enquiries.map((enq) => (
                <div key={enq.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">{enq.courseTitle || enq.domain || 'General Inquiry'}</span>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold border border-purple-200">
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium">{enq.message}</p>
                  {enq.notes && (
                    <div className="text-[11px] text-purple-800 bg-purple-50 p-2 rounded border border-purple-200 font-medium">
                      Counselor Note: {enq.notes}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-slate-500 text-center py-6 font-medium">No active enquiries submitted yet.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

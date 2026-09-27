'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Domain,
  Course,
  Enquiry,
  User,
  Enrollment,
  BlogPost,
  EventItem,
  SiteSettings,
} from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { getCourseImage } from '@/lib/mock-data';
import {
  Layers,
  BookOpen,
  Users,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Search,
  Filter,
  ShieldCheck,
  BarChart3,
  TrendingUp,
  FileText,
  Calendar,
  Settings,
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Save,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  UserCheck,
} from 'lucide-react';
import { DynamicIcon } from '../ui/IconHelper';

interface AdminDashboardClientProps {
  initialTab?: string;
  initialDomains: Domain[];
  initialCourses: Course[];
  initialEnquiries: Enquiry[];
  initialUsers: User[];
  initialEnrollments: Enrollment[];
  initialBlogs: BlogPost[];
  initialEvents: EventItem[];
  initialSettings: SiteSettings;
}

export const AdminDashboardClient: React.FC<AdminDashboardClientProps> = ({
  initialTab,
  initialDomains,
  initialCourses,
  initialEnquiries,
  initialUsers,
  initialEnrollments,
  initialBlogs,
  initialEvents,
  initialSettings,
}) => {
  const router = useRouter();

  // Normalize initialTab from URL or prop
  const getInitialActiveTab = (): 'ANALYTICS' | 'DOMAINS' | 'COURSES' | 'STUDENTS' | 'ENQUIRIES' | 'BLOGS_EVENTS' | 'SETTINGS' => {
    if (!initialTab) return 'ANALYTICS';
    const t = initialTab.toUpperCase();
    if (t === 'STUDENTS') return 'STUDENTS';
    if (t === 'COURSES') return 'COURSES';
    if (t === 'DOMAINS') return 'DOMAINS';
    if (t === 'ENQUIRIES' || t === 'TESTIMONIALS') return 'ENQUIRIES';
    if (t === 'BLOGS_EVENTS' || t === 'EVENTS' || t === 'BLOGS') return 'BLOGS_EVENTS';
    if (t === 'SETTINGS') return 'SETTINGS';
    return 'ANALYTICS';
  };

  const [activeTab, setActiveTab] = useState<'ANALYTICS' | 'DOMAINS' | 'COURSES' | 'STUDENTS' | 'ENQUIRIES' | 'BLOGS_EVENTS' | 'SETTINGS'>(
    getInitialActiveTab()
  );

  useEffect(() => {
    if (initialTab) {
      setActiveTab(getInitialActiveTab());
    }
  }, [initialTab]);

  const changeTab = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabId.toLowerCase());
      window.history.pushState({}, '', url.toString());
    }
  };

  const [domains, setDomains] = useState<Domain[]>(initialDomains);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSettings);

  // Filter students strictly (excluding administrators)
  const studentsOnly = users.filter((u) => u.role === 'STUDENT');
  const adminsOnly = users.filter((u) => u.role === 'ADMIN');

  // Student Tab view filters
  const [studentSearch, setStudentSearch] = useState('');
  const [studentSubView, setStudentSubView] = useState<'STUDENTS' | 'ENROLLMENTS' | 'STAFF'>('STUDENTS');

  // Blogs & Events SubTab
  const [blogsEventsSubTab, setBlogsEventsSubTab] = useState<'EVENTS' | 'BLOGS'>('EVENTS');

  // Modals state
  const [domainModalOpen, setDomainModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null);

  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  const [blogModalOpen, setBlogModalOpen] = useState(false);

  const [enquiryNotesModalOpen, setEnquiryNotesModalOpen] = useState(false);
  const [activeEnquiryForNotes, setActiveEnquiryForNotes] = useState<Enquiry | null>(null);
  const [notesText, setNotesText] = useState('');

  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState('');

  // Domain Form state
  const [domForm, setDomForm] = useState({
    name: '',
    slug: '',
    headline: '',
    description: '',
    iconName: 'Code',
    subcategoriesStr: '',
  });

  // Course Form state
  const [courseForm, setCourseForm] = useState({
    title: '',
    slug: '',
    headline: '',
    description: '',
    domainId: initialDomains[0]?.id || '',
    duration: '3 Months',
    fee: '35000',
    discountFee: '24999',
    level: 'Beginner to Advanced',
    mode: 'Live Online',
    badge: 'Trending',
  });

  // Event Form state
  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Workshops',
    date: 'Saturday, August 29, 2026',
    time: '11:00 AM - 1:00 PM IST',
    location: 'Live Zoom & Bangalore Campus',
    speakerName: 'Lead Tech Architect',
    speakerRole: 'Ex-FAANG Mentor',
    description: 'Immersive live session exploring hands-on architectures and real-world tools.',
  });

  // Blog Form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Career Guide',
    authorName: 'Apex Editorial Team',
    readTime: '5 min read',
    summary: '',
    content: '',
  });

  // Analytics Metrics
  const totalStudentsCount = studentsOnly.length;
  const totalRevenue = enrollments.reduce((acc, enr) => acc + (enr.course?.discountFee || enr.course?.fee || 35000), 0);

  // --- Handlers: Domains ---
  const handleOpenDomainModal = (dom?: Domain) => {
    if (dom) {
      setEditingDomain(dom);
      setDomForm({
        name: dom.name,
        slug: dom.slug,
        headline: dom.headline,
        description: dom.description,
        iconName: dom.iconName,
        subcategoriesStr: dom.subcategories.join(', '),
      });
    } else {
      setEditingDomain(null);
      setDomForm({
        name: '',
        slug: '',
        headline: '',
        description: '',
        iconName: 'Code',
        subcategoriesStr: '',
      });
    }
    setDomainModalOpen(true);
  };

  const handleSaveDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    const subcats = domForm.subcategoriesStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = domForm.slug || domForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingDomain) {
      await fetch(`/api/domains/${editingDomain.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...domForm, slug, subcategories: subcats }),
      });
      setDomains((prev) =>
        prev.map((d) => (d.id === editingDomain.id ? { ...d, ...domForm, slug, subcategories: subcats } : d))
      );
    } else {
      const res = await fetch('/api/domains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...domForm, slug, subcategories: subcats }),
      });
      const data = await res.json();
      if (data.domain) {
        setDomains((prev) => [...prev, data.domain]);
      }
    }

    setDomainModalOpen(false);
    router.refresh();
  };

  const handleDeleteDomain = async (id: string) => {
    if (!confirm('Are you sure you want to delete this domain?')) return;
    await fetch(`/api/domains/${id}`, { method: 'DELETE' });
    setDomains((prev) => prev.filter((d) => d.id !== id));
    router.refresh();
  };

  // --- Handlers: Courses ---
  const handleOpenCourseModal = (crs?: Course) => {
    if (crs) {
      setEditingCourse(crs);
      setCourseForm({
        title: crs.title,
        slug: crs.slug,
        headline: crs.headline,
        description: crs.description,
        domainId: crs.domainId,
        duration: crs.duration,
        fee: String(crs.fee),
        discountFee: crs.discountFee ? String(crs.discountFee) : '',
        level: crs.level,
        mode: crs.mode,
        badge: crs.badge || '',
      });
    } else {
      setEditingCourse(null);
      setCourseForm({
        title: '',
        slug: '',
        headline: '',
        description: '',
        domainId: domains[0]?.id || '',
        duration: '3 Months',
        fee: '35000',
        discountFee: '24999',
        level: 'Beginner to Advanced',
        mode: 'Live Online',
        badge: 'Trending',
      });
    }
    setCourseModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = courseForm.slug || courseForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const feeNum = Number(courseForm.fee);
    const discNum = courseForm.discountFee ? Number(courseForm.discountFee) : undefined;

    if (editingCourse) {
      await fetch(`/api/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...courseForm, slug, fee: feeNum, discountFee: discNum }),
      });
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id ? { ...c, ...courseForm, slug, fee: feeNum, discountFee: discNum } : c
        )
      );
    } else {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...courseForm, slug, fee: feeNum, discountFee: discNum }),
      });
      const data = await res.json();
      if (data.course) {
        setCourses((prev) => [data.course, ...prev]);
      }
    }

    setCourseModalOpen(false);
    router.refresh();
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    await fetch(`/api/courses/${id}`, { method: 'DELETE' });
    setCourses((prev) => prev.filter((c) => c.id !== id));
    router.refresh();
  };

  // --- Handlers: Enquiries ---
  const handleUpdateEnquiryStatus = async (id: string, newStatus: string) => {
    await fetch('/api/enquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });

    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus as any } : e))
    );
    router.refresh();
  };

  const handleSaveEnquiryNotes = async () => {
    if (!activeEnquiryForNotes) return;
    await fetch('/api/enquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: activeEnquiryForNotes.id,
        status: activeEnquiryForNotes.status,
        notes: notesText,
      }),
    });
    setEnquiries((prev) =>
      prev.map((e) => (e.id === activeEnquiryForNotes.id ? { ...e, notes: notesText } : e))
    );
    setEnquiryNotesModalOpen(false);
    router.refresh();
  };

  // --- Handlers: Students / Users ---
  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove student "${name}"? This will also remove their enrollment records.`)) {
      return;
    }
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setEnrollments((prev) => prev.filter((e) => e.userId !== id));
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to remove user');
    }
  };

  // --- Handlers: Events ---
  const handleOpenEventModal = (evt?: EventItem) => {
    if (evt) {
      setEditingEvent(evt);
      setEventForm({
        title: evt.title,
        category: evt.category || 'Workshops',
        date: evt.date,
        time: evt.time,
        location: evt.location,
        speakerName: evt.speakerName,
        speakerRole: evt.speakerRole,
        description: evt.description,
      });
    } else {
      setEditingEvent(null);
      setEventForm({
        title: '',
        category: 'Workshops',
        date: 'Saturday, August 29, 2026',
        time: '11:00 AM - 1:00 PM IST',
        location: 'Live Zoom & Bangalore Campus',
        speakerName: 'Lead Tech Architect',
        speakerRole: 'Ex-FAANG Mentor',
        description: 'Immersive live session exploring hands-on architectures and real-world tools.',
      });
    }
    setEventModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      const res = await fetch(`/api/events/${editingEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventForm),
      });
      if (res.ok) {
        setEvents((prev) =>
          prev.map((ev) => (ev.id === editingEvent.id ? { ...ev, ...eventForm } : ev))
        );
        router.refresh();
      }
    } else {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventForm),
      });
      const data = await res.json();
      if (data.event) {
        setEvents((prev) => [data.event, ...prev]);
        router.refresh();
      }
    }
    setEventModalOpen(false);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
    router.refresh();
  };

  // --- Handlers: Blogs ---
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogForm),
    });
    const data = await res.json();
    if (data.blog) {
      setBlogs((prev) => [data.blog, ...prev]);
      router.refresh();
    }
    setBlogModalOpen(false);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    router.refresh();
  };

  // --- Handlers: Site Settings ---
  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings),
      });
      if (res.ok) {
        setSettingsSuccessMsg('Site Contact & General Settings saved successfully!');
        router.refresh();
        setTimeout(() => setSettingsSuccessMsg(''), 4000);
      } else {
        alert('Failed to save settings.');
      }
    } catch (err) {
      alert('Failed to save settings.');
    } finally {
      setSettingsSaving(false);
    }
  };

  // Filtered students for Students tab
  const filteredStudents = studentsOnly.filter((s) => {
    const q = studentSearch.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || (s.phone && s.phone.includes(q));
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 p-6 sm:p-8 rounded-3xl border border-purple-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">Admin CMS Control Panel</h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                SUPER ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Manage 10 domains, courses, student registrations, enquiries, events, blogs & site configuration.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>View Live Site</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-purple-100 shadow-sm overflow-x-auto scrollbar-none text-xs font-bold">
        {[
          { id: 'ANALYTICS', label: 'Dashboard Overview', icon: BarChart3 },
          { id: 'STUDENTS', label: `Students (${studentsOnly.length})`, icon: Users },
          { id: 'COURSES', label: `Courses (${courses.length})`, icon: BookOpen },
          { id: 'DOMAINS', label: `Domains (${domains.length})`, icon: Layers },
          { id: 'ENQUIRIES', label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
          { id: 'BLOGS_EVENTS', label: `Blogs & Events (${events.length + blogs.length})`, icon: FileText },
          { id: 'SETTINGS', label: 'Site Settings', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => changeTab(tab.id as any)}
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

      {/* ========================================================================= */}
      {/* 1. ANALYTICS OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'ANALYTICS' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-1">
              <div className="text-xs font-bold text-slate-500">Registered Students</div>
              <div className="text-3xl font-black text-slate-900">{totalStudentsCount}</div>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Excludes admin staff
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-1">
              <div className="text-xs font-bold text-slate-500">Active Courses</div>
              <div className="text-3xl font-black text-purple-700">{courses.length}</div>
              <div className="text-[11px] text-slate-500 font-medium">Across {domains.length} domains</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-1">
              <div className="text-xs font-bold text-slate-500">Total Student Enquiries</div>
              <div className="text-3xl font-black text-amber-600">{enquiries.length}</div>
              <div className="text-[11px] text-slate-500 font-medium">Leads & counselling requests</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-1">
              <div className="text-xs font-bold text-slate-500">Seat Booking Deposits (₹2,000)</div>
              <div className="text-3xl font-black text-emerald-600">
                {formatCurrency(enrollments.reduce((acc, e) => acc + (e.registrationFeePaid || 2000), 0))}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {enrollments.length} confirmed seat registrations
              </div>
            </div>
          </div>

          {/* Recent Student Registrations Table (STRICTLY STUDENTS ONLY) */}
          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Recent Student Registrations</h2>
                <p className="text-xs text-slate-500 font-medium">Real registered learners enrolled in Apex programs</p>
              </div>
              <button
                onClick={() => changeTab('STUDENTS')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1"
              >
                <span>View Full Student Directory</span>
                <span>&rarr;</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="pb-3">Student Name</th>
                    <th className="pb-3">Email Address</th>
                    <th className="pb-3">Phone</th>
                    <th className="pb-3">City</th>
                    <th className="pb-3">Enrolled Courses</th>
                    <th className="pb-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentsOnly.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-500 font-medium">
                        No students registered yet.
                      </td>
                    </tr>
                  ) : (
                    studentsOnly.slice(0, 10).map((u) => {
                      const userEnrs = enrollments.filter((e) => e.userId === u.id);
                      return (
                        <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 font-extrabold text-slate-900 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-[10px] shrink-0 border border-purple-200">
                              {u.name.slice(0, 2).toUpperCase()}
                            </span>
                            <span>{u.name}</span>
                          </td>
                          <td className="py-3 font-medium text-slate-600">{u.email}</td>
                          <td className="py-3 font-medium text-slate-600">{u.phone || 'N/A'}</td>
                          <td className="py-3 font-medium text-slate-600">{u.city || 'Bangalore'}</td>
                          <td className="py-3 font-bold text-purple-700">
                            {userEnrs.length > 0 ? (
                              <span className="bg-purple-50 text-purple-800 px-2 py-0.5 rounded border border-purple-200 text-[11px]">
                                {userEnrs.length} {userEnrs.length === 1 ? 'Course' : 'Courses'}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px] font-normal">Direct Registration</span>
                            )}
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[10px]">
                              STUDENT
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. STUDENTS & ENROLLMENTS MANAGEMENT (PREVIOUSLY MISSING / BLANK) */}
      {/* ========================================================================= */}
      {activeTab === 'STUDENTS' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Student Directory & Enrollments</h2>
              <p className="text-xs text-slate-600 font-medium">
                Manage registered learners, view their course batches, and keep administrator accounts separate.
              </p>
            </div>

            {/* Sub-view switcher */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-purple-200 text-xs font-bold">
              <button
                onClick={() => setStudentSubView('STUDENTS')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  studentSubView === 'STUDENTS' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-purple-700'
                }`}
              >
                Students ({studentsOnly.length})
              </button>
              <button
                onClick={() => setStudentSubView('ENROLLMENTS')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  studentSubView === 'ENROLLMENTS' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-purple-700'
                }`}
              >
                Course Registrations ({enrollments.length})
              </button>
              <button
                onClick={() => setStudentSubView('STAFF')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  studentSubView === 'STAFF' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-purple-700'
                }`}
              >
                Admins ({adminsOnly.length})
              </button>
            </div>
          </div>

          {/* Sub-view: STUDENTS */}
          {studentSubView === 'STUDENTS' && (
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by student name, email, or phone..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Showing <span className="font-bold text-slate-800">{filteredStudents.length}</span> students
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold">
                      <th className="pb-3">Student</th>
                      <th className="pb-3">Contact Details</th>
                      <th className="pb-3">Location</th>
                      <th className="pb-3">Enrolled Courses</th>
                      <th className="pb-3">Account Status</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">
                          No students found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((u) => {
                        const userEnrs = enrollments.filter((e) => e.userId === u.id);
                        return (
                          <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 font-extrabold text-slate-900 flex items-center gap-2.5">
                              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-xs">
                                {u.name.slice(0, 2).toUpperCase()}
                              </span>
                              <div>
                                <div className="font-extrabold text-slate-900">{u.name}</div>
                                <div className="text-[10px] text-slate-400 font-medium">ID: {u.id}</div>
                              </div>
                            </td>
                            <td className="py-3">
                              <div className="font-medium text-slate-800">{u.email}</div>
                              <div className="text-[11px] text-slate-500 font-medium">{u.phone || 'Phone not provided'}</div>
                            </td>
                            <td className="py-3 font-medium text-slate-700">{u.city || 'Bangalore'}</td>
                            <td className="py-3">
                              {userEnrs.length > 0 ? (
                                <div className="space-y-1">
                                  {userEnrs.map((en) => (
                                    <div
                                      key={en.id}
                                      className="inline-block bg-purple-50 text-purple-900 border border-purple-200 px-2 py-0.5 rounded text-[10px] font-bold mr-1"
                                    >
                                      {en.courseTitle || en.course?.title || 'Program'}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-slate-400 text-[11px]">No active course</span>
                              )}
                            </td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[10px] inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                ACTIVE STUDENT
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => handleDeleteUser(u.id, u.name)}
                                title="Remove student"
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-view: ENROLLMENTS */}
          {studentSubView === 'ENROLLMENTS' && (
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm">Course Batch Enrollments Record</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold">
                      <th className="pb-3">Enrollment ID</th>
                      <th className="pb-3">Student & Contact</th>
                      <th className="pb-3">Course Program</th>
                      <th className="pb-3">Batch Schedule</th>
                      <th className="pb-3">Reg. Fee Paid</th>
                      <th className="pb-3">Balance Remaining</th>
                      <th className="pb-3">Enrolled Date</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enrollments.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-500 font-medium">
                          No course registrations found.
                        </td>
                      </tr>
                    ) : (
                      enrollments.map((enr) => {
                        const studentUser = users.find((u) => u.id === enr.userId);
                        const sName = enr.userName || studentUser?.name || `Student (${enr.userId.slice(-6)})`;
                        const sEmail = enr.userEmail || studentUser?.email || 'N/A';
                        const sPhone = enr.userPhone || studentUser?.phone || '';
                        const total = enr.totalFee || enr.course?.discountFee || enr.course?.fee || 28000;
                        const regPaid = enr.registrationFeePaid ?? 2000;
                        const remFee = enr.remainingFee ?? Math.max(0, total - regPaid);

                        return (
                          <tr key={enr.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 font-mono font-bold text-slate-500">{enr.id}</td>
                            <td className="py-3">
                              <div className="font-extrabold text-slate-900">{sName}</div>
                              <div className="text-[11px] text-slate-500">{sEmail}</div>
                              {sPhone && <div className="text-[10px] text-slate-400 font-mono">{sPhone}</div>}
                            </td>
                            <td className="py-3 font-bold text-purple-700">
                              {enr.courseTitle || enr.course?.title || 'Program'}
                            </td>
                            <td className="py-3 text-slate-600 font-medium text-[11px]">{enr.batchTiming || 'Mon-Fri Evening'}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[11px] inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {formatCurrency(regPaid)} {remFee === 0 || enr.paymentStatus === 'FULLY_PAID' ? '(FULL PAID)' : '(SEAT DEPOSIT)'}
                              </span>
                            </td>
                            <td className="py-3 font-extrabold text-slate-900">
                              {remFee === 0 || enr.paymentStatus === 'FULLY_PAID' ? (
                                <span className="text-emerald-700 text-[11px] font-bold">Cleared (₹0)</span>
                              ) : (
                                <span className="text-purple-700">{formatCurrency(remFee)}</span>
                              )}
                            </td>
                            <td className="py-3 text-slate-500 text-[11px]">{enr.enrolledAt ? enr.enrolledAt.slice(0, 10) : 'Recent'}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 font-bold border border-purple-200 text-[10px]">
                                {enr.status || 'ACTIVE'}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-view: ADMINISTRATORS & STAFF (SEPARATED FROM STUDENTS) */}
          {studentSubView === 'STAFF' && (
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Authorized Administrators & Faculty</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    These accounts have administrative control over courses, domains, and site data.
                  </p>
                </div>
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full border border-purple-200">
                  {adminsOnly.length} Admin User{adminsOnly.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {adminsOnly.map((adm) => (
                  <div
                    key={adm.id}
                    className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-extrabold text-slate-900 text-sm">{adm.name}</div>
                        <span className="text-[10px] font-black bg-purple-200 text-purple-900 px-2 py-0.5 rounded">
                          ROLE: ADMIN
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium mt-0.5">{adm.email}</div>
                      <div className="text-[11px] text-slate-500 font-medium mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Full Permissions: Manage CMS, Students, Courses, Events & Settings
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DOMAIN MANAGEMENT TAB */}
      {/* ========================================================================= */}
      {activeTab === 'DOMAINS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">10 Major Career Domains</h2>
              <p className="text-xs text-slate-600 font-medium">Configure academic verticals, subcategories & icons</p>
            </div>
            <button
              onClick={() => handleOpenDomainModal()}
              className="bright-btn-primary font-bold text-xs px-4 py-2.5 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Domain</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((dom) => (
              <div key={dom.id} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center border border-purple-200">
                      <DynamicIcon name={dom.iconName} className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-extrabold text-pink-700 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                      {dom.courseCount || 2}+ Courses
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base">{dom.name}</h3>
                  <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-1">{dom.headline}</p>

                  <div className="flex flex-wrap gap-1 pt-3">
                    {dom.subcategories.slice(0, 3).map((sub, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded border border-slate-200">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenDomainModal(dom)}
                    className="p-2 text-slate-600 hover:text-purple-700 bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteDomain(dom.id)}
                    className="p-2 text-slate-600 hover:text-rose-600 bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. COURSE MANAGEMENT TAB */}
      {/* ========================================================================= */}
      {activeTab === 'COURSES' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Course Offerings CMS</h2>
              <p className="text-xs text-slate-600 font-medium">Add and edit training programs, fees, durations and levels</p>
            </div>
            <button
              onClick={() => handleOpenCourseModal()}
              className="bright-btn-primary font-bold text-xs px-4 py-2.5 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((crs) => (
              <div key={crs.id} className="bg-white rounded-2xl border border-purple-100 shadow-md overflow-hidden flex flex-col justify-between">
                <div className="relative h-28 w-full overflow-hidden bg-slate-100 border-b border-purple-100/60">
                  <img
                    src={getCourseImage(crs.title, crs.slug, crs.domainName, crs.image)}
                    alt={crs.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getCourseImage(crs.title, crs.slug, crs.domainName);
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-extrabold text-purple-900 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-xs">
                      {crs.domainName}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] text-pink-600 bg-white/90 font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                      {crs.badge || 'Active'}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">{crs.title}</h3>
                    <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-1">{crs.headline}</p>

                    <div className="pt-3 text-sm font-black gradient-text-bright">
                      {formatCurrency(crs.discountFee || crs.fee)}
                      {crs.discountFee && <span className="text-xs text-slate-400 font-normal line-through ml-2">{formatCurrency(crs.fee)}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenCourseModal(crs)}
                      className="p-2 text-slate-600 hover:text-purple-700 bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(crs.id)}
                      className="p-2 text-slate-600 hover:text-rose-600 bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. ENQUIRIES CRM */}
      {/* ========================================================================= */}
      {activeTab === 'ENQUIRIES' && (
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">Student Lead CRM Board</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Phone & Email</th>
                  <th className="pb-3">Program / Domain</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((enq) => (
                  <tr key={enq.id}>
                    <td className="py-3 text-slate-500 font-medium">{enq.createdAt.slice(0, 10)}</td>
                    <td className="py-3 font-extrabold text-slate-900">{enq.name}</td>
                    <td className="py-3">
                      <div className="font-bold text-slate-800">{enq.phone}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{enq.email}</div>
                    </td>
                    <td className="py-3 font-bold text-purple-700">
                      {enq.courseTitle || enq.domain || 'General Inquiry'}
                    </td>
                    <td className="py-3">
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                        className="bg-white border border-slate-200 text-slate-900 rounded p-1 text-[11px] font-bold focus:outline-none focus:border-purple-500"
                      >
                        <option value="NEW">NEW</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="CONVERTED">CONVERTED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => {
                          setActiveEnquiryForNotes(enq);
                          setNotesText(enq.notes || '');
                          setEnquiryNotesModalOpen(true);
                        }}
                        className="text-xs text-purple-700 hover:underline font-bold"
                      >
                        Notes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. BLOGS & EVENTS CMS (PREVIOUSLY MISSING / BLANK) */}
      {/* ========================================================================= */}
      {activeTab === 'BLOGS_EVENTS' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Events & Knowledge CMS</h2>
              <p className="text-xs text-slate-600 font-medium">
                Publish live webinars, masterclasses, and tech career articles.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-purple-200 text-xs font-bold">
                <button
                  onClick={() => setBlogsEventsSubTab('EVENTS')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    blogsEventsSubTab === 'EVENTS' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-purple-700'
                  }`}
                >
                  Events & Masterclasses ({events.length})
                </button>
                <button
                  onClick={() => setBlogsEventsSubTab('BLOGS')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    blogsEventsSubTab === 'BLOGS' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-purple-700'
                  }`}
                >
                  Blog Articles ({blogs.length})
                </button>
              </div>

              {blogsEventsSubTab === 'EVENTS' ? (
                <button
                  onClick={() => handleOpenEventModal()}
                  className="bright-btn-primary font-bold text-xs px-3.5 py-2 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Event</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setBlogForm({
                      title: '',
                      category: 'Career Guide',
                      authorName: 'Apex Editorial Team',
                      readTime: '5 min read',
                      summary: '',
                      content: '',
                    });
                    setBlogModalOpen(true);
                  }}
                  className="bright-btn-primary font-bold text-xs px-3.5 py-2 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write Blog</span>
                </button>
              )}
            </div>
          </div>

          {/* EVENTS LIST */}
          {blogsEventsSubTab === 'EVENTS' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        {evt.category || 'Workshop'}
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-600" />
                        {evt.time}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">{evt.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{evt.description}</p>

                    <div className="pt-2 text-xs text-slate-700 space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold">
                        <UserCheck className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                        <span>Speaker: {evt.speakerName} ({evt.speakerRole})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenEventModal(evt)}
                      className="p-2 text-slate-600 hover:text-purple-700 bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(evt.id)}
                      className="p-2 text-slate-600 hover:text-rose-600 bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BLOGS LIST */}
          {blogsEventsSubTab === 'BLOGS' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-pink-700 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                        {b.category}
                      </span>
                      <span className="text-xs text-slate-400">{b.readTime}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">{b.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3">{b.summary}</p>
                    <div className="text-xs text-slate-500 pt-1">
                      By <span className="font-bold text-slate-700">{b.authorName}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="p-2 text-slate-600 hover:text-rose-600 bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. SITE SETTINGS */}
      {/* ========================================================================= */}
      {activeTab === 'SETTINGS' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-purple-100 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Institute Contact & General Settings</h2>
              <p className="text-xs text-slate-600 font-medium">
                Changes saved here update the live website footer, contact pages, and AI chatbot knowledge base.
              </p>
            </div>
          </div>

          {settingsSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{settingsSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveSiteSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Official Hotline Phone</label>
                <input
                  type="text"
                  required
                  value={siteSettings.phone}
                  onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Support Email</label>
                <input
                  type="email"
                  required
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Campus Address</label>
                <input
                  type="text"
                  required
                  value={siteSettings.address}
                  onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Working Hours</label>
                <input
                  type="text"
                  required
                  value={siteSettings.workingHours}
                  onChange={(e) => setSiteSettings({ ...siteSettings, workingHours: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={settingsSaving}
              className="bright-btn-primary font-bold text-xs px-6 py-2.5 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{settingsSaving ? 'Saving...' : 'Save Institute Settings'}</span>
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* DOMAIN MODAL */}
      {domainModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-md p-6 rounded-3xl border border-purple-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-base">
                {editingDomain ? 'Edit Domain' : 'Create Domain'}
              </h3>
              <button onClick={() => setDomainModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <form onSubmit={handleSaveDomain} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Domain Name</label>
                <input
                  type="text"
                  required
                  value={domForm.name}
                  onChange={(e) => setDomForm({ ...domForm, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={domForm.headline}
                  onChange={(e) => setDomForm({ ...domForm, headline: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Subcategories (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Full Stack, Frontend, Backend..."
                  value={domForm.subcategoriesStr}
                  onChange={(e) => setDomForm({ ...domForm, subcategoriesStr: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bright-btn-primary font-bold py-3 rounded-xl text-xs"
              >
                Save Domain
              </button>
            </form>
          </div>
        </div>
      )}

      {/* COURSE MODAL */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-md p-6 rounded-3xl border border-purple-100 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-base">
                {editingCourse ? 'Edit Course' : 'Create Course'}
              </h3>
              <button onClick={() => setCourseModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Domain</label>
                <select
                  value={courseForm.domainId}
                  onChange={(e) => setCourseForm({ ...courseForm, domainId: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                >
                  {domains.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Standard Fee (₹)</label>
                  <input
                    type="number"
                    required
                    value={courseForm.fee}
                    onChange={(e) => setCourseForm({ ...courseForm, fee: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Discount Fee (₹)</label>
                  <input
                    type="number"
                    value={courseForm.discountFee}
                    onChange={(e) => setCourseForm({ ...courseForm, discountFee: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bright-btn-primary font-bold py-3 rounded-xl text-xs"
              >
                Save Course
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EVENT MODAL */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-md p-6 rounded-3xl border border-purple-100 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-base">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button onClick={() => setEventModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Category</label>
                <select
                  value={eventForm.category}
                  onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                >
                  <option value="Workshops">Workshops</option>
                  <option value="Webinars">Webinars</option>
                  <option value="Masterclasses">Masterclasses</option>
                  <option value="Hackathons">Hackathons</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Speaker Name</label>
                  <input
                    type="text"
                    required
                    value={eventForm.speakerName}
                    onChange={(e) => setEventForm({ ...eventForm, speakerName: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Speaker Role</label>
                  <input
                    type="text"
                    required
                    value={eventForm.speakerRole}
                    onChange={(e) => setEventForm({ ...eventForm, speakerRole: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Location / Mode</label>
                <input
                  type="text"
                  required
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bright-btn-primary font-bold py-3 rounded-xl text-xs"
              >
                Save Event
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BLOG MODAL */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-md p-6 rounded-3xl border border-purple-100 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-base">Write New Blog Article</h3>
              <button onClick={() => setBlogModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Read Time</label>
                  <input
                    type="text"
                    required
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Summary</label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.summary}
                  onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Content (Markdown / Text)</label>
                <textarea
                  rows={5}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bright-btn-primary font-bold py-3 rounded-xl text-xs"
              >
                Publish Article
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ENQUIRY NOTES MODAL */}
      {enquiryNotesModalOpen && activeEnquiryForNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-md p-6 rounded-3xl border border-purple-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-base">
                Internal Notes: {activeEnquiryForNotes.name}
              </h3>
              <button onClick={() => setEnquiryNotesModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl space-y-1">
              <div><span className="font-bold">Email:</span> {activeEnquiryForNotes.email}</div>
              <div><span className="font-bold">Phone:</span> {activeEnquiryForNotes.phone}</div>
              <div><span className="font-bold">Message:</span> {activeEnquiryForNotes.message}</div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="block text-slate-700 font-bold">Counselling / Follow-up Notes</label>
              <textarea
                rows={4}
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Called on Monday, student interested in weekend batch..."
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>

            <button
              onClick={handleSaveEnquiryNotes}
              className="w-full bright-btn-primary font-bold py-2.5 rounded-xl text-xs"
            >
              Save Notes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

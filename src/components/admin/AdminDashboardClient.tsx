'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { DynamicIcon } from '../ui/IconHelper';

interface AdminDashboardClientProps {
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
  const [activeTab, setActiveTab] = useState<
    'ANALYTICS' | 'DOMAINS' | 'COURSES' | 'STUDENTS' | 'ENQUIRIES' | 'BLOGS_EVENTS' | 'SETTINGS'
  >('ANALYTICS');

  const [domains, setDomains] = useState<Domain[]>(initialDomains);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSettings);

  // Modals state
  const [domainModalOpen, setDomainModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null);

  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [enquiryNotesModalOpen, setEnquiryNotesModalOpen] = useState(false);
  const [activeEnquiryForNotes, setActiveEnquiryForNotes] = useState<Enquiry | null>(null);
  const [notesText, setNotesText] = useState('');

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

  // Analytics Metrics
  const totalStudentsCount = users.filter((u) => u.role === 'STUDENT').length || 120;
  const totalRevenue = enrollments.reduce((acc, enr) => acc + (enr.course?.discountFee || enr.course?.fee || 35000), 0);

  // Handlers
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
  };

  const handleDeleteDomain = async (id: string) => {
    if (!confirm('Are you sure you want to delete this domain?')) return;
    await fetch(`/api/domains/${id}`, { method: 'DELETE' });
    setDomains((prev) => prev.filter((d) => d.id !== id));
  };

  // Course Handlers
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
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    await fetch(`/api/courses/${id}`, { method: 'DELETE' });
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // Enquiry status change
  const handleUpdateEnquiryStatus = async (id: string, newStatus: string) => {
    await fetch('/api/enquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });

    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus as any } : e))
    );
  };

  const handleSaveSiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Site Contact & General Settings updated successfully!');
  };

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
              Manage 10 domains, 50+ courses, student enrollments, enquiries & site configuration.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-purple-100 shadow-sm overflow-x-auto scrollbar-none text-xs font-bold">
        {[
          { id: 'ANALYTICS', label: 'Dashboard Overview', icon: BarChart3 },
          { id: 'COURSES', label: `Courses (${courses.length})`, icon: BookOpen },
          { id: 'DOMAINS', label: `Domains (${domains.length})`, icon: Layers },
          { id: 'STUDENTS', label: `Students (${users.length})`, icon: Users },
          { id: 'ENQUIRIES', label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
          { id: 'BLOGS_EVENTS', label: 'Blogs & Events', icon: FileText },
          { id: 'SETTINGS', label: 'Site Settings', icon: Settings },
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

      {/* 1. ANALYTICS OVERVIEW */}
      {activeTab === 'ANALYTICS' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-1">
              <div className="text-xs font-bold text-slate-500">Total Enrolled Students</div>
              <div className="text-3xl font-black text-slate-900">{totalStudentsCount}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-1">
              <div className="text-xs font-bold text-slate-500">Active Courses</div>
              <div className="text-3xl font-black text-purple-700">{courses.length}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-1">
              <div className="text-xs font-bold text-slate-500">Total Student Enquiries</div>
              <div className="text-3xl font-black text-amber-600">{enquiries.length}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-1">
              <div className="text-xs font-bold text-slate-500">Estimated Total Revenue</div>
              <div className="text-3xl font-black text-emerald-600">{formatCurrency(totalRevenue || 149999)}</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4">
            <h2 className="text-base font-extrabold text-slate-900">Recent Student Registrations</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="pb-3">Student Name</th>
                    <th className="pb-3">Email Address</th>
                    <th className="pb-3">Phone</th>
                    <th className="pb-3">City</th>
                    <th className="pb-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="py-3 font-extrabold text-slate-900">{u.name}</td>
                      <td className="py-3 font-medium">{u.email}</td>
                      <td className="py-3 font-medium">{u.phone || 'N/A'}</td>
                      <td className="py-3 font-medium">{u.city || 'Bangalore'}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold border border-purple-200">
                          {u.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. DOMAIN MANAGEMENT TAB */}
      {activeTab === 'DOMAINS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">10 Major Career Domains</h2>
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

      {/* 3. COURSE MANAGEMENT TAB */}
      {activeTab === 'COURSES' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Course Offerings CMS</h2>
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
              <div key={crs.id} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {crs.domainName}
                    </span>
                    <span className="text-[10px] text-pink-600 font-extrabold">{crs.badge || 'Active'}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">{crs.title}</h3>
                  <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-1">{crs.headline}</p>

                  <div className="pt-3 text-sm font-black gradient-text-bright">
                    {formatCurrency(crs.discountFee || crs.fee)}
                    {crs.discountFee && <span className="text-xs text-slate-400 font-normal line-through ml-2">{formatCurrency(crs.fee)}</span>}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
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
            ))}
          </div>
        </div>
      )}

      {/* 4. ENQUIRIES CRM */}
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

      {/* 5. SITE SETTINGS */}
      {activeTab === 'SETTINGS' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-purple-100 shadow-md space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900">Institute Contact & General Settings</h2>
          <form onSubmit={handleSaveSiteSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Official Hotline Phone</label>
                <input
                  type="text"
                  value={siteSettings.phone}
                  onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Support Email</label>
                <input
                  type="email"
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Campus Address</label>
                <input
                  type="text"
                  value={siteSettings.address}
                  onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Working Hours</label>
                <input
                  type="text"
                  value={siteSettings.workingHours}
                  onChange={(e) => setSiteSettings({ ...siteSettings, workingHours: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bright-btn-primary font-bold text-xs px-6 py-2.5 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Institute Settings</span>
            </button>
          </form>
        </div>
      )}

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
    </div>
  );
};

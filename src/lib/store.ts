import { prisma } from './prisma';
import {
  INITIAL_DOMAINS,
  INITIAL_COURSES,
  INITIAL_REVIEWS,
  INITIAL_USERS,
  INITIAL_ENROLLMENTS,
  INITIAL_ENQUIRIES,
  INITIAL_BLOGS,
  INITIAL_EVENTS,
  INITIAL_SETTINGS,
  INITIAL_NOTIFICATIONS,
} from './mock-data';
import {
  Domain,
  Course,
  Review,
  User,
  Enrollment,
  Enquiry,
  BlogPost,
  EventItem,
  SiteSettings,
  StudentNotification,
} from './types';

// In-Memory store fallback
let memoryDomains = [...INITIAL_DOMAINS];
let memoryCourses = [...INITIAL_COURSES];
let memoryReviews = [...INITIAL_REVIEWS];
let memoryUsers = [...INITIAL_USERS];
let memoryEnrollments = [...INITIAL_ENROLLMENTS];
let memoryEnquiries = [...INITIAL_ENQUIRIES];
let memoryBlogs = [...INITIAL_BLOGS];
let memoryEvents = [...INITIAL_EVENTS];
let memorySettings = { ...INITIAL_SETTINGS };
let memoryNotifications = [...INITIAL_NOTIFICATIONS];

const isPlaceholderDb = !process.env.DATABASE_URL || process.env.DATABASE_URL.includes('sample');

const DEFAULT_INSTRUCTOR = {
  name: 'Apex Senior Tech Mentor',
  title: 'Lead Industry Architect',
  experience: '10+ Years Industry Experience',
  expertise: ['Full Stack', 'System Design', 'Cloud Architecture'],
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
};

const DEFAULT_PROJECTS = [
  {
    title: 'Enterprise Production Web Application',
    description: 'Complete scalable application with database design, auth, and cloud deployment.',
    techStack: ['React', 'Next.js', 'PostgreSQL', 'Docker'],
  },
];

const DEFAULT_FAQS = [
  {
    question: 'Are live lecture recordings provided?',
    answer: 'Yes! All live sessions are recorded in HD and uploaded to your student LMS dashboard.',
  },
];

// --- BLOGS ---
export async function getBlogs(): Promise<BlogPost[]> {
  if (!isPlaceholderDb) {
    try {
      const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
      if (blogs.length > 0) {
        return blogs.map((b) => ({
          id: b.id,
          title: b.title,
          slug: b.slug,
          category: b.category,
          image: b.image,
          authorName: b.authorName,
          authorTitle: b.authorTitle,
          authorPhoto: b.authorPhoto,
          readTime: b.readTime,
          summary: b.summary,
          content: b.content,
          featured: b.featured,
          createdAt: b.createdAt.toISOString(),
        }));
      }
    } catch (err) {}
  }
  return memoryBlogs;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const blogs = await getBlogs();
  const s = slug.toLowerCase().trim();
  const exact = blogs.find((b) => b.slug === s);
  if (exact) return exact;

  const fuzzy = blogs.find((b) => b.slug.includes(s) || s.includes(b.slug) || b.title.toLowerCase().includes(s));
  return fuzzy || blogs[0] || null;
}

export async function createBlog(data: Omit<BlogPost, 'id' | 'createdAt'>): Promise<BlogPost> {
  const newBlog: BlogPost = {
    id: `blog-${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
  };
  memoryBlogs.unshift(newBlog);
  return newBlog;
}

// --- EVENTS ---
export async function getEvents(): Promise<EventItem[]> {
  if (!isPlaceholderDb) {
    try {
      const events = await prisma.event.findMany({ orderBy: { createdAt: 'desc' } });
      if (events.length > 0) {
        return events.map((e) => ({
          id: e.id,
          title: e.title,
          slug: e.slug,
          category: e.category,
          date: e.date,
          time: e.time,
          location: e.location,
          speakerName: e.speakerName,
          speakerRole: e.speakerRole,
          speakerFoto: e.speakerFoto,
          description: e.description,
          featured: e.featured,
          createdAt: e.createdAt.toISOString(),
        }));
      }
    } catch (err) {}
  }
  return memoryEvents;
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug) || null;
}

export async function createEvent(data: Omit<EventItem, 'id' | 'createdAt'>): Promise<EventItem> {
  const newEvt: EventItem = {
    id: `evt-${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
  };
  memoryEvents.unshift(newEvt);
  return newEvt;
}

// --- SITE SETTINGS ---
export async function getSiteSettings(): Promise<SiteSettings> {
  return memorySettings;
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  memorySettings = { ...memorySettings, ...data };
  return memorySettings;
}

export async function getNotificationsByUser(userId: string): Promise<StudentNotification[]> {
  return memoryNotifications.filter((n) => n.userId === userId);
}

export async function markNotificationAsRead(id: string): Promise<boolean> {
  const notif = memoryNotifications.find((n) => n.id === id);
  if (notif) {
    notif.read = true;
    return true;
  }
  return false;
}

// --- DOMAINS ---
export async function getDomains(): Promise<Domain[]> {
  if (!isPlaceholderDb) {
    try {
      const domains = await prisma.domain.findMany({
        include: { _count: { select: { courses: true } } },
        orderBy: { name: 'asc' },
      });
      if (domains.length > 0) {
        return domains.map((d) => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          headline: d.headline,
          description: d.description,
          iconName: d.iconName,
          image: d.image || undefined,
          subcategories: d.subcategories ? JSON.parse(d.subcategories) : [],
          featured: d.featured,
          courseCount: d._count.courses,
        }));
      }
    } catch (error) {}
  }
  return memoryDomains;
}

export async function getDomainBySlug(slug: string): Promise<Domain | null> {
  const domains = await getDomains();
  const s = slug.toLowerCase().trim();
  const exact = domains.find((d) => d.slug === s);
  if (exact) return exact;

  const fuzzy = domains.find((d) => d.slug.includes(s) || s.includes(d.slug) || d.name.toLowerCase().includes(s));
  return fuzzy || domains[0] || null;
}

export async function createDomain(data: {
  name: string;
  slug: string;
  headline: string;
  description: string;
  iconName: string;
  subcategories: string[];
}): Promise<Domain> {
  const newDom: Domain = {
    id: `dom-${Date.now()}`,
    name: data.name,
    slug: data.slug,
    headline: data.headline,
    description: data.description,
    iconName: data.iconName,
    subcategories: data.subcategories,
    featured: true,
    courseCount: 0,
  };
  memoryDomains.push(newDom);
  return newDom;
}

export async function updateDomain(
  id: string,
  data: Partial<Omit<Domain, 'id'>>
): Promise<boolean> {
  const item = memoryDomains.find((d) => d.id === id);
  if (item) {
    if (data.name) item.name = data.name;
    if (data.slug) item.slug = data.slug;
    if (data.headline) item.headline = data.headline;
    if (data.description) item.description = data.description;
    if (data.iconName) item.iconName = data.iconName;
    if (data.subcategories) item.subcategories = data.subcategories;
    return true;
  }
  return false;
}

export async function deleteDomain(id: string): Promise<boolean> {
  memoryDomains = memoryDomains.filter((d) => d.id !== id);
  return true;
}

// --- COURSES ---
export async function getCourses(params?: {
  domainSlug?: string;
  search?: string;
  level?: string;
  mode?: string;
  featuredOnly?: boolean;
}): Promise<Course[]> {
  let list: Course[] = [...memoryCourses];

  // Filtering
  if (params?.domainSlug) {
    list = list.filter((c) => c.domainSlug === params.domainSlug);
  }
  if (params?.search) {
    const term = params.search.toLowerCase();
    list = list.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.headline.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
    );
  }
  if (params?.level && params.level !== 'ALL') {
    list = list.filter((c) => c.level.toLowerCase().includes(params.level!.toLowerCase()));
  }
  if (params?.mode && params.mode !== 'ALL') {
    list = list.filter((c) => c.mode.toLowerCase().includes(params.mode!.toLowerCase()));
  }
  if (params?.featuredOnly) {
    list = list.filter((c) => c.featured);
  }

  return list;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const courses = await getCourses();
  const s = slug.toLowerCase().trim();
  const exact = courses.find((c) => c.slug === s);
  if (exact) return exact;

  const fuzzy = courses.find((c) => c.slug.includes(s) || s.includes(c.slug) || c.title.toLowerCase().includes(s));
  return fuzzy || courses[0] || null;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find((c) => c.id === id) || null;
}

export async function createCourse(data: Omit<Course, 'id'>): Promise<Course> {
  const domains = await getDomains();
  const domainObj = domains.find((d) => d.id === data.domainId);

  const newCourse: Course = {
    id: `course-${Date.now()}`,
    ...data,
    domainName: domainObj?.name,
    domainSlug: domainObj?.slug,
    instructor: data.instructor || DEFAULT_INSTRUCTOR,
    projects: data.projects || DEFAULT_PROJECTS,
    faqs: data.faqs || DEFAULT_FAQS,
    prerequisites: data.prerequisites || ['Basic computer fundamentals'],
    whoShouldTake: data.whoShouldTake || ['Students and professionals'],
    toolsCovered: data.toolsCovered || ['Core Frameworks'],
  };
  memoryCourses.unshift(newCourse);
  return newCourse;
}

export async function updateCourse(id: string, data: Partial<Omit<Course, 'id'>>): Promise<boolean> {
  const item = memoryCourses.find((c) => c.id === id);
  if (item) {
    Object.assign(item, data);
    return true;
  }
  return false;
}

export async function deleteCourse(id: string): Promise<boolean> {
  memoryCourses = memoryCourses.filter((c) => c.id !== id);
  return true;
}

// --- ENQUIRIES ---
export async function createEnquiry(data: {
  name: string;
  email: string;
  phone: string;
  courseId?: string;
  domain?: string;
  type?: any;
  preferredContact?: string;
  preferredDate?: string;
  preferredTime?: string;
  message: string;
}): Promise<Enquiry> {
  const course = data.courseId ? await getCourseById(data.courseId) : null;
  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    courseId: data.courseId,
    courseTitle: course?.title,
    domain: data.domain,
    type: data.type || 'ENQUIRY',
    preferredContact: data.preferredContact,
    preferredDate: data.preferredDate,
    preferredTime: data.preferredTime,
    message: data.message,
    status: 'NEW',
    createdAt: new Date().toISOString(),
  };
  memoryEnquiries.unshift(newEnquiry);
  return newEnquiry;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  return memoryEnquiries;
}

export async function updateEnquiryStatus(id: string, status: string, notes?: string): Promise<boolean> {
  const item = memoryEnquiries.find((e) => e.id === id);
  if (item) {
    item.status = status as any;
    if (notes) item.notes = notes;
    return true;
  }
  return false;
}

// --- REVIEWS ---
export async function getReviews(approvedOnly = true): Promise<Review[]> {
  return approvedOnly ? memoryReviews.filter((r) => r.approved) : memoryReviews;
}

// --- USERS & AUTH ---
export async function getUserByEmail(email: string): Promise<User | null> {
  const match = memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
  return match || null;
}

export async function getUsers(): Promise<User[]> {
  return memoryUsers;
}

// --- ENROLLMENTS ---
export async function getEnrollmentsByUser(userId: string): Promise<Enrollment[]> {
  const allCourses = await getCourses();
  const userEnrs = memoryEnrollments.filter((enr) => enr.userId === userId);
  return userEnrs.map((enr) => {
    const courseObj = allCourses.find((c) => c.id === enr.courseId);
    return { ...enr, course: courseObj };
  });
}

export async function getAllEnrollments(): Promise<Enrollment[]> {
  const allCourses = await getCourses();
  return memoryEnrollments.map((enr) => {
    const courseObj = allCourses.find((c) => c.id === enr.courseId);
    return { ...enr, course: courseObj };
  });
}

export async function createEnrollment(userId: string, courseId: string, batchTiming?: string): Promise<Enrollment> {
  const course = await getCourseById(courseId);
  if (!course) throw new Error('Course not found');

  const newEnr: Enrollment = {
    id: `enr-${Date.now()}`,
    userId,
    courseId,
    courseTitle: course.title,
    courseSlug: course.slug,
    status: 'ACTIVE',
    progress: 15,
    batchTiming: batchTiming || 'Mon-Fri (7:30 PM - 9:30 PM)',
    enrolledAt: new Date().toISOString(),
    course,
  };
  memoryEnrollments.push(newEnr);
  return newEnr;
}

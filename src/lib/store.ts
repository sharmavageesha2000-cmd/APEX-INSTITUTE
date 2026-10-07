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
  getCourseImage,
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
  Role,
} from './types';

// In-Memory store fallback with globalThis singleton to persist across Next.js hot-reloads
const globalForStore = globalThis as unknown as {
  memoryDomains?: Domain[];
  memoryCourses?: Course[];
  memoryReviews?: Review[];
  memoryUsers?: User[];
  memoryEnrollments?: Enrollment[];
  memoryEnquiries?: Enquiry[];
  memoryBlogs?: BlogPost[];
  memoryEvents?: EventItem[];
  memorySettings?: SiteSettings;
  memoryNotifications?: StudentNotification[];
  cacheStore?: {
    domains?: { data: Domain[]; ts: number };
    courses?: { data: Course[]; ts: number };
    reviews?: { data: Review[]; ts: number };
    blogs?: { data: BlogPost[]; ts: number };
    events?: { data: EventItem[]; ts: number };
    settings?: { data: SiteSettings; ts: number };
    users?: { data: User[]; ts: number };
    enrollments?: { data: Enrollment[]; ts: number };
  };
};

if (!globalForStore.memoryUsers) globalForStore.memoryUsers = [...INITIAL_USERS];
if (!globalForStore.memoryEnrollments) globalForStore.memoryEnrollments = [...INITIAL_ENROLLMENTS];
if (!globalForStore.memoryDomains) globalForStore.memoryDomains = [...INITIAL_DOMAINS];
if (!globalForStore.memoryCourses) globalForStore.memoryCourses = [...INITIAL_COURSES];
if (!globalForStore.memoryReviews) globalForStore.memoryReviews = [...INITIAL_REVIEWS];
if (!globalForStore.memoryEnquiries) globalForStore.memoryEnquiries = [...INITIAL_ENQUIRIES];
if (!globalForStore.memoryBlogs) globalForStore.memoryBlogs = [...INITIAL_BLOGS];
if (!globalForStore.memoryEvents) globalForStore.memoryEvents = [...INITIAL_EVENTS];
if (!globalForStore.memorySettings) globalForStore.memorySettings = { ...INITIAL_SETTINGS };
if (!globalForStore.memoryNotifications) globalForStore.memoryNotifications = [...INITIAL_NOTIFICATIONS];
if (!globalForStore.cacheStore) globalForStore.cacheStore = {};

const CACHE_TTL_MS = 15 * 1000; // 15 seconds cache for instant updates while maintaining lightning-fast performance

export function invalidateDomainsCache() {
  if (globalForStore.cacheStore) globalForStore.cacheStore.domains = undefined;
}
export function invalidateCoursesCache() {
  if (globalForStore.cacheStore) globalForStore.cacheStore.courses = undefined;
}
export function invalidateReviewsCache() {
  if (globalForStore.cacheStore) globalForStore.cacheStore.reviews = undefined;
}
export function invalidateBlogsCache() {
  if (globalForStore.cacheStore) globalForStore.cacheStore.blogs = undefined;
}
export function invalidateEventsCache() {
  if (globalForStore.cacheStore) globalForStore.cacheStore.events = undefined;
}
export function invalidateSettingsCache() {
  if (globalForStore.cacheStore) globalForStore.cacheStore.settings = undefined;
}
export function invalidateUsersCache() {
  if (globalForStore.cacheStore) globalForStore.cacheStore.users = undefined;
}
export function invalidateEnrollmentsCache() {
  if (globalForStore.cacheStore) globalForStore.cacheStore.enrollments = undefined;
}

let memoryDomains = globalForStore.memoryDomains!;
let memoryCourses = globalForStore.memoryCourses!;
let memoryReviews = globalForStore.memoryReviews!;
let memoryUsers = globalForStore.memoryUsers!;
let memoryEnrollments = globalForStore.memoryEnrollments!;
let memoryEnquiries = globalForStore.memoryEnquiries!;
let memoryBlogs = globalForStore.memoryBlogs!;
let memoryEvents = globalForStore.memoryEvents!;
let memorySettings = globalForStore.memorySettings!;
let memoryNotifications = globalForStore.memoryNotifications!;

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
  const now = Date.now();
  if (globalForStore.cacheStore?.blogs && (now - globalForStore.cacheStore.blogs.ts < CACHE_TTL_MS)) {
    return globalForStore.cacheStore.blogs.data;
  }

  let list: BlogPost[] = [];
  if (!isPlaceholderDb) {
    try {
      const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
      if (blogs.length > 0) {
        list = blogs.map((b) => ({
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
  if (list.length === 0) {
    list = memoryBlogs;
  }
  if (!globalForStore.cacheStore) globalForStore.cacheStore = {};
  globalForStore.cacheStore.blogs = { data: list, ts: now };
  return list;
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
  invalidateBlogsCache();
  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!isPlaceholderDb) {
    try {
      const created = await prisma.blog.create({
        data: {
          title: data.title,
          slug,
          category: data.category,
          image: data.image,
          authorName: data.authorName,
          authorTitle: data.authorTitle,
          authorPhoto: data.authorPhoto,
          readTime: data.readTime,
          summary: data.summary,
          content: data.content,
          featured: data.featured ?? false,
        },
      });
      const item: BlogPost = {
        id: created.id,
        title: created.title,
        slug: created.slug,
        category: created.category,
        image: created.image,
        authorName: created.authorName,
        authorTitle: created.authorTitle,
        authorPhoto: created.authorPhoto,
        readTime: created.readTime,
        summary: created.summary,
        content: created.content,
        featured: created.featured,
        createdAt: created.createdAt.toISOString(),
      };
      memoryBlogs.unshift(item);
      return item;
    } catch (err) {
      console.error('Error creating blog in prisma:', err);
    }
  }
  const newBlog: BlogPost = {
    id: `blog-${Date.now()}`,
    ...data,
    slug,
    createdAt: new Date().toISOString(),
  };
  memoryBlogs.unshift(newBlog);
  return newBlog;
}

export async function updateBlog(id: string, data: Partial<Omit<BlogPost, 'id'>>): Promise<boolean> {
  invalidateBlogsCache();
  let updatedInDb = false;
  if (!isPlaceholderDb) {
    try {
      await prisma.blog.update({
        where: { id },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.slug && { slug: data.slug }),
          ...(data.category && { category: data.category }),
          ...(data.image && { image: data.image }),
          ...(data.authorName && { authorName: data.authorName }),
          ...(data.authorTitle && { authorTitle: data.authorTitle }),
          ...(data.authorPhoto && { authorPhoto: data.authorPhoto }),
          ...(data.readTime && { readTime: data.readTime }),
          ...(data.summary && { summary: data.summary }),
          ...(data.content && { content: data.content }),
          ...(typeof data.featured === 'boolean' && { featured: data.featured }),
        },
      });
      updatedInDb = true;
    } catch (err) {
      console.error('Error updating blog in prisma:', err);
    }
  }
  const item = memoryBlogs.find((b) => b.id === id);
  if (item) {
    Object.assign(item, data);
    return true;
  }
  return updatedInDb;
}

export async function deleteBlog(id: string): Promise<boolean> {
  invalidateBlogsCache();
  let deletedFromDb = false;
  if (!isPlaceholderDb) {
    try {
      await prisma.blog.delete({ where: { id } });
      deletedFromDb = true;
    } catch (err) {
      console.error('Error deleting blog in prisma:', err);
    }
  }
  memoryBlogs = memoryBlogs.filter((b) => b.id !== id);
  return deletedFromDb || true;
}

// --- EVENTS ---
export async function getEvents(): Promise<EventItem[]> {
  const now = Date.now();
  if (globalForStore.cacheStore?.events && (now - globalForStore.cacheStore.events.ts < CACHE_TTL_MS)) {
    return globalForStore.cacheStore.events.data;
  }

  let list: EventItem[] = [];
  if (!isPlaceholderDb) {
    try {
      const events = await prisma.event.findMany({ orderBy: { createdAt: 'desc' } });
      if (events.length > 0) {
        list = events.map((e) => ({
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
  if (list.length === 0) {
    list = memoryEvents;
  }
  if (!globalForStore.cacheStore) globalForStore.cacheStore = {};
  globalForStore.cacheStore.events = { data: list, ts: now };
  return list;
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const events = await getEvents();
  const s = slug.toLowerCase().trim();
  const exact = events.find((e) => e.slug === s);
  if (exact) return exact;
  const fuzzy = events.find((e) => e.slug.includes(s) || s.includes(e.slug) || e.title.toLowerCase().includes(s));
  return fuzzy || events[0] || null;
}

export async function createEvent(data: Omit<EventItem, 'id' | 'createdAt'>): Promise<EventItem> {
  invalidateEventsCache();
  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!isPlaceholderDb) {
    try {
      const created = await prisma.event.create({
        data: {
          title: data.title,
          slug,
          category: data.category,
          date: data.date,
          time: data.time,
          location: data.location,
          speakerName: data.speakerName,
          speakerRole: data.speakerRole,
          speakerFoto: data.speakerFoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
          description: data.description,
          featured: data.featured ?? true,
        },
      });
      const item: EventItem = {
        id: created.id,
        title: created.title,
        slug: created.slug,
        category: created.category,
        date: created.date,
        time: created.time,
        location: created.location,
        speakerName: created.speakerName,
        speakerRole: created.speakerRole,
        speakerFoto: created.speakerFoto,
        description: created.description,
        featured: created.featured,
        createdAt: created.createdAt.toISOString(),
      };
      memoryEvents.unshift(item);
      return item;
    } catch (err) {
      console.error('Error creating event in prisma:', err);
    }
  }
  const newEvt: EventItem = {
    id: `evt-${Date.now()}`,
    ...data,
    slug,
    createdAt: new Date().toISOString(),
  };
  memoryEvents.unshift(newEvt);
  return newEvt;
}

export async function updateEvent(id: string, data: Partial<Omit<EventItem, 'id'>>): Promise<boolean> {
  invalidateEventsCache();
  let updatedInDb = false;
  if (!isPlaceholderDb) {
    try {
      await prisma.event.update({
        where: { id },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.slug && { slug: data.slug }),
          ...(data.category && { category: data.category }),
          ...(data.date && { date: data.date }),
          ...(data.time && { time: data.time }),
          ...(data.location && { location: data.location }),
          ...(data.speakerName && { speakerName: data.speakerName }),
          ...(data.speakerRole && { speakerRole: data.speakerRole }),
          ...(data.speakerFoto && { speakerFoto: data.speakerFoto }),
          ...(data.description && { description: data.description }),
          ...(typeof data.featured === 'boolean' && { featured: data.featured }),
        },
      });
      updatedInDb = true;
    } catch (err) {
      console.error('Error updating event in prisma:', err);
    }
  }
  const item = memoryEvents.find((e) => e.id === id);
  if (item) {
    Object.assign(item, data);
    return true;
  }
  return updatedInDb;
}

export async function deleteEvent(id: string): Promise<boolean> {
  invalidateEventsCache();
  let deletedFromDb = false;
  if (!isPlaceholderDb) {
    try {
      await prisma.event.delete({ where: { id } });
      deletedFromDb = true;
    } catch (err) {
      console.error('Error deleting event in prisma:', err);
    }
  }
  memoryEvents = memoryEvents.filter((e) => e.id !== id);
  return deletedFromDb || true;
}

// --- SITE SETTINGS ---
export async function getSiteSettings(): Promise<SiteSettings> {
  const now = Date.now();
  if (globalForStore.cacheStore?.settings && (now - globalForStore.cacheStore.settings.ts < CACHE_TTL_MS)) {
    return globalForStore.cacheStore.settings.data;
  }

  let settings = memorySettings;
  if (!isPlaceholderDb) {
    try {
      const s = await prisma.siteSettings.findUnique({ where: { id: 'default' } });
      if (s) {
        settings = {
          phone: s.phone,
          email: s.email,
          address: s.address,
          workingHours: s.workingHours,
          facebookUrl: s.facebookUrl,
          twitterUrl: s.twitterUrl,
          linkedinUrl: s.linkedinUrl,
          youtubeUrl: s.youtubeUrl,
          whatsappNo: s.whatsappNo,
        };
      }
    } catch (err) {}
  }
  if (!globalForStore.cacheStore) globalForStore.cacheStore = {};
  globalForStore.cacheStore.settings = { data: settings, ts: now };
  return settings;
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  invalidateSettingsCache();
  if (!isPlaceholderDb) {
    try {
      const updated = await prisma.siteSettings.upsert({
        where: { id: 'default' },
        update: data,
        create: {
          id: 'default',
          phone: data.phone || '+91 9876543210',
          email: data.email || 'contact@apexinstitute.com',
          address: data.address || 'Apex Tower, Outer Ring Road, HSR Layout, Bangalore 560102',
          workingHours: data.workingHours || 'Mon - Sat: 9:00 AM - 8:00 PM',
          facebookUrl: data.facebookUrl || 'https://facebook.com',
          twitterUrl: data.twitterUrl || 'https://twitter.com',
          linkedinUrl: data.linkedinUrl || 'https://linkedin.com',
          youtubeUrl: data.youtubeUrl || 'https://youtube.com',
          whatsappNo: data.whatsappNo || '+919876543210',
        },
      });
      memorySettings = { ...memorySettings, ...updated };
      return memorySettings;
    } catch (err) {}
  }
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
  const now = Date.now();
  if (globalForStore.cacheStore?.domains && (now - globalForStore.cacheStore.domains.ts < CACHE_TTL_MS)) {
    return globalForStore.cacheStore.domains.data;
  }

  let list: Domain[] = [];
  if (!isPlaceholderDb) {
    try {
      const domains = await prisma.domain.findMany({
        include: { _count: { select: { courses: true } } },
        orderBy: { name: 'asc' },
      });
      if (domains.length > 0) {
        list = domains.map((d) => ({
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
  if (list.length === 0) {
    list = memoryDomains;
  }
  if (!globalForStore.cacheStore) globalForStore.cacheStore = {};
  globalForStore.cacheStore.domains = { data: list, ts: now };
  return list;
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
  invalidateDomainsCache();
  const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!isPlaceholderDb) {
    try {
      const created = await prisma.domain.create({
        data: {
          name: data.name,
          slug,
          headline: data.headline,
          description: data.description,
          iconName: data.iconName,
          subcategories: JSON.stringify(data.subcategories || []),
          featured: true,
        },
      });
      const newDom: Domain = {
        id: created.id,
        name: created.name,
        slug: created.slug,
        headline: created.headline,
        description: created.description,
        iconName: created.iconName,
        subcategories: data.subcategories,
        featured: true,
        courseCount: 0,
      };
      memoryDomains.push(newDom);
      return newDom;
    } catch (err) {
      console.error('Error creating domain in prisma:', err);
    }
  }
  const newDom: Domain = {
    id: `dom-${Date.now()}`,
    name: data.name,
    slug,
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
  invalidateDomainsCache();
  let updatedInDb = false;
  if (!isPlaceholderDb) {
    try {
      await prisma.domain.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.slug && { slug: data.slug }),
          ...(data.headline && { headline: data.headline }),
          ...(data.description && { description: data.description }),
          ...(data.iconName && { iconName: data.iconName }),
          ...(data.subcategories && { subcategories: JSON.stringify(data.subcategories) }),
          ...(typeof data.featured === 'boolean' && { featured: data.featured }),
        },
      });
      updatedInDb = true;
    } catch (err) {
      console.error('Error updating domain in prisma:', err);
    }
  }
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
  return updatedInDb;
}

export async function deleteDomain(id: string): Promise<boolean> {
  invalidateDomainsCache();
  let deletedFromDb = false;
  if (!isPlaceholderDb) {
    try {
      await prisma.domain.delete({ where: { id } });
      deletedFromDb = true;
    } catch (err) {
      console.error('Error deleting domain in prisma:', err);
    }
  }
  memoryDomains = memoryDomains.filter((d) => d.id !== id);
  return deletedFromDb || true;
}

// --- COURSES ---
export async function getCourses(params?: {
  domainSlug?: string;
  search?: string;
  level?: string;
  mode?: string;
  featuredOnly?: boolean;
}): Promise<Course[]> {
  const now = Date.now();
  let allList: Course[];

  if (globalForStore.cacheStore?.courses && (now - globalForStore.cacheStore.courses.ts < CACHE_TTL_MS)) {
    allList = globalForStore.cacheStore.courses.data;
  } else {
    let list: Course[] = [];

    if (!isPlaceholderDb) {
      try {
        const dbCourses = await prisma.course.findMany({
          include: { domain: true },
          orderBy: { createdAt: 'desc' },
        });
        if (dbCourses.length > 0) {
          list = dbCourses.map((c) => {
            const matchInitial = INITIAL_COURSES.find(
              (ic) => ic.slug === c.slug || ic.id === c.id || ic.title.toLowerCase() === c.title.toLowerCase()
            );
            const courseImage = matchInitial?.image || getCourseImage(c.title, c.slug, c.domain?.name);

            return {
              id: c.id,
              title: c.title,
              slug: c.slug,
              headline: c.headline,
              description: c.description,
              image: courseImage,
              domainId: c.domainId,
              domainName: c.domain?.name,
              domainSlug: c.domain?.slug,
              duration: c.duration,
              fee: c.fee,
              discountFee: c.discountFee || undefined,
              level: c.level as any,
              mode: c.mode as any,
              badge: c.badge || undefined,
              rating: c.rating,
              totalStudents: c.totalStudents,
              syllabus: c.syllabus ? (typeof c.syllabus === 'string' ? JSON.parse(c.syllabus) : c.syllabus) : (matchInitial?.syllabus || []),
              careerRoles: c.careerRoles ? (typeof c.careerRoles === 'string' ? JSON.parse(c.careerRoles) : c.careerRoles) : (matchInitial?.careerRoles || []),
              highlights: c.highlights ? (typeof c.highlights === 'string' ? JSON.parse(c.highlights) : c.highlights) : (matchInitial?.highlights || []),
              placementAssistance: c.placementAssistance,
              featured: c.featured,
              instructor: matchInitial?.instructor || DEFAULT_INSTRUCTOR,
              projects: matchInitial?.projects || DEFAULT_PROJECTS,
              faqs: matchInitial?.faqs || DEFAULT_FAQS,
              prerequisites: matchInitial?.prerequisites || ['Basic computer fundamentals'],
              whoShouldTake: matchInitial?.whoShouldTake || ['Students and professionals'],
              toolsCovered: matchInitial?.toolsCovered || ['Core Frameworks'],
            };
          });
        }
      } catch (err) {
        console.error('Error in getCourses from prisma:', err);
      }
    }

    if (list.length === 0) {
      list = memoryCourses.map((c) => ({
        ...c,
        image: c.image || getCourseImage(c.title, c.slug, c.domainName),
      }));
    }

    if (!globalForStore.cacheStore) globalForStore.cacheStore = {};
    globalForStore.cacheStore.courses = { data: list, ts: now };
    allList = list;
  }

  // Filtering
  let filtered = allList;
  if (params?.domainSlug) {
    filtered = filtered.filter((c) => c.domainSlug === params.domainSlug);
  }
  if (params?.search) {
    const term = params.search.toLowerCase().trim();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        (c.domainName && c.domainName.toLowerCase().includes(term)) ||
        (c.domainSlug && c.domainSlug.toLowerCase().includes(term)) ||
        c.headline.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        (c.toolsCovered && c.toolsCovered.some((t) => t.toLowerCase().includes(term)))
    );
  }
  if (params?.level && params.level !== 'ALL') {
    filtered = filtered.filter((c) => c.level.toLowerCase().includes(params.level!.toLowerCase()));
  }
  if (params?.mode && params.mode !== 'ALL') {
    filtered = filtered.filter((c) => c.mode.toLowerCase().includes(params.mode!.toLowerCase()));
  }
  if (params?.featuredOnly) {
    filtered = filtered.filter((c) => c.featured);
  }

  return filtered;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const courses = await getCourses();
  const s = slug.toLowerCase().trim();
  const exact = courses.find((c) => c.slug === s);
  if (exact) {
    return {
      ...exact,
      image: exact.image || getCourseImage(exact.title, exact.slug, exact.domainName),
    };
  }

  const fuzzy = courses.find((c) => c.slug.includes(s) || s.includes(c.slug) || c.title.toLowerCase().includes(s));
  const res = fuzzy || courses[0] || null;
  if (res) {
    return {
      ...res,
      image: res.image || getCourseImage(res.title, res.slug, res.domainName),
    };
  }
  return null;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find((c) => c.id === id) || null;
}

export async function createCourse(data: Omit<Course, 'id'>): Promise<Course> {
  invalidateCoursesCache();
  invalidateDomainsCache();
  const domains = await getDomains();
  const domainObj = domains.find((d) => d.id === data.domainId);
  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  if (!isPlaceholderDb && domainObj) {
    try {
      const created = await prisma.course.create({
        data: {
          title: data.title,
          slug,
          headline: data.headline,
          description: data.description,
          domainId: data.domainId,
          duration: data.duration,
          fee: Number(data.fee),
          discountFee: data.discountFee ? Number(data.discountFee) : null,
          level: data.level,
          mode: data.mode,
          badge: data.badge || null,
          rating: data.rating || 4.8,
          totalStudents: data.totalStudents || 100,
          syllabus: JSON.stringify(data.syllabus || []),
          careerRoles: JSON.stringify(data.careerRoles || []),
          highlights: JSON.stringify(data.highlights || []),
          placementAssistance: data.placementAssistance ?? true,
          featured: data.featured ?? false,
        },
        include: { domain: true },
      });
      const newCourse: Course = {
        id: created.id,
        ...data,
        image: data.image || getCourseImage(data.title, created.slug, created.domain?.name),
        slug: created.slug,
        domainName: created.domain.name,
        domainSlug: created.domain.slug,
        instructor: data.instructor || DEFAULT_INSTRUCTOR,
        projects: data.projects || DEFAULT_PROJECTS,
        faqs: data.faqs || DEFAULT_FAQS,
        prerequisites: data.prerequisites || ['Basic computer fundamentals'],
        whoShouldTake: data.whoShouldTake || ['Students and professionals'],
        toolsCovered: data.toolsCovered || ['Core Frameworks'],
      };
      memoryCourses.unshift(newCourse);
      return newCourse;
    } catch (err) {
      console.error('Error creating course in prisma:', err);
    }
  }

  const newCourse: Course = {
    id: `course-${Date.now()}`,
    ...data,
    image: data.image || getCourseImage(data.title, slug, domainObj?.name),
    slug,
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
  invalidateCoursesCache();
  invalidateDomainsCache();
  let updatedInDb = false;
  if (!isPlaceholderDb) {
    try {
      await prisma.course.update({
        where: { id },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.slug && { slug: data.slug }),
          ...(data.headline && { headline: data.headline }),
          ...(data.description && { description: data.description }),
          ...(data.domainId && { domainId: data.domainId }),
          ...(data.duration && { duration: data.duration }),
          ...(data.fee !== undefined && { fee: Number(data.fee) }),
          ...(data.discountFee !== undefined && { discountFee: Number(data.discountFee) }),
          ...(data.level && { level: data.level }),
          ...(data.mode && { mode: data.mode }),
          ...(data.badge !== undefined && { badge: data.badge }),
          ...(data.syllabus && { syllabus: typeof data.syllabus === 'string' ? data.syllabus : JSON.stringify(data.syllabus) }),
          ...(data.careerRoles && { careerRoles: typeof data.careerRoles === 'string' ? data.careerRoles : JSON.stringify(data.careerRoles) }),
          ...(data.highlights && { highlights: typeof data.highlights === 'string' ? data.highlights : JSON.stringify(data.highlights) }),
          ...(typeof data.placementAssistance === 'boolean' && { placementAssistance: data.placementAssistance }),
          ...(typeof data.featured === 'boolean' && { featured: data.featured }),
        },
      });
      updatedInDb = true;
    } catch (err) {
      console.error('Error updating course in prisma:', err);
    }
  }
  const item = memoryCourses.find((c) => c.id === id);
  if (item) {
    Object.assign(item, data);
    return true;
  }
  return updatedInDb;
}

export async function deleteCourse(id: string): Promise<boolean> {
  invalidateCoursesCache();
  invalidateDomainsCache();
  let deletedFromDb = false;
  if (!isPlaceholderDb) {
    try {
      await prisma.course.delete({ where: { id } });
      deletedFromDb = true;
    } catch (err) {
      console.error('Error deleting course in prisma:', err);
    }
  }
  memoryCourses = memoryCourses.filter((c) => c.id !== id);
  return deletedFromDb || true;
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
  if (!isPlaceholderDb) {
    try {
      const enq = await prisma.enquiry.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          courseId: data.courseId || null,
          domain: data.domain || null,
          type: data.type === 'FREE_COUNSELLING' ? 'FREE_COUNSELLING' : 'ENQUIRY',
          preferredContact: data.preferredContact || null,
          preferredDate: data.preferredDate || null,
          preferredTime: data.preferredTime || null,
          message: data.message,
          status: 'NEW',
        },
      });
      const item: Enquiry = {
        id: enq.id,
        name: enq.name,
        email: enq.email,
        phone: enq.phone,
        courseId: enq.courseId || undefined,
        courseTitle: course?.title,
        domain: enq.domain || undefined,
        type: enq.type,
        preferredContact: enq.preferredContact || undefined,
        preferredDate: enq.preferredDate || undefined,
        preferredTime: enq.preferredTime || undefined,
        message: enq.message,
        status: enq.status as any,
        createdAt: enq.createdAt.toISOString(),
      };
      memoryEnquiries.unshift(item);
      return item;
    } catch (err) {
      console.error('Error creating enquiry in prisma:', err);
    }
  }
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
  if (!isPlaceholderDb) {
    try {
      const list = await prisma.enquiry.findMany({
        include: { course: true },
        orderBy: { createdAt: 'desc' },
      });
      if (list.length > 0) {
        return list.map((e) => ({
          id: e.id,
          name: e.name,
          email: e.email,
          phone: e.phone,
          courseId: e.courseId || undefined,
          courseTitle: e.course?.title,
          domain: e.domain || undefined,
          type: e.type,
          preferredContact: e.preferredContact || undefined,
          preferredDate: e.preferredDate || undefined,
          preferredTime: e.preferredTime || undefined,
          message: e.message,
          status: e.status as any,
          notes: e.notes || undefined,
          createdAt: e.createdAt.toISOString(),
        }));
      }
    } catch (err) {
      console.error('Error fetching enquiries from prisma:', err);
    }
  }
  return memoryEnquiries;
}

export async function updateEnquiryStatus(id: string, status: string, notes?: string): Promise<boolean> {
  let updatedInDb = false;
  if (!isPlaceholderDb) {
    try {
      await prisma.enquiry.update({
        where: { id },
        data: {
          status: status as any,
          ...(notes !== undefined && { notes }),
        },
      });
      updatedInDb = true;
    } catch (err) {
      console.error('Error updating enquiry status in prisma:', err);
    }
  }
  const item = memoryEnquiries.find((e) => e.id === id);
  if (item) {
    item.status = status as any;
    if (notes) item.notes = notes;
    return true;
  }
  return updatedInDb;
}

// --- REVIEWS ---
export async function getReviews(approvedOnly = true): Promise<Review[]> {
  const now = Date.now();
  let list: Review[];

  if (globalForStore.cacheStore?.reviews && (now - globalForStore.cacheStore.reviews.ts < CACHE_TTL_MS)) {
    list = globalForStore.cacheStore.reviews.data;
  } else {
    let rawList: Review[] = [];
    if (!isPlaceholderDb) {
      try {
        const dbReviews = await prisma.review.findMany({
          orderBy: { createdAt: 'desc' },
        });
        if (dbReviews.length > 0) {
          rawList = dbReviews.map((r) => ({
            id: r.id,
            userName: r.userName,
            userRole: r.userRole,
            company: r.company || undefined,
            avatar: r.avatar || undefined,
            courseId: r.courseId,
            rating: r.rating,
            comment: r.comment,
            approved: r.approved,
            createdAt: r.createdAt.toISOString(),
          }));
        }
      } catch (err) {
        console.error('Error in getReviews from prisma:', err);
      }
    }
    if (rawList.length === 0) {
      rawList = memoryReviews;
    }
    if (!globalForStore.cacheStore) globalForStore.cacheStore = {};
    globalForStore.cacheStore.reviews = { data: rawList, ts: now };
    list = rawList;
  }

  return approvedOnly ? list.filter((r) => r.approved) : list;
}

// --- USERS & AUTH ---
export async function getUsers(): Promise<User[]> {
  const now = Date.now();
  if (globalForStore.cacheStore?.users && (now - globalForStore.cacheStore.users.ts < CACHE_TTL_MS)) {
    return globalForStore.cacheStore.users.data;
  }

  let dbList: User[] = [];
  if (!isPlaceholderDb) {
    try {
      const dbUsers = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbUsers.length > 0) {
        dbList = dbUsers.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          password: u.password,
          phone: u.phone || undefined,
          city: u.city || undefined,
          education: u.education || undefined,
          graduationYear: u.graduationYear || undefined,
          careerInterest: u.careerInterest || undefined,
          role: u.role as Role,
          avatar: u.avatar || undefined,
          createdAt: u.createdAt.toISOString(),
        }));
      }
    } catch (err) {
      console.error('Error fetching users from prisma:', err);
    }
  }

  // Preserve memory users (like faculty or initial accounts) that aren't in PostgreSQL
  const existingEmails = new Set(dbList.map((u) => u.email.toLowerCase()));
  const combined = [...dbList];
  for (const mu of memoryUsers) {
    if (!existingEmails.has(mu.email.toLowerCase())) {
      combined.push(mu);
      existingEmails.add(mu.email.toLowerCase());
    }
  }

  memoryUsers = combined;
  if (!globalForStore.cacheStore) globalForStore.cacheStore = {};
  globalForStore.cacheStore.users = { data: combined, ts: now };
  return combined;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const normalized = email.toLowerCase().trim();
  const users = await getUsers();
  const match = users.find((u) => u.email.toLowerCase() === normalized);
  if (match) {
    if (!match.password) {
      const initMatch = INITIAL_USERS.find((u) => u.email.toLowerCase() === normalized);
      match.password = initMatch?.password || (match.role === 'ADMIN' ? 'vageesha2000' : match.role === 'FACULTY' ? 'faculty123' : 'student123');
    }
    return match;
  }

  if (!isPlaceholderDb) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { email: normalized },
      });
      if (dbUser) {
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          password: dbUser.password,
          phone: dbUser.phone || undefined,
          city: dbUser.city || undefined,
          education: dbUser.education || undefined,
          graduationYear: dbUser.graduationYear || undefined,
          careerInterest: dbUser.careerInterest || undefined,
          role: dbUser.role as Role,
          avatar: dbUser.avatar || undefined,
          createdAt: dbUser.createdAt.toISOString(),
        };
      }
    } catch (err) {}
  }

  const initMatch = INITIAL_USERS.find((u) => u.email.toLowerCase() === normalized);
  if (initMatch) return initMatch;
  return null;
}

export async function deleteUser(id: string): Promise<boolean> {
  invalidateUsersCache();
  invalidateEnrollmentsCache();
  let deletedFromDb = false;
  if (!isPlaceholderDb) {
    try {
      await prisma.user.delete({ where: { id } });
      deletedFromDb = true;
    } catch (err) {
      console.error('Error deleting user from prisma:', err);
    }
  }
  memoryUsers = memoryUsers.filter((u) => u.id !== id);
  memoryEnrollments = memoryEnrollments.filter((e) => e.userId !== id);
  return deletedFromDb || true;
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<boolean> {
  invalidateUsersCache();
  let updatedInDb = false;
  if (!isPlaceholderDb) {
    try {
      await prisma.user.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.email && { email: data.email.toLowerCase().trim() }),
          ...(data.password && { password: data.password }),
          ...(data.phone !== undefined && { phone: data.phone }),
          ...(data.city !== undefined && { city: data.city }),
          ...(data.education !== undefined && { education: data.education }),
          ...(data.graduationYear !== undefined && { graduationYear: data.graduationYear }),
          ...(data.careerInterest !== undefined && { careerInterest: data.careerInterest }),
          ...(data.role && { role: data.role as any }),
          ...(data.avatar !== undefined && { avatar: data.avatar }),
        },
      });
      updatedInDb = true;
    } catch (err) {
      console.error('Error updating user in prisma:', err);
    }
  }
  const item = memoryUsers.find((u) => u.id === id);
  if (item) {
    Object.assign(item, data);
    return true;
  }
  return updatedInDb;
}

export async function createUser(userData: Omit<User, 'id'> & { id?: string }): Promise<User> {
  invalidateUsersCache();
  const userId = userData.id || `usr-${Date.now()}`;
  const newUser: User = {
    id: userId,
    ...userData,
    createdAt: userData.createdAt || new Date().toISOString(),
  };

  if (!isPlaceholderDb) {
    try {
      await prisma.user.upsert({
        where: { email: userData.email.toLowerCase().trim() },
        update: {
          name: userData.name,
          phone: userData.phone || null,
          city: userData.city || null,
          role: userData.role as any,
        },
        create: {
          id: userId,
          name: userData.name,
          email: userData.email.toLowerCase().trim(),
          password: userData.password || '$2a$10$defaultDummyHash1234567890',
          phone: userData.phone || null,
          city: userData.city || null,
          role: userData.role as any,
        },
      });
    } catch (err) {
      console.error('Error creating/upserting user in prisma:', err);
    }
  }

  memoryUsers.unshift(newUser);
  return newUser;
}

// --- ENROLLMENTS ---
export async function getAllEnrollments(): Promise<Enrollment[]> {
  const now = Date.now();
  if (globalForStore.cacheStore?.enrollments && (now - globalForStore.cacheStore.enrollments.ts < CACHE_TTL_MS)) {
    return globalForStore.cacheStore.enrollments.data;
  }

  const [allCourses, allUsers] = await Promise.all([
    getCourses(),
    getUsers(),
  ]);

  let dbList: Enrollment[] = [];
  if (!isPlaceholderDb) {
    try {
      const dbEnrollments = await prisma.enrollment.findMany({
        include: { user: true, course: true },
        orderBy: { enrolledAt: 'desc' },
      });
      if (dbEnrollments.length > 0) {
        dbList = dbEnrollments.map((enr) => {
          const courseObj = allCourses.find((c) => c.id === enr.courseId) || (enr.course ? {
            id: enr.course.id,
            title: enr.course.title,
            slug: enr.course.slug,
            headline: enr.course.headline,
            description: enr.course.description,
            domainId: enr.course.domainId,
            duration: enr.course.duration,
            fee: enr.course.fee,
            discountFee: enr.course.discountFee || undefined,
            level: enr.course.level,
            mode: enr.course.mode,
            rating: enr.course.rating,
            totalStudents: enr.course.totalStudents,
            placementAssistance: enr.course.placementAssistance,
            featured: enr.course.featured,
          } as any : undefined);

          const studentUser = allUsers.find((u) => u.id === enr.userId) || enr.user;
          const totalFee = courseObj ? (courseObj.discountFee || courseObj.fee) : 25000;

          return {
            id: enr.id,
            userId: enr.userId,
            userName: studentUser?.name || enr.user?.name,
            userEmail: studentUser?.email || enr.user?.email,
            userPhone: studentUser?.phone || enr.user?.phone || undefined,
            courseId: enr.courseId,
            courseTitle: courseObj?.title || enr.course?.title,
            courseSlug: courseObj?.slug || enr.course?.slug,
            status: enr.status as any,
            progress: enr.progress,
            batchTiming: enr.batchTiming || 'Mon-Fri (7:30 PM - 9:30 PM)',
            mode: enr.mode || 'Live Online',
            enrolledAt: enr.enrolledAt.toISOString(),
            course: courseObj,
            totalFee,
            registrationFeePaid: 2000,
            remainingFee: Math.max(0, totalFee - 2000),
            paymentPlan: 'LUMPSUM',
            paymentStatus: 'REGISTRATION_PAID',
            lastPaymentDate: enr.enrolledAt.toISOString(),
          };
        });
      }
    } catch (err) {
      console.error('Error fetching enrollments from prisma:', err);
    }
  }

  // Merge with any memory enrollments
  const existingIds = new Set(dbList.map((e) => e.id));
  const combined = [...dbList];
  for (const me of memoryEnrollments) {
    if (!existingIds.has(me.id)) {
      const courseObj = allCourses.find((c) => c.id === me.courseId);
      combined.push({ ...me, course: courseObj });
      existingIds.add(me.id);
    }
  }

  memoryEnrollments = combined;
  if (!globalForStore.cacheStore) globalForStore.cacheStore = {};
  globalForStore.cacheStore.enrollments = { data: combined, ts: now };
  return combined;
}

export async function getEnrollmentsByUser(userId: string): Promise<Enrollment[]> {
  const allEnrs = await getAllEnrollments();
  return allEnrs.filter((enr) => enr.userId === userId);
}

export async function createEnrollment(
  userId: string,
  courseId: string,
  batchTiming?: string,
  extra?: {
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    totalFee?: number;
    registrationFeePaid?: number;
    remainingFee?: number;
    paymentPlan?: 'LUMPSUM' | 'INSTALLMENTS_2' | 'INSTALLMENTS_3';
    paymentStatus?: 'REGISTRATION_PAID' | 'PARTIALLY_PAID' | 'FULLY_PAID';
    mode?: string;
  }
): Promise<Enrollment> {
  invalidateEnrollmentsCache();
  const course = await getCourseById(courseId);
  if (!course) throw new Error('Course not found');

  const totalFee = extra?.totalFee ?? (course.discountFee || course.fee);
  const registrationFeePaid = extra?.registrationFeePaid ?? 2000;
  const remainingFee = extra?.remainingFee ?? Math.max(0, totalFee - registrationFeePaid);

  const newEnrId = `enr-${Date.now()}`;
  const newEnr: Enrollment = {
    id: newEnrId,
    userId,
    userName: extra?.userName,
    userEmail: extra?.userEmail,
    userPhone: extra?.userPhone,
    courseId,
    courseTitle: course.title,
    courseSlug: course.slug,
    status: 'ACTIVE',
    progress: 10,
    batchTiming: batchTiming || 'Mon-Fri (7:30 PM - 9:30 PM)',
    mode: extra?.mode || 'Live Online',
    enrolledAt: new Date().toISOString(),
    course,
    totalFee,
    registrationFeePaid,
    remainingFee,
    paymentPlan: extra?.paymentPlan || 'LUMPSUM',
    paymentStatus: extra?.paymentStatus || 'REGISTRATION_PAID',
    lastPaymentDate: new Date().toISOString(),
  };

  if (!isPlaceholderDb) {
    try {
      await prisma.enrollment.create({
        data: {
          id: newEnrId,
          userId,
          courseId,
          status: 'ACTIVE',
          progress: 10,
          batchTiming: batchTiming || 'Mon-Fri (7:30 PM - 9:30 PM)',
          mode: extra?.mode || 'Live Online',
        },
      });
    } catch (err) {
      console.error('Error creating enrollment in prisma:', err);
    }
  }

  memoryEnrollments.unshift(newEnr);
  return newEnr;
}

export async function updateEnrollment(id: string, data: Partial<Enrollment>): Promise<Enrollment | null> {
  invalidateEnrollmentsCache();
  if (!isPlaceholderDb) {
    try {
      await prisma.enrollment.update({
        where: { id },
        data: {
          ...(data.status && { status: data.status as any }),
          ...(data.progress !== undefined && { progress: data.progress }),
          ...(data.batchTiming !== undefined && { batchTiming: data.batchTiming }),
          ...(data.mode !== undefined && { mode: data.mode }),
        },
      });
    } catch (err) {
      console.error('Error updating enrollment in prisma:', err);
    }
  }
  const item = memoryEnrollments.find((e) => e.id === id);
  if (item) {
    Object.assign(item, data);
    return item;
  }
  return null;
}

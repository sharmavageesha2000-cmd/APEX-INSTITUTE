export type Role = 'STUDENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  education?: string;
  graduationYear?: string;
  careerInterest?: string;
  role: Role;
  avatar?: string;
  createdAt: string;
}

export interface Domain {
  id: string;
  name: string;
  slug: string;
  headline: string;
  description: string;
  iconName: string;
  image?: string;
  subcategories: string[];
  featured: boolean;
  courseCount?: number;
}

export interface SyllabusModule {
  moduleNumber: number;
  title: string;
  duration: string;
  topics: string[];
  practicalLab?: string;
}

export interface CareerRole {
  title: string;
  avgSalary: string;
  hiringCompanies: string[];
}

export interface CourseInstructor {
  name: string;
  title: string;
  experience: string;
  expertise: string[];
  photo: string;
  linkedin?: string;
}

export interface CourseProject {
  title: string;
  description: string;
  techStack: string[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  headline: string;
  description: string;
  image?: string;
  domainId: string;
  domainName?: string;
  domainSlug?: string;
  duration: string;
  fee: number;
  discountFee?: number;
  level: string;
  mode: string;
  badge?: string;
  categoryTag?: 'TRENDING' | 'POPULAR' | 'NEW' | 'JOB_ORIENTED';
  rating: number;
  totalStudents: number;
  syllabus: SyllabusModule[];
  careerRoles: CareerRole[];
  highlights: string[];
  instructor: CourseInstructor;
  projects: CourseProject[];
  faqs: CourseFAQ[];
  prerequisites: string[];
  whoShouldTake: string[];
  toolsCovered: string[];
  placementAssistance: boolean;
  featured: boolean;
  createdAt?: string;
}

export type EnrollmentStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface Enrollment {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  courseId: string;
  courseTitle?: string;
  courseSlug?: string;
  status: EnrollmentStatus;
  progress: number;
  batchTiming?: string;
  mode?: string;
  enrolledAt: string;
  course?: Course;
}

export type EnquiryStatus = 'NEW' | 'IN_PROGRESS' | 'CONVERTED' | 'CLOSED';
export type EnquiryType = 'ENQUIRY' | 'FREE_COUNSELLING';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseId?: string;
  courseTitle?: string;
  domain?: string;
  type?: EnquiryType;
  preferredContact?: string;
  preferredDate?: string;
  preferredTime?: string;
  message: string;
  status: EnquiryStatus;
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userId?: string;
  userName: string;
  userRole: string;
  company?: string;
  previousBackground?: string;
  avatar?: string;
  courseId: string;
  courseTitle?: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  authorName: string;
  authorTitle: string;
  authorPhoto: string;
  readTime: string;
  summary: string;
  content: string;
  featured: boolean;
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  time: string;
  location: string;
  speakerName: string;
  speakerRole: string;
  speakerFoto: string;
  description: string;
  featured: boolean;
  createdAt: string;
}

export interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  whatsappNo: string;
}

export type NotificationType = 'ENROLLMENT' | 'CLASS' | 'CERTIFICATE' | 'ANNOUNCEMENT' | 'EVENT';

export interface StudentNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

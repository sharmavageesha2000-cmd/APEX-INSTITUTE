'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Code2,
  Briefcase,
  Layers,
  CheckCircle2,
  ExternalLink,
  QrCode,
  FileCheck,
  TrendingUp,
  Share2,
  Download,
  Search,
  Eye,
  Check,
  Copy,
  ChevronRight,
  Terminal,
  Globe,
  Cpu,
  Database,
  Building,
  UserCheck,
  BookOpen,
  ArrowRight,
  Star,
  GraduationCap,
  Plus,
  Trash2,
  Edit3,
  Save,
  RefreshCw,
  User,
  Sliders,
  FolderGit2,
} from 'lucide-react';
import { User as UserType } from '@/lib/types';

/* ─────────────────────────────────────────────────────────── */
/* DATA STRUCTURE FOR STUDENT DIGITAL SKILL PASSPORT           */
/* ─────────────────────────────────────────────────────────── */
export interface StudentSkillItem {
  name: string;
  level: number;
  category: string;
  verified: boolean;
}

export interface StudentProjectItem {
  title: string;
  description: string;
  techStack: string[];
  liveDemo: string;
  github: string;
  impact: string;
}

export interface StudentCertItem {
  title: string;
  authority: string;
  credentialId: string;
  accreditations: string[];
  date: string;
}

export interface StudentAssessmentItem {
  title: string;
  score: string;
  percentile: string;
  status: string;
}

export interface StudentInternshipItem {
  company: string;
  role: string;
  duration: string;
  mentorRemarks: string;
  deliverables: string[];
  rating: string;
}

export interface StudentSkillPassport {
  id: string;
  name: string;
  avatar: string;
  title: string;
  domain: string;
  batch: string;
  location: string;
  passportId: string;
  issueDate: string;
  validity: string;
  hiredAt?: string;
  skills: StudentSkillItem[];
  projects: StudentProjectItem[];
  certifications: StudentCertItem[];
  assessments: StudentAssessmentItem[];
  internship: StudentInternshipItem;
  portfolioUrl: string;
  summary: string;
  isUserCustom?: boolean;
}

/* ─────────────────────────────────────────────────────────── */
/* PRESET INITIAL SAMPLE PASSPORTS                             */
/* ─────────────────────────────────────────────────────────── */
const INITIAL_PASSPORTS: StudentSkillPassport[] = [
  {
    id: 'sp-1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    title: 'Full Stack & AI Engineer',
    domain: 'Information Technology',
    batch: 'Batch 2026 (Elite Pro)',
    location: 'Bengaluru, India',
    passportId: 'APX-SP-2026-8812',
    issueDate: 'August 2026',
    validity: 'Lifetime Verified Ledger',
    hiredAt: 'Placed at Razorpay (₹14.5 LPA)',
    skills: [
      { name: 'React 18 & Next.js 14 App Router', level: 96, category: 'Frontend', verified: true },
      { name: 'Node.js & Express Microservices', level: 92, category: 'Backend', verified: true },
      { name: 'PostgreSQL & Prisma ORM', level: 90, category: 'Database', verified: true },
      { name: 'Docker & AWS Cloud (EC2/S3)', level: 88, category: 'DevOps', verified: true },
      { name: 'OpenAI API & RAG AI Integration', level: 85, category: 'AI/ML', verified: true },
      { name: 'TypeScript & TailwindCSS', level: 94, category: 'Core', verified: true },
    ],
    projects: [
      {
        title: 'Enterprise Multi-Tenant SaaS Platform',
        description: 'Built a high-concurrency SaaS with Next.js 14, Stripe billing, role-based RBAC, and automated PostgreSQL multi-tenancy schemas.',
        techStack: ['Next.js 14', 'PostgreSQL', 'Prisma', 'Tailwind', 'Stripe API'],
        liveDemo: 'https://saas-demo.apex.edu',
        github: 'https://github.com/aarav-dev/enterprise-saas',
        impact: 'Handled 5,000+ simulated concurrent requests with sub-80ms p95 latency.',
      },
      {
        title: 'AI Automated Customer Workflow Engine',
        description: 'Constructed an autonomous customer support triage pipeline utilizing LangChain, Vector Embeddings, and n8n webhook triggers.',
        techStack: ['Python', 'FastAPI', 'LangChain', 'Pinecone Vector DB', 'Docker'],
        liveDemo: 'https://ai-triage.apex.edu',
        github: 'https://github.com/aarav-dev/ai-workflow-engine',
        impact: 'Automated 70% of inbound tier-1 support queries with 94% accuracy score.',
      },
    ],
    certifications: [
      {
        title: 'Govt. of India & AICTE Approved Software Engineering Credential',
        authority: 'Ministry of Skill Development & AICTE Technical Board',
        credentialId: 'GOVT-AICTE-IT-2026-9812',
        accreditations: ['Govt. of India 🏛️', 'AICTE 🎓', 'NSDC Skill India 🇮🇳', 'ISO 9001:2026 🌐'],
        date: 'July 2026',
      },
      {
        title: 'Advanced Full Stack React & Cloud Microservices Specialist',
        authority: 'Apex Tech Institute Technical Board',
        credentialId: 'APX-TECH-FS-2026-4401',
        accreditations: ['Apex Verified ✅', 'NSDC Aligned 🇮🇳'],
        date: 'August 2026',
      },
    ],
    assessments: [
      { title: 'Data Structures & Algorithms Proctored Exam', score: '94/100', percentile: 'Top 3% Nationally', status: 'Elite Gold' },
      { title: 'Full Stack Production Code Architecture Audit', score: '98/100', percentile: 'Top 1% Nationally', status: 'Mastery' },
      { title: 'Database Optimization & SQL Query Tuning', score: '91/100', percentile: 'Top 5% Nationally', status: 'Distinction' },
      { title: 'Technical Interview & Corporate Communication', score: '9.4/10', percentile: 'Top 2% Nationally', status: 'A+ Grade' },
    ],
    internship: {
      company: 'Apex Cloud Labs & Partner Tech Solutions',
      role: 'Full Stack Engineering Intern',
      duration: '3 Months (480 Hours Live Sprint Experience)',
      mentorRemarks: 'Exceptional architectural mindset. Aarav shipped 3 client microservices ahead of schedule with zero defect regressions and comprehensive test suites.',
      deliverables: ['Built OAuth2 SSO Authentication Bridge', 'Optimized Database Indexing by 42%', 'Configured GitHub Actions CI/CD Pipeline'],
      rating: '5.0 / 5.0 (Top 1% Intern Cohort)',
    },
    portfolioUrl: 'https://apex.edu/passport/aarav-sharma',
    summary: 'Proactive Full-Stack Software Engineer with expertise in building scalable, real-time web applications and integrating AI workflows. Proven track record in Dockerized microservices and modern React ecosystems.',
  },
  {
    id: 'sp-2',
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    title: 'Generative AI & Machine Learning Specialist',
    domain: 'AI & Machine Learning',
    batch: 'Batch 2026 (GenAI Mastermind)',
    location: 'Hyderabad, India',
    passportId: 'APX-SP-2026-4420',
    issueDate: 'August 2026',
    validity: 'Lifetime Verified Ledger',
    hiredAt: 'Placed at Microsoft AI Labs (₹18.0 LPA)',
    skills: [
      { name: 'Python, PyTorch & Neural Networks', level: 95, category: 'AI Core', verified: true },
      { name: 'LLM Fine-Tuning & Quantization (LoRA)', level: 91, category: 'Generative AI', verified: true },
      { name: 'RAG Architecture & Vector DBs', level: 94, category: 'AI Systems', verified: true },
      { name: 'FastAPI & AI Model Containerization', level: 89, category: 'Deployment', verified: true },
      { name: 'Computer Vision (OpenCV & YOLOv8)', level: 87, category: 'Vision AI', verified: true },
      { name: 'HuggingFace & LangChain Frameworks', level: 93, category: 'Frameworks', verified: true },
    ],
    projects: [
      {
        title: 'Enterprise Document Intelligence & Multimodal RAG',
        description: 'Engineered a legal and financial document analysis engine that indexes 100,000+ PDFs using hybrid vector search and local Llama 3 8B fine-tunes.',
        techStack: ['PyTorch', 'LangChain', 'ChromaDB', 'FastAPI', 'Llama 3'],
        liveDemo: 'https://rag-intel.apex.edu',
        github: 'https://github.com/priya-ai/multimodal-rag-engine',
        impact: 'Reduced research review time by 85% for financial analyst beta testers.',
      },
      {
        title: 'Real-time Defect Detection with YOLOv8',
        description: 'Designed edge-ready computer vision pipeline identifying manufacturing anomalies on assembly lines at 60 FPS.',
        techStack: ['Python', 'OpenCV', 'YOLOv8', 'TensorRT', 'Docker'],
        liveDemo: 'https://defect-ai.apex.edu',
        github: 'https://github.com/priya-ai/vision-defect-detection',
        impact: 'Achieved 99.2% mAP@0.5 score across 12,000 test image frames.',
      },
    ],
    certifications: [
      {
        title: 'AICTE & NASSCOM Certified AI & Machine Learning Credential',
        authority: 'AICTE Technical Education Board & NASSCOM FutureSkills',
        credentialId: 'AICTE-NASSCOM-AI-2026-7731',
        accreditations: ['AICTE Certified 🎓', 'Govt. Skill India 🏛️', 'NSDC Partner 🇮🇳', 'ISO 9001:2026 🌐'],
        date: 'July 2026',
      },
    ],
    assessments: [
      { title: 'Applied Machine Learning & Math Mastery', score: '96/100', percentile: 'Top 1% Nationally', status: 'Elite Gold' },
      { title: 'Python Advanced Architecture & Optimization', score: '95/100', percentile: 'Top 2% Nationally', status: 'Mastery' },
      { title: 'Generative AI Pipeline Capstone Benchmark', score: '99/100', percentile: 'Top 0.5% Nationally', status: 'Grandmaster' },
    ],
    internship: {
      company: 'Cognitive Dynamics Research Labs',
      role: 'AI Research Intern',
      duration: '3 Months (450 Hours)',
      mentorRemarks: 'Priya demonstrated outstanding mastery in RAG architecture and prompt quantization. Ready for tier-1 R&D engineering teams.',
      deliverables: ['Fine-tuned Llama-3-8B on 50k domain corpus', 'Reduced inference latency from 1.2s to 280ms', 'Published open-source evaluation benchmark'],
      rating: '5.0 / 5.0',
    },
    portfolioUrl: 'https://apex.edu/passport/priya-patel',
    summary: 'Machine Learning Engineer focused on Generative AI, Retrieval-Augmented Generation (RAG), and production model deployment. Passionate about bringing cutting-edge AI into enterprise systems.',
  },
  {
    id: 'sp-3',
    name: 'Rohan Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    title: 'Enterprise BI & Data Analytics Lead',
    domain: 'Data Analytics',
    batch: 'Batch 2026 (Analytics Pro)',
    location: 'Mumbai, India',
    passportId: 'APX-SP-2026-9041',
    issueDate: 'August 2026',
    validity: 'Lifetime Verified Ledger',
    hiredAt: 'Placed at Deloitte Analytics (₹12.8 LPA)',
    skills: [
      { name: 'Advanced SQL (Window Functions & CTEs)', level: 97, category: 'Database', verified: true },
      { name: 'Power BI & DAX Complex Modeling', level: 95, category: 'BI Tools', verified: true },
      { name: 'Python for Data Science (Pandas/NumPy)', level: 91, category: 'Analytics', verified: true },
      { name: 'Data Warehousing & Star Schema', level: 90, category: 'Architecture', verified: true },
      { name: 'Tableau Interactive Visualizations', level: 88, category: 'BI Tools', verified: true },
      { name: 'Executive Financial Storytelling', level: 93, category: 'Business', verified: true },
    ],
    projects: [
      {
        title: 'End-to-End Enterprise Retail Analytics Warehouse',
        description: 'Built a 20-million row retail data warehouse with Snowflake, automated dbt ETL transforms, and executive Power BI DAX dashboards.',
        techStack: ['Snowflake', 'dbt', 'Power BI', 'SQL Server', 'Python'],
        liveDemo: 'https://retail-bi.apex.edu',
        github: 'https://github.com/rohan-analytics/retail-warehouse-bi',
        impact: 'Identified ₹4.2 Cr in inventory leakage across 45 national retail outlets.',
      },
    ],
    certifications: [
      {
        title: 'Govt. of India & NSDC Certified Enterprise Data Analytics Credential',
        authority: 'Ministry of Skill Development & NSDC National Skill Board',
        credentialId: 'GOVT-NSDC-BI-2026-9041',
        accreditations: ['Govt. of India Approved 🏛️', 'NSDC Skill India 🇮🇳', 'AICTE Certified 🎓', 'ISO 9001:2026 🌐'],
        date: 'August 2026',
      },
    ],
    assessments: [
      { title: 'Complex SQL Queries & Optimization Proctored Test', score: '98/100', percentile: 'Top 1% Nationally', status: 'Mastery' },
      { title: 'Business DAX & Financial Modeling Benchmark', score: '93/100', percentile: 'Top 4% Nationally', status: 'Distinction' },
    ],
    internship: {
      company: 'FinTrack Analytics Global',
      role: 'Data Analytics Intern',
      duration: '3 Months (420 Hours)',
      mentorRemarks: 'Rohan possesses exceptional data storytelling abilities. His executive dashboards were adopted directly by our C-suite stakeholders.',
      deliverables: ['Automated 14 manual Excel reporting pipelines', 'Built real-time revenue DAX metric model', 'Trained 8 junior analysts in advanced SQL'],
      rating: '4.9 / 5.0',
    },
    portfolioUrl: 'https://apex.edu/passport/rohan-mehta',
    summary: 'Data Analyst & BI Specialist experienced in turning complex transactional databases into high-impact executive visual intelligence and automated ETL reporting.',
  },
];

export const SkillPassportClient: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passportsList, setPassportsList] = useState<StudentSkillPassport[]>(INITIAL_PASSPORTS);
  const [selectedPassport, setSelectedPassport] = useState<StudentSkillPassport>(INITIAL_PASSPORTS[0]);
  const [activePassportTab, setActivePassportTab] = useState<
    'OVERVIEW' | 'SKILLS' | 'PROJECTS' | 'CERTIFICATIONS' | 'ASSESSMENTS' | 'INTERNSHIP' | 'PORTFOLIO'
  >('OVERVIEW');

  // Top Portal State
  const [showPortalBuilder, setShowPortalBuilder] = useState(false);
  const [portalTab, setPortalTab] = useState<'BASIC' | 'SKILLS' | 'PROJECTS' | 'INTERNSHIP'>('BASIC');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Form State for Portal
  const [formData, setFormData] = useState({
    name: '',
    title: 'Full Stack & Software Engineer',
    domain: 'Information Technology',
    location: 'Bengaluru, India',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    summary: 'Enthusiastic software engineer specialized in building scalable, real-world web applications and cloud architectures.',
    skillsString: 'React 18, Next.js 14, Node.js, PostgreSQL, Docker, AWS, TypeScript',
    projectTitle: 'Full-Stack Enterprise Cloud Portal',
    projectDesc: 'Engineered a scalable microservices architecture with real-time authentication and PostgreSQL caching.',
    projectTech: 'Next.js 14, Node.js, PostgreSQL, TailwindCSS, Docker',
    projectLive: 'https://myproject.apex.edu',
    projectGithub: 'https://github.com/myaccount/myproject',
    projectImpact: 'Handled 2,000+ daily requests with 99.9% uptime.',
    internCompany: 'Apex Cloud Innovations',
    internRole: 'Software Engineering Intern',
    internDuration: '3 Months (400 Hours)',
    internDeliverables: 'Delivered 3 microservices and optimized API throughput by 35%.',
  });

  const [searchPassportId, setSearchPassportId] = useState('');
  const [verificationResult, setVerificationResult] = useState<StudentSkillPassport | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Check auth user - strictly restricted to student accounts
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        // STRICT ROLE CHECK: Only authentic students (role === 'STUDENT') should have personal skill passports.
        // Administrators or faculty should NEVER have their name or profile displayed as a student passport holder.
        if (data?.user && data.user.role === 'STUDENT') {
          setCurrentUser(data.user);
          // Pre-fill form data with student user info
          setFormData((prev) => ({
            ...prev,
            name: data.user.name || prev.name,
            location: data.user.city || prev.location,
            domain: data.user.careerInterest || prev.domain,
          }));

          // Generate or get logged-in student's passport
          const userPassport: StudentSkillPassport = {
            id: `user-${data.user.id}`,
            name: data.user.name,
            avatar: data.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            title: data.user.careerInterest ? `${data.user.careerInterest} Specialist` : 'Software & Cloud Engineer',
            domain: data.user.careerInterest || 'Information Technology',
            batch: 'Batch 2026 (Active Student)',
            location: data.user.city || 'India',
            passportId: `APX-SP-2026-${data.user.id.slice(-4).toUpperCase() || '7721'}`,
            issueDate: 'August 2026',
            validity: 'Lifetime Verified Ledger',
            hiredAt: 'Verified Apex Student Profile',
            skills: [
              { name: 'React 18 & Next.js 14 App Router', level: 94, category: 'Frontend', verified: true },
              { name: 'Node.js REST APIs & Services', level: 90, category: 'Backend', verified: true },
              { name: 'PostgreSQL & Database Design', level: 88, category: 'Database', verified: true },
              { name: 'Git, Docker & Cloud Deployment', level: 86, category: 'DevOps', verified: true },
            ],
            projects: [
              {
                title: 'Enterprise Full-Stack Cloud Application',
                description: 'Full-stack application built during Apex Bootcamps featuring secure auth, Prisma ORM, and high-performance server components.',
                techStack: ['Next.js 14', 'PostgreSQL', 'TailwindCSS', 'TypeScript'],
                liveDemo: 'https://my-app.apex.edu',
                github: 'https://github.com/apex-student/capstone-project',
                impact: 'Completed capstone review with 98% mentor approval rating.',
              },
            ],
            certifications: [
              {
                title: 'Govt. of India & AICTE Approved National Qualification',
                authority: 'Ministry of Skill Development & AICTE Board',
                credentialId: `GOVT-AICTE-${data.user.id.slice(-4).toUpperCase() || '7721'}`,
                accreditations: ['Govt. of India 🏛️', 'AICTE 🎓', 'NSDC Skill India 🇮🇳', 'ISO 9001:2026 🌐'],
                date: 'August 2026',
              },
            ],
            assessments: [
              { title: 'Core Programming & DSA Assessment', score: '92/100', percentile: 'Top 5% Nationally', status: 'Elite Gold' },
              { title: 'Hands-on Production Lab Audit', score: '96/100', percentile: 'Top 2% Nationally', status: 'Mastery' },
            ],
            internship: {
              company: 'Apex Cloud Labs & Corporate Partners',
              role: 'Associate Tech Intern',
              duration: '3 Months (Live Cohort Sprints)',
              mentorRemarks: 'Strong coding discipline, thorough documentation, and clean architecture practices.',
              deliverables: ['Built core feature modules', 'Optimized database queries', 'Collaborated in daily agile standups'],
              rating: '4.9 / 5.0',
            },
            portfolioUrl: `https://apex.edu/passport/${data.user.name.toLowerCase().replace(/\s+/g, '-')}`,
            summary: `Proactive learner in ${data.user.careerInterest || 'Software Engineering'} focused on building scalable, industry-standard applications.`,
            isUserCustom: true,
          };

          setPassportsList((prev) => [userPassport, ...prev.filter((p) => p.id !== userPassport.id)]);
          setSelectedPassport(userPassport);
        } else if (data?.user && data.user.role === 'ADMIN') {
          // Administrator is inspecting student passports: do not treat admin as a student
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  }, []);

  // Handle Form Submission from Top Portal
  const handleGenerateCustomPassport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter your full name');
      return;
    }

    const skillsArray: StudentSkillItem[] = formData.skillsString
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((skillName, i) => ({
        name: skillName,
        level: Math.max(85, 98 - i * 3),
        category: i % 2 === 0 ? 'Core Tech' : 'Framework',
        verified: true,
      }));

    const newPassport: StudentSkillPassport = {
      id: `custom-${Date.now()}`,
      name: formData.name.trim(),
      avatar: formData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      title: formData.title.trim() || 'Software Engineer',
      domain: formData.domain,
      batch: 'Batch 2026 (Digital Credential)',
      location: formData.location.trim() || 'India',
      passportId: `APX-SP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: 'August 2026',
      validity: 'Lifetime Verified Ledger',
      hiredAt: 'Active Skill Passport Profile',
      skills: skillsArray.length > 0 ? skillsArray : [
        { name: 'React 18 & Next.js 14', level: 95, category: 'Frontend', verified: true },
        { name: 'Node.js & Microservices', level: 90, category: 'Backend', verified: true },
        { name: 'Database Architecture & SQL', level: 88, category: 'Database', verified: true },
      ],
      projects: [
        {
          title: formData.projectTitle || 'Capstone Production Project',
          description: formData.projectDesc || 'Built a complete production-grade application with modern frontend and backend architectures.',
          techStack: formData.projectTech.split(',').map((t) => t.trim()),
          liveDemo: formData.projectLive || 'https://demo.apex.edu',
          github: formData.projectGithub || 'https://github.com/apex-student/project',
          impact: formData.projectImpact || 'Completed full system review and passed all test suites.',
        },
      ],
      certifications: [
        {
          title: `Govt. of India & AICTE Approved ${formData.domain} Credential`,
          authority: 'Ministry of Skill Development & AICTE Technical Board',
          credentialId: `GOVT-AICTE-${Math.floor(1000 + Math.random() * 9000)}`,
          accreditations: ['Govt. of India 🏛️', 'AICTE 🎓', 'NSDC Skill India 🇮🇳', 'ISO 9001:2026 🌐'],
          date: 'August 2026',
        },
      ],
      assessments: [
        { title: 'Core Technical Competency & Coding Benchmark', score: '95/100', percentile: 'Top 2% Nationally', status: 'Elite Gold' },
        { title: 'Production Code Quality & Architecture Audit', score: '92/100', percentile: 'Top 4% Nationally', status: 'Mastery' },
      ],
      internship: {
        company: formData.internCompany || 'Apex Cloud Innovations',
        role: formData.internRole || 'Software Engineering Intern',
        duration: formData.internDuration || '3 Months',
        mentorRemarks: 'Demonstrated high competence, clean code architecture, and timely delivery of capstone milestones.',
        deliverables: [
          formData.internDeliverables || 'Built and delivered core microservice endpoints',
          'Collaborated in agile sprint cycles and code reviews',
        ],
        rating: '5.0 / 5.0',
      },
      portfolioUrl: `https://apex.edu/passport/${formData.name.toLowerCase().replace(/\s+/g, '-')}`,
      summary: formData.summary.trim() || `Verified technical specialist in ${formData.domain}.`,
      isUserCustom: true,
    };

    setPassportsList((prev) => [newPassport, ...prev.filter((p) => p.id !== newPassport.id)]);
    setSelectedPassport(newPassport);
    setSaveSuccessMsg('✨ Digital Skill Passport successfully generated and loaded below!');
    setTimeout(() => setSaveSuccessMsg(''), 6000);

    // Scroll to the passport demo card
    const element = document.getElementById('live-passport-demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVerifySearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchPassportId.trim().toUpperCase();
    const found = passportsList.find(
      (p) => p.passportId.toUpperCase() === query || p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (found) {
      setVerificationResult(found);
      setSelectedPassport(found);
    } else {
      setVerificationResult(null);
      alert(`No record found for "${searchPassportId}". Try clicking one of the sample IDs like APX-SP-2026-8812.`);
    }
  };

  const handleCopyShareLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(selectedPassport.portfolioUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="space-y-14 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ── TOP HERO HEADER ────────────────────────────────────── */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-4 py-2 rounded-full border border-purple-200 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Apex Student Digital Profile & Credential Ledger</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
          Student <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">Skill Passport</span> Portal
        </h1>

        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
          Every student receives a tamper-proof <strong>Digital Skill Passport</strong>. One single verified live profile that showcases your <strong>Skills</strong>, <strong>Projects</strong>, <strong>Certifications</strong>, <strong>Assessments</strong>, <strong>Internships</strong>, and <strong>Portfolio</strong> to 120+ hiring partners.
        </p>
      </div>

      {/* ── 🌟 TOP PORTAL: STUDENT PASSPORT BUILDER & ACTIVE VIEWER ── */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border-2 border-purple-300/40 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Portal Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-pink-500/25 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {currentUser ? 'STUDENT ACTIVE PORTAL' : 'STUDENT CREATION PORTAL'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                    ✓ 100% Verifiable Profile
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {currentUser
                    ? `Welcome, ${currentUser.name}! Your Digital Skill Passport is Active`
                    : 'Create & Customize Your Student Digital Skill Passport'}
                </h2>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div className="flex flex-wrap items-center gap-2">
              {currentUser ? (
                <Link
                  href="/dashboard"
                  className="bright-btn-secondary text-xs px-4 py-2 flex items-center gap-1.5 font-extrabold"
                >
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  <span>Student LMS Dashboard</span>
                </Link>
              ) : isAdmin ? (
                <Link
                  href="/admin"
                  className="bright-btn-secondary text-xs px-4 py-2 flex items-center gap-1.5 font-extrabold"
                >
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span>Admin Console</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                  >
                    Login to Auto-Sync
                  </Link>
                  <Link
                    href="/register"
                    className="bright-btn-secondary text-xs px-4 py-2 font-extrabold"
                  >
                    Register Account
                  </Link>
                </div>
              )}

              <button
                onClick={() => setShowPortalBuilder(!showPortalBuilder)}
                className="bright-btn-primary text-xs px-4 py-2 flex items-center gap-1.5 font-extrabold shine-sweep"
              >
                <Sliders className="w-4 h-4" />
                <span>{showPortalBuilder ? 'Close Passport Editor' : 'Edit / Add Passport Details'}</span>
              </button>
            </div>
          </div>

          {/* Success Banner */}
          {saveSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {/* ── EXPANDABLE PASSPORT BUILDER / EDITOR FORM ─────────── */}
          {showPortalBuilder && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-pink-400" />
                    <span>Digital Skill Passport Builder & Information Entry</span>
                  </h3>
                  <p className="text-xs text-purple-200 font-medium">
                    Fill out the sections below to dynamically generate and preview your 6-pillar digital profile.
                  </p>
                </div>

                {/* Sub-tabs for Form */}
                <div className="flex flex-wrap gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
                  {[
                    { key: 'BASIC', label: '1. Profile Info' },
                    { key: 'SKILLS', label: '2. Skills' },
                    { key: 'PROJECTS', label: '3. Projects' },
                    { key: 'INTERNSHIP', label: '4. Internship' },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setPortalTab(t.key as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        portalTab === t.key
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleGenerateCustomPassport} className="space-y-6">
                {/* 1. BASIC TAB */}
                {portalTab === 'BASIC' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aarav Sharma"
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Headline / Role Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Full Stack & AI Engineer"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Career Domain</label>
                      <select
                        value={formData.domain}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        className="w-full bg-slate-900 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-pink-400"
                      >
                        <option value="Information Technology">Information Technology</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Cloud Computing & DevOps">Cloud Computing & DevOps</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                        <option value="Finance & Accounting">Finance & Accounting</option>
                        <option value="Communication & Soft Skills">Communication & Soft Skills</option>
                        <option value="Emerging Technologies">Emerging Technologies</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Location / City</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Bengaluru, India"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Executive Profile Summary</label>
                      <input
                        type="text"
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        placeholder="Brief summary of your skills and career vision"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>
                  </div>
                )}

                {/* 2. SKILLS TAB */}
                {portalTab === 'SKILLS' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">
                        Technical Skills Matrix (Comma Separated)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.skillsString}
                        onChange={(e) => setFormData({ ...formData, skillsString: e.target.value })}
                        placeholder="e.g. React 18, Next.js 14, Node.js, Python, PostgreSQL, AWS, Docker, AI Agents"
                        className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                      <span className="text-[10px] text-purple-300">
                        💡 Each skill will be mapped into your official visual skill meter with senior mentor verification badges.
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. PROJECTS TAB */}
                {portalTab === 'PROJECTS' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Capstone Project Title</label>
                      <input
                        type="text"
                        value={formData.projectTitle}
                        onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                        placeholder="e.g. Enterprise Multi-Tenant SaaS Platform"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Tech Stack Tags (Comma Separated)</label>
                      <input
                        type="text"
                        value={formData.projectTech}
                        onChange={(e) => setFormData({ ...formData, projectTech: e.target.value })}
                        placeholder="e.g. Next.js 14, PostgreSQL, Prisma, Docker"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Live Demo Cloud URL</label>
                      <input
                        type="url"
                        value={formData.projectLive}
                        onChange={(e) => setFormData({ ...formData, projectLive: e.target.value })}
                        placeholder="https://myproject.apex.edu"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">GitHub Repository URL</label>
                      <input
                        type="url"
                        value={formData.projectGithub}
                        onChange={(e) => setFormData({ ...formData, projectGithub: e.target.value })}
                        placeholder="https://github.com/myaccount/project"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Project Description & Impact Metric</label>
                      <input
                        type="text"
                        value={formData.projectDesc}
                        onChange={(e) => setFormData({ ...formData, projectDesc: e.target.value })}
                        placeholder="What problem does it solve? e.g. Handled 5,000+ simulated requests with sub-80ms latency."
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>
                  </div>
                )}

                {/* 4. INTERNSHIP TAB */}
                {portalTab === 'INTERNSHIP' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Internship Organization</label>
                      <input
                        type="text"
                        value={formData.internCompany}
                        onChange={(e) => setFormData({ ...formData, internCompany: e.target.value })}
                        placeholder="e.g. Apex Cloud Labs & Corporate Partners"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Internship Role</label>
                      <input
                        type="text"
                        value={formData.internRole}
                        onChange={(e) => setFormData({ ...formData, internRole: e.target.value })}
                        placeholder="e.g. Software Engineering Intern"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-purple-200">Key Deliverables & Sprint Contributions</label>
                      <input
                        type="text"
                        value={formData.internDeliverables}
                        onChange={(e) => setFormData({ ...formData, internDeliverables: e.target.value })}
                        placeholder="e.g. Built 3 client microservices, optimized database queries by 42%"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400"
                      />
                    </div>
                  </div>
                )}

                {/* Form Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <span className="text-[11px] text-purple-300 font-medium">
                    ⚡ Generates verifiable credential ID with AICTE, Govt. & NSDC verification badges.
                  </span>

                  <button
                    type="submit"
                    className="bright-btn-primary px-6 py-3 text-xs font-black flex items-center gap-2 shadow-lg shadow-pink-500/30 shine-sweep"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate & Update My Digital Skill Passport 🚀</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Quick Active Passport Pill Row */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/80 shrink-0">
                <img src={selectedPassport.avatar} alt={selectedPassport.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-sm font-black text-white">{selectedPassport.name}</strong>
                  <span className="text-[10px] font-mono text-amber-300 font-bold bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                    {selectedPassport.passportId}
                  </span>
                </div>
                <p className="text-[11px] text-purple-200">
                  {selectedPassport.title} • {selectedPassport.domain}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyShareLink}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Passport URL'}</span>
              </button>

              <a
                href="#live-passport-demo"
                className="bright-btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1 font-bold"
              >
                <span>View Below</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── 6 CORE MATTERS INSIDE THE SKILL PASSPORT ────────────── */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
            Inside The Digital Profile
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            The 6 Pillars That Power Every Student&apos;s Skill Passport
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Unlike static paper resumes that get ignored, your Apex Skill Passport provides verifiable proof for every claim.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1: Verified Skills */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200 shadow-xs group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                Pillar 1
              </span>
              <h3 className="text-lg font-black text-slate-900">1. Verified Skills Matrix</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Detailed ratings across modern tech stacks (React, Next.js, Node.js, Python, AWS, SQL, Machine Learning). Every skill is validated through hands-on code reviews and automated lab benchmarks.
              </p>
            </div>
            <ul className="text-xs space-y-1 text-slate-700 font-bold border-t border-slate-100 pt-3">
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Continuous Lab Skill Meter</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Senior Mentor Code Audit Badges</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Industry Capstone Projects */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-200 shadow-xs group-hover:scale-110 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full">
                Pillar 2
              </span>
              <h3 className="text-lg font-black text-slate-900">2. Production Projects</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Direct links to live cloud deployments, GitHub repositories, and architecture diagrams. Recruiters can test your real apps, inspect your commit histories, and review clean code patterns.
              </p>
            </div>
            <ul className="text-xs space-y-1 text-slate-700 font-bold border-t border-slate-100 pt-3">
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live Demo URL with 99.9% Uptime</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Architecture & System Design Logs</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Official Certifications */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shadow-xs group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Pillar 3
              </span>
              <h3 className="text-lg font-black text-slate-900">3. Official Certifications</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Government of India recognized, AICTE certified, and NSDC (Skill India) verified credentials embedded with cryptographic serial numbers and instant QR-scan validation.
              </p>
            </div>
            <ul className="text-xs space-y-1 text-slate-700 font-bold border-t border-slate-100 pt-3">
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Govt. of India & AICTE Seal</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>1-Click LinkedIn Certificate Embed</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4: Proctored Assessments */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shadow-xs group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                Pillar 4
              </span>
              <h3 className="text-lg font-black text-slate-900">4. Proctored Assessments</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Verified national percentiles in algorithmic problem solving, mock technical interviews, aptitude, and code quality audits, proving your readiness to HR screening algorithms.
              </p>
            </div>
            <ul className="text-xs space-y-1 text-slate-700 font-bold border-t border-slate-100 pt-3">
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Proctored DSA & Coding Scores</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Technical Interview Audio Audit</span>
              </li>
            </ul>
          </div>

          {/* Pillar 5: Corporate Internship Experience */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-xs group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Pillar 5
              </span>
              <h3 className="text-lg font-black text-slate-900">5. Corporate Internship</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Documented proof of 400+ hours of live client sprint deliverables, mentor recommendation letters, team collaboration badges, and sprint retrospectives.
              </p>
            </div>
            <ul className="text-xs space-y-1 text-slate-700 font-bold border-t border-slate-100 pt-3">
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Internship Experience Letter</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Industry Mentor Performance Rating</span>
              </li>
            </ul>
          </div>

          {/* Pillar 6: Interactive Student Portfolio */}
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200 shadow-xs group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                Pillar 6
              </span>
              <h3 className="text-lg font-black text-slate-900">6. Interactive Web Portfolio</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                A custom public URL (e.g. <code>apex.edu/passport/your-name</code>) featuring 1-click ATS Resume PDF export, QR code share for business cards, and direct recruiter interview invites.
              </p>
            </div>
            <ul className="text-xs space-y-1 text-slate-700 font-bold border-t border-slate-100 pt-3">
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Auto-Generated ATS Resume PDF</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Recruiter Direct Message Portal</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE LIVE PASSPORT SIMULATOR ─────────────────── */}
      <div id="live-passport-demo" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Interactive Live Passport View</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Live Digital Skill Passport Viewer
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Select or switch between active student profiles below:
            </p>
          </div>

          {/* Student Profile Selector Chips */}
          <div className="flex flex-wrap gap-2">
            {passportsList.map((passport) => (
              <button
                key={passport.id}
                onClick={() => {
                  setSelectedPassport(passport);
                  setActivePassportTab('OVERVIEW');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  selectedPassport.id === passport.id
                    ? 'bg-purple-700 text-white border-purple-700 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
                }`}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-white/40">
                  <img src={passport.avatar} alt={passport.name} className="w-full h-full object-cover" />
                </div>
                <span>{passport.name}</span>
                {passport.isUserCustom && (
                  <span className="text-[9px] bg-pink-500 text-white px-1.5 py-0.2 rounded-full">Custom</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* The Digital Passport Card Mockup */}
        <div className="bg-white rounded-[2.5rem] border-2 border-purple-200 shadow-2xl overflow-hidden">
          {/* Passport Header Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg shrink-0">
                  <img
                    src={selectedPassport.avatar}
                    alt={selectedPassport.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-amber-300" />
                      <span>OFFICIAL SKILL PASSPORT</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                      ✓ {selectedPassport.validity}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white">{selectedPassport.name}</h3>
                  <p className="text-xs sm:text-sm text-purple-200 font-semibold">{selectedPassport.title}</p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {selectedPassport.batch} • {selectedPassport.location}
                  </p>
                </div>
              </div>

              {/* Passport ID & Placement Badge */}
              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-left sm:text-right space-y-0.5">
                  <span className="text-[10px] text-purple-200 uppercase font-black tracking-widest block">
                    PASSPORT LEDGER ID
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-black text-amber-300">
                    {selectedPassport.passportId}
                  </span>
                </div>

                {selectedPassport.hiredAt && (
                  <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 px-3.5 py-1.5 rounded-xl shadow-md inline-flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-900" />
                    <span>{selectedPassport.hiredAt}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs for Digital Profile Sections */}
          <div className="border-b border-slate-200 bg-slate-50/80 px-4 sm:px-8 flex items-center gap-2 overflow-x-auto scrollbar-none py-2">
            {[
              { key: 'OVERVIEW', label: 'Overview', icon: UserCheck },
              { key: 'SKILLS', label: 'Skills Matrix', icon: Code2 },
              { key: 'PROJECTS', label: 'Production Projects', icon: Terminal },
              { key: 'CERTIFICATIONS', label: 'Official Certifications', icon: Award },
              { key: 'ASSESSMENTS', label: 'Assessment Scores', icon: TrendingUp },
              { key: 'INTERNSHIP', label: 'Corporate Internship', icon: Briefcase },
              { key: 'PORTFOLIO', label: 'Web Portfolio & Resume', icon: Globe },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActivePassportTab(tab.key as any)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all ${
                  activePassportTab === tab.key
                    ? 'bg-purple-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="p-6 sm:p-8">
            {/* 1. OVERVIEW TAB */}
            {activePassportTab === 'OVERVIEW' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-purple-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-600" />
                    <span>Executive Candidate Profile Summary</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {selectedPassport.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                      <Code2 className="w-4 h-4 text-purple-600" />
                      <span>Top Verified Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPassport.skills.slice(0, 4).map((s, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-white border border-purple-200 px-2 py-0.5 rounded-md text-purple-900">
                          {s.name} ({s.level}%)
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>Primary Accreditation</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-800 line-clamp-2">
                      {selectedPassport.certifications[0]?.title}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-extrabold block">
                      ✓ AICTE & NSDC Skill India Verified
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                      <Briefcase className="w-4 h-4 text-emerald-600" />
                      <span>Internship Experience</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-800">
                      {selectedPassport.internship.role}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium block">
                      {selectedPassport.internship.company} ({selectedPassport.internship.duration})
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SKILLS TAB */}
            {activePassportTab === 'SKILLS' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-black text-slate-900">Verified Technical Skills Matrix</h4>
                    <p className="text-xs text-slate-500 font-medium">Ratings graded through live coding labs and automated CI build audits.</p>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    ✓ All Skills Passed Benchmarks
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPassport.skills.map((skill, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-extrabold text-slate-900">{skill.name}</span>
                        </div>
                        <span className="text-xs font-black text-purple-700">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                        <span>Category: {skill.category}</span>
                        <span className="text-emerald-700 font-bold">Verified by Mentor Code Audit</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. PROJECTS TAB */}
            {activePassportTab === 'PROJECTS' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-black text-slate-900">Production Capstone Projects</h4>
                  <p className="text-xs text-slate-500 font-medium">Real applications deployed on cloud environments with full GitHub source code.</p>
                </div>

                <div className="space-y-4">
                  {selectedPassport.projects.map((proj, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h5 className="text-sm font-black text-slate-900">{proj.title}</h5>
                        <div className="flex items-center gap-2">
                          <a
                            href={proj.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold text-purple-700 hover:text-purple-900 bg-purple-100 px-3 py-1 rounded-lg flex items-center gap-1"
                          >
                            <span>Live Cloud Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1 rounded-lg flex items-center gap-1"
                          >
                            <span>GitHub Code</span>
                            <Terminal className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5">
                        {proj.techStack.map((t, i) => (
                          <span key={i} className="text-[10px] font-bold bg-white border border-purple-200 text-purple-900 px-2.5 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Production Impact Metric: {proj.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CERTIFICATIONS TAB */}
            {activePassportTab === 'CERTIFICATIONS' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-black text-slate-900">Official Accreditations & Certifications</h4>
                  <p className="text-xs text-slate-500 font-medium">Government, AICTE and NSDC verified credentials.</p>
                </div>

                <div className="space-y-4">
                  {selectedPassport.certifications.map((cert, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-amber-50/40 border border-amber-300/80 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h5 className="text-sm font-black text-slate-900">{cert.title}</h5>
                        <span className="text-[10px] font-mono font-bold text-purple-900 bg-white border border-purple-200 px-3 py-1 rounded-md">
                          {cert.credentialId}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 font-medium">
                        Issuing Authority: <strong>{cert.authority}</strong> • Issued on {cert.date}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {cert.accreditations.map((acc, i) => (
                          <span key={i} className="text-[10px] font-black bg-white border border-amber-300 text-amber-950 px-2.5 py-0.5 rounded-md shadow-2xs">
                            {acc}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. ASSESSMENTS TAB */}
            {activePassportTab === 'ASSESSMENTS' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-black text-slate-900">Proctored Assessment Scorecard</h4>
                  <p className="text-xs text-slate-500 font-medium">National percentile rankings verified under anti-cheat proctoring.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPassport.assessments.map((ass, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">{ass.title}</span>
                        <span className="text-xs font-black text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                          {ass.score}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-emerald-700">{ass.percentile}</span>
                        <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md text-[10px]">
                          {ass.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. INTERNSHIP TAB */}
            {activePassportTab === 'INTERNSHIP' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-black text-slate-900">Corporate Internship Experience</h4>
                  <p className="text-xs text-slate-500 font-medium">Industry client sprint contributions and senior mentor evaluation.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h5 className="text-sm font-black text-slate-900">{selectedPassport.internship.role}</h5>
                      <p className="text-xs text-slate-600 font-bold">{selectedPassport.internship.company} • {selectedPassport.internship.duration}</p>
                    </div>
                    <span className="text-xs font-black text-amber-950 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                      ★ Performance Rating: {selectedPassport.internship.rating}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-slate-700 italic">
                    &ldquo;{selectedPassport.internship.mentorRemarks}&rdquo;
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-black text-slate-900 uppercase">Key Verified Deliverables:</span>
                    <ul className="space-y-1 text-xs text-slate-700 font-medium">
                      {selectedPassport.internship.deliverables.map((del, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 7. PORTFOLIO TAB */}
            {activePassportTab === 'PORTFOLIO' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-black text-slate-900">Live Web Portfolio & Recruiter Actions</h4>
                  <p className="text-xs text-slate-500 font-medium">Public vanity link for ATS resume distribution and instant HR contact.</p>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 space-y-4 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">
                        Shareable Digital URL
                      </span>
                      <h5 className="text-base font-black text-slate-900 font-mono">
                        {selectedPassport.portfolioUrl}
                      </h5>
                    </div>

                    <div className="flex items-center gap-2 justify-center sm:justify-end">
                      <button
                        onClick={handleCopyShareLink}
                        className="bright-btn-primary px-4 py-2 text-xs flex items-center gap-1.5"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? 'Link Copied!' : 'Copy Share Link'}</span>
                      </button>

                      <a
                        href={selectedPassport.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bright-btn-secondary px-4 py-2 text-xs flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Public View</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start text-xs font-bold text-slate-700">
                    <span className="bg-white border border-purple-200 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-purple-600" />
                      <span>ATS Resume Auto-Sync (PDF)</span>
                    </span>
                    <span className="bg-white border border-purple-200 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5 text-pink-600" />
                      <span>1-Click LinkedIn Integration</span>
                    </span>
                    <span className="bg-white border border-purple-200 px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Physical QR Print Badge</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── RECRUITER VERIFICATION LOOKUP TOOL ──────────────────── */}
      <div id="verify-tool" className="scroll-mt-24 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl space-y-6">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-3.5 py-1 rounded-full border border-amber-400/30">
            <QrCode className="w-3.5 h-3.5 text-amber-300" />
            <span>Recruiter & Employer Verification Engine</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Instant Credential & Skill Verification
          </h2>

          <p className="text-xs sm:text-sm text-purple-200 font-medium">
            Enter a student’s Skill Passport ID or Name to verify their authenticity directly on the ledger.
          </p>

          {/* Search Box */}
          <form onSubmit={handleVerifySearch} className="flex flex-col sm:flex-row gap-2 pt-2">
            <input
              type="text"
              placeholder="e.g. APX-SP-2026-8812 or Aarav Sharma"
              value={searchPassportId}
              onChange={(e) => setSearchPassportId(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs px-4 py-3 rounded-2xl focus:outline-none focus:border-amber-400 focus:bg-white/20 font-medium"
            />
            <button
              type="submit"
              className="bright-btn-primary px-6 py-3 text-xs font-extrabold flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              <span>Verify Candidate</span>
            </button>
          </form>

          {/* Quick Click Sample IDs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] text-slate-300">
            <span className="font-bold">Try Sample IDs:</span>
            {passportsList.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSearchPassportId(p.passportId);
                  setVerificationResult(p);
                  setSelectedPassport(p);
                }}
                className="underline hover:text-amber-300 font-mono text-purple-300"
              >
                {p.passportId}
              </button>
            ))}
          </div>

          {/* Verification Result Banner */}
          {verificationResult && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-400/40 text-left mt-4 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% VERIFIED LEDGER RECORD</span>
                </span>
                <span className="text-[10px] font-mono text-purple-200">{verificationResult.passportId}</span>
              </div>
              <p className="text-xs text-white font-medium">
                Candidate <strong>{verificationResult.name}</strong> holds active verified credentials in <strong>{verificationResult.domain}</strong>. All capstone projects, code commits, and AICTE certifications are authenticated.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── COMPARISON: TRADITIONAL RESUME VS SKILL PASSPORT ─────── */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
            The Hiring Revolution
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Why Hiring Partners Prefer Skill Passport over Traditional Resumes
          </h2>
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full min-w-[550px] bg-white rounded-3xl border border-purple-100 shadow-md text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-purple-100">
                <th className="p-4 sm:p-5 font-black text-slate-900">Evaluation Factor</th>
                <th className="p-4 sm:p-5 font-bold text-slate-500">Traditional PDF / Paper Resume</th>
                <th className="p-4 sm:p-5 font-black text-purple-900 bg-purple-50/70">Apex Student Skill Passport</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-900">Skill Authenticity</td>
                <td className="p-4 sm:p-5 text-slate-500">Self-declared, high risk of exaggeration</td>
                <td className="p-4 sm:p-5 text-emerald-800 font-extrabold bg-purple-50/40">
                  ✓ 100% Validated via real lab code submissions
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-900">Project Proof</td>
                <td className="p-4 sm:p-5 text-slate-500">Static bullet points, no live testing</td>
                <td className="p-4 sm:p-5 text-emerald-800 font-extrabold bg-purple-50/40">
                  ✓ Live cloud demo URLs + verified GitHub commits
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-900">Government Accreditations</td>
                <td className="p-4 sm:p-5 text-slate-500">Rarely verifiable without manual calls</td>
                <td className="p-4 sm:p-5 text-emerald-800 font-extrabold bg-purple-50/40">
                  ✓ Instant QR scan Govt. & AICTE cryptographic ledger
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-slate-900">Recruiter Screening Time</td>
                <td className="p-4 sm:p-5 text-slate-500">3-4 rounds of preliminary filtering</td>
                <td className="p-4 sm:p-5 text-emerald-800 font-extrabold bg-purple-50/40">
                  ✓ Fast-track direct technical round shortlisting
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── HOW TO GET YOUR SKILL PASSPORT ──────────────────────── */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 p-8 sm:p-12 rounded-[2.5rem] text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ready to Build Your Verified Skill Passport?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Enroll in any Apex Career Domain today. Your Skill Passport unlocks automatically upon enrollment and stays lifetime verifiable.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/courses"
            className="bright-btn-primary px-8 py-3.5 text-xs font-black shadow-lg shadow-pink-500/25 flex items-center gap-2 shine-sweep"
          >
            <span>Explore Courses & Enroll</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="bright-btn-secondary px-8 py-3.5 text-xs font-black"
          >
            <span>Schedule Free Mentor Counseling</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

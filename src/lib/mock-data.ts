import { Domain, Course, Review, User, Enquiry, Enrollment, BlogPost, EventItem, SiteSettings, StudentNotification } from './types';

export const INITIAL_DOMAINS: Domain[] = [
  {
    id: 'dom-1',
    name: 'Information Technology',
    slug: 'information-technology',
    headline: 'Master full stack, backend, cloud, devops & enterprise software architectures.',
    description: 'Comprehensive software engineering programs covering React, Next.js, Node.js, Python, Java, AWS, Kubernetes & Cyber Security.',
    iconName: 'Code',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Full Stack Development',
      'Frontend Development',
      'Backend Development',
      'Python Development',
      'Java Development',
      'Software Testing',
      'Cloud Computing',
      'DevOps',
      'Cyber Security',
      'Database Development',
    ],
    featured: true,
    courseCount: 4,
  },
  {
    id: 'dom-2',
    name: 'Artificial Intelligence & Machine Learning',
    slug: 'ai-machine-learning',
    headline: 'Build generative AI, LLM agents, deep learning & intelligent automation.',
    description: 'Master PyTorch, Transformers, Prompt Engineering, OpenAI APIs, Computer Vision, NLP & Autonomous AI Agents.',
    iconName: 'BrainCircuit',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Generative AI',
      'AI Tools',
      'Machine Learning',
      'Deep Learning',
      'Prompt Engineering',
      'AI Automation',
      'AI for Business',
      'Computer Vision',
      'NLP',
      'AI Agents',
    ],
    featured: true,
    courseCount: 3,
  },
  {
    id: 'dom-3',
    name: 'Data & Analytics',
    slug: 'data-analytics',
    headline: 'Transform raw data into business strategy with Power BI, SQL, Python & Advanced Excel.',
    description: 'Learn data storytelling, business intelligence, predictive metrics, ETL pipelines, and statistical decision frameworks.',
    iconName: 'BarChart3',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Data Analytics',
      'Business Analytics',
      'Excel',
      'Advanced Excel',
      'Power BI',
      'SQL',
      'Data Visualization',
      'Statistics',
      'Business Intelligence',
    ],
    featured: true,
    courseCount: 3,
  },
  {
    id: 'dom-4',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    headline: 'Scale brands with Google Ads, Meta Ads, SEO, Performance & Influencer Marketing.',
    description: 'Master conversion optimization, lead generation funnels, content strategies, email campaigns & marketing analytics.',
    iconName: 'Megaphone',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'SEO',
      'Social Media Marketing',
      'Google Ads',
      'Meta Ads',
      'Content Marketing',
      'Email Marketing',
      'Affiliate Marketing',
      'Performance Marketing',
      'Influencer Marketing',
      'Marketing Analytics',
    ],
    featured: true,
    courseCount: 2,
  },
  {
    id: 'dom-5',
    name: 'UI/UX & Design',
    slug: 'ui-ux-design',
    headline: 'Craft modern web/mobile products with Figma, UX research & design systems.',
    description: 'Learn visual hierarchy, wireframing, interactive prototyping, usability testing, and build portfolio case studies.',
    iconName: 'Palette',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'UI Design',
      'UX Design',
      'Figma',
      'Graphic Design',
      'Design Thinking',
      'Prototyping',
      'Wireframing',
      'Interaction Design',
      'Brand Design',
      'Portfolio Development',
    ],
    featured: true,
    courseCount: 2,
  },
  {
    id: 'dom-6',
    name: 'Management & Business',
    slug: 'management-business',
    headline: 'Lead high-performing teams, product roadmaps & strategic business operations.',
    description: 'Programs in Product Management, Agile PMP, Leadership, Entrepreneurship & Sales Management.',
    iconName: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Business Management',
      'Project Management',
      'Product Management',
      'Human Resource Management',
      'Business Communication',
      'Entrepreneurship',
      'Operations Management',
      'Sales Management',
      'Leadership',
      'Business Strategy',
    ],
    featured: true,
    courseCount: 2,
  },
  {
    id: 'dom-7',
    name: 'Finance & Accounting',
    slug: 'finance-accounting',
    headline: 'Master Tally Prime, GST filing, financial modeling, corporate valuation & Excel.',
    description: 'Practical training in balance sheets, income tax returns, investment analysis, and corporate finance frameworks.',
    iconName: 'Calculator',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Financial Accounting',
      'Tally',
      'GST',
      'Income Tax',
      'Financial Modeling',
      'Investment Basics',
      'Banking',
      'Corporate Finance',
      'Accounting with Excel',
      'Financial Analysis',
    ],
    featured: true,
    courseCount: 2,
  },
  {
    id: 'dom-8',
    name: 'Communication & Professional Skills',
    slug: 'communication-professional-skills',
    headline: 'Elevate spoken English, interview confidence, public speaking & workplace etiquette.',
    description: 'Comprehensive soft skills training covering business English, presentation mastery, GD drills, and resume writing.',
    iconName: 'MessageSquare',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Spoken English',
      'Business English',
      'Personality Development',
      'Interview Preparation',
      'Presentation Skills',
      'Public Speaking',
      'Resume Building',
      'Group Discussion',
      'Workplace Communication',
      'Soft Skills',
    ],
    featured: true,
    courseCount: 2,
  },
  {
    id: 'dom-9',
    name: 'Emerging Technologies',
    slug: 'emerging-technologies',
    headline: 'Explore Blockchain, Web3, IoT, Robotics, AR/VR & n8n AI Workflow Automation.',
    description: 'Stay ahead of technological shifts with hands-on practice in decentralization, smart contracts & low-code automation.',
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Blockchain',
      'Web3',
      'IoT',
      'AR/VR',
      'Robotics',
      'Cloud Technologies',
      'Automation',
      'No-Code / Low-Code',
      'n8n Automation',
      'Future Technologies',
    ],
    featured: true,
    courseCount: 2,
  },
  {
    id: 'dom-10',
    name: 'Career & Professional Programs',
    slug: 'career-professional-programs',
    headline: 'Guaranteed 100% Job-Oriented Bootcamps, Internships & Placement Prep Tracks.',
    description: 'Fast-track career switchers, freshers & professionals into tier-1 enterprise employment with 1-on-1 mentorship.',
    iconName: 'GraduationCap',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    subcategories: [
      'Job-Oriented Programs',
      'Internship Programs',
      'Certification Programs',
      'Career Switch Programs',
      'Placement Preparation',
      'Fresher Programs',
      'Professional Upskilling',
      'Corporate Training',
      'Short-Term Programs',
      'Career Guidance',
    ],
    featured: true,
    courseCount: 0,
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Full Stack MERN & Next.js Masterclass',
    slug: 'full-stack-mern-nextjs-masterclass',
    headline: 'Become a job-ready Full Stack Engineer with React, Next.js 14, Node.js & PostgreSQL',
    description: 'This comprehensive 6-month flagship program covers everything from foundational HTML/CSS/JavaScript to advanced microservices, Next.js server components, database design, Docker, and CI/CD pipelines. Includes 4 capstone projects and 100% placement support.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    domainId: 'dom-1',
    domainName: 'Information Technology',
    domainSlug: 'information-technology',
    duration: '6 Months',
    fee: 45000,
    discountFee: 34999,
    level: 'Beginner to Advanced',
    mode: 'Live Online + Classroom Hybrid',
    badge: 'Flagship Bestseller',
    categoryTag: 'TRENDING',
    rating: 4.9,
    totalStudents: 1420,
    placementAssistance: true,
    featured: true,
    highlights: [
      '100% Placement Assistance with 40+ Hiring Partners',
      '4 Industry-Grade Real World Capstone Projects',
      '1-on-1 Code Reviews & Mentorship from Senior Engineers',
      'Comprehensive System Design & DSA Prep Included',
    ],
    instructor: {
      name: 'Rohan Deshmukh',
      title: 'Ex-Senior Staff Engineer at Amazon',
      experience: '11+ Years Experience in Full Stack & Cloud Architectures',
      expertise: ['React 18', 'Next.js 14', 'Node.js', 'System Design', 'PostgreSQL'],
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      linkedin: 'https://linkedin.com',
    },
    prerequisites: [
      'Basic understanding of computer fundamentals',
      'No prior coding experience required; course starts from HTML/CSS scratch',
    ],
    whoShouldTake: [
      'College students and fresh graduates seeking tier-1 software engineer jobs',
      'Working IT professionals wanting to switch to Full Stack Web Development',
      'Career switchers moving from non-tech backgrounds into coding',
    ],
    toolsCovered: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript ES6+', 'React 18', 'Next.js 14', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'Docker', 'Git'],
    projects: [
      {
        title: 'Full-Stack E-Commerce Platform with Next.js & Stripe',
        description: 'Complete online marketplace with server-rendered product listing, cart state, secure payment checkout, and admin order panel.',
        techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
      },
    ],
    faqs: [
      {
        question: 'Will I get guaranteed placement calls after completing this course?',
        answer: 'Yes! Our dedicated placement cell conducts resume auditing, mock technical interviews, and direct referral drives until you receive job offers.',
      },
    ],
    careerRoles: [
      {
        title: 'Full Stack Engineer',
        avgSalary: '₹6.5 LPA - ₹16 LPA',
        hiringCompanies: ['Amazon', 'Swiggy', 'Zomato', 'Paytm'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — Foundational Web Architecture & Responsive UI',
        duration: '4 Weeks',
        topics: [
          'Semantic HTML5 & Accessibility Standards',
          'Flexbox & CSS Grid Responsive Layout Systems',
          'Tailwind CSS 3 Utility-First Design Systems',
          'Git & GitHub Team Collaboration & Branching Workflows',
        ],
        practicalLab: 'Responsive Corporate Tech Agency Portal & Portfolio',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — Modern JavaScript ES6+ & Asynchronous Engine',
        duration: '4 Weeks',
        topics: [
          'JavaScript Event Loop & Execution Context',
          'Promises, Async/Await & Fetch API',
          'DOM Manipulation & Event Handling',
          'Object-Oriented & Functional JS Patterns',
        ],
        practicalLab: 'Interactive Drag-and-Drop Kanban Task Board App',
      },
      {
        moduleNumber: 3,
        title: 'Module 3 — Frontend Engineering with React 18 & State',
        duration: '4 Weeks',
        topics: [
          'React 18 Component Architecture & JSX',
          'useState, useEffect, useMemo, useCallback Hooks',
          'Global State Management with Context API & Zustand',
          'React Router v6 & Dynamic Routing',
        ],
        practicalLab: 'Live Video Analytics Dashboard with Real-time Charts',
      },
      {
        moduleNumber: 4,
        title: 'Module 4 — Full Stack Next.js 14 App Router & SSR',
        duration: '4 Weeks',
        topics: [
          'Next.js 14 App Router Architecture',
          'Server Components (RSC) vs Client Components',
          'Server Actions & Form Mutations',
          'NextAuth.js Multi-Provider User Authentication',
        ],
        practicalLab: 'Full Stack SaaS Subscription Application',
      },
      {
        moduleNumber: 5,
        title: 'Module 5 — Backend REST APIs, PostgreSQL & Express',
        duration: '4 Weeks',
        topics: [
          'Node.js Server Architecture & Express REST APIs',
          'PostgreSQL Relational Database Schema Design',
          'Prisma ORM & Migration Workflows',
          'JWT Authentication, Rate Limiting & Security',
        ],
        practicalLab: 'Scalable Banking Wallet & Payment Microservice API',
      },
      {
        moduleNumber: 6,
        title: 'Module 6 — System Design, Cloud DevOps & Placement Prep',
        duration: '4 Weeks',
        topics: [
          'Docker Containerization & Multi-Container Setup',
          'AWS EC2, S3 & Cloudflare Deployment',
          'CI/CD Automated Pipelines with GitHub Actions',
          'System Design, DSA Prep & Mock Technical Interviews',
        ],
        practicalLab: 'Production Capstone: Multi-Vendor E-Commerce Platform with Stripe',
      },
    ],
  },
  {
    id: 'course-2',
    title: 'Generative AI & LLM Agent Engineering',
    slug: 'generative-ai-llm-agent-engineering',
    headline: 'Master Python, PyTorch, LangChain, RAG Architecture & OpenAI Agents',
    description: 'Learn how to fine-tune transformers, build vector search databases (Pinecone, Chroma), engineer custom RAG pipelines, and deploy autonomous AI agents for enterprise business workflows.',
    image: '/images/generative-ai-banner.jpg',
    domainId: 'dom-2',
    domainName: 'Artificial Intelligence & Machine Learning',
    domainSlug: 'ai-machine-learning',
    duration: '6 Months',
    fee: 55000,
    discountFee: 42999,
    level: 'Beginner to Advanced',
    mode: 'Live Interactive Online',
    badge: 'High Demand Tech',
    categoryTag: 'JOB_ORIENTED',
    rating: 4.9,
    totalStudents: 980,
    placementAssistance: true,
    featured: true,
    highlights: [
      'Build 5 Autonomous LLM & RAG Applications',
      'Master PyTorch, Hugging Face Transformers & LangChain',
    ],
    instructor: {
      name: 'Dr. Ananya Sen',
      title: 'Lead AI Researcher & Ex-Google AI Fellow',
      experience: '9+ Years Experience in Machine Learning & LLM Orchestration',
      expertise: ['PyTorch', 'LangChain', 'RAG Pipelines', 'OpenAI API', 'HuggingFace'],
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      linkedin: 'https://linkedin.com',
    },
    prerequisites: ['Basic Python programming knowledge helpful'],
    whoShouldTake: ['Data Scientists wanting to specialize in GenAI & LLM agent engineering'],
    toolsCovered: ['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'Pinecone'],
    projects: [
      {
        title: 'Enterprise PDF Document Q&A RAG System',
        description: 'Retrieval-Augmented Generation engine allowing users to upload corporate PDFs.',
        techStack: ['Python', 'LangChain', 'ChromaDB', 'OpenAI GPT-4'],
      },
    ],
    faqs: [
      {
        question: 'Do I need a GPU computer to attend live lab sessions?',
        answer: 'No, Apex Institute provides cloud GPU sandbox environments for all students.',
      },
    ],
    careerRoles: [
      {
        title: 'AI Solutions Engineer',
        avgSalary: '₹9.5 LPA - ₹24 LPA',
        hiringCompanies: ['Google', 'Microsoft', 'NVIDIA'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — Python for AI, NumPy & PyTorch Tensors',
        duration: '4 Weeks',
        topics: ['NumPy Matrices & Linear Algebra', 'Pandas Exploratory Data Analysis', 'PyTorch Tensors & GPU Acceleration'],
        practicalLab: 'High-Performance Tensor Compute Engine',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — Neural Networks & Deep Learning Foundations',
        duration: '4 Weeks',
        topics: ['Backpropagation & Loss Functions', 'Convolutional Neural Networks (CNNs)', 'Recurrent Networks & Attention Mechanics'],
        practicalLab: 'Computer Vision Medical Image Classifier',
      },
      {
        moduleNumber: 3,
        title: 'Module 3 — Hugging Face Transformers & Language Models',
        duration: '4 Weeks',
        topics: ['Transformer Self-Attention', 'Hugging Face Pipelines & Models', 'Tokenizers & Positional Encoding'],
        practicalLab: 'Domain-Specific Sentiment & Entity Extraction Engine',
      },
      {
        moduleNumber: 4,
        title: 'Module 4 — Vector Databases & Enterprise RAG Systems',
        duration: '4 Weeks',
        topics: ['Embeddings & Cosine Similarity', 'Pinecone & Chroma Vector DBs', 'LangChain & LlamaIndex Orchestration'],
        practicalLab: 'Enterprise PDF Knowledgebase RAG System',
      },
      {
        moduleNumber: 5,
        title: 'Module 5 — Autonomous AI Agent Architecture',
        duration: '4 Weeks',
        topics: ['ReAct Prompting & Tool Calling', 'Multi-Agent Frameworks (CrewAI, AutoGen)', 'Memory & Long-term Context Management'],
        practicalLab: 'Autonomous AI Market Research & Report Writer Agent',
      },
      {
        moduleNumber: 6,
        title: 'Module 6 — Fine-Tuning LLMs, Quantization & Cloud Deployment',
        duration: '4 Weeks',
        topics: ['PEFT / LoRA Fine-Tuning', 'vLLM & Ollama Local Serving', 'Docker & AWS SageMaker AI Deployment'],
        practicalLab: 'Production-Grade Fine-Tuned Llama-3 AI Assistant',
      },
    ],
  },
  {
    id: 'course-3',
    title: 'Business Analytics & Power BI Masterclass',
    slug: 'business-analytics-power-bi-masterclass',
    headline: 'Master Advanced Excel, SQL, Power BI Dashboards & Data Visualization',
    description: 'Transform complex business datasets into actionable strategy dashboards. Learn SQL querying, DAX measures, automated reporting pipelines, and business metrics forecasting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    domainId: 'dom-3',
    domainName: 'Data & Analytics',
    domainSlug: 'data-analytics',
    duration: '4 Months',
    fee: 38000,
    discountFee: 28999,
    level: 'Beginner Friendly',
    mode: 'Live Online + Self-Paced Labs',
    badge: 'Top Rated',
    categoryTag: 'POPULAR',
    rating: 4.8,
    totalStudents: 1100,
    placementAssistance: true,
    featured: true,
    highlights: [
      'Master Power BI Desktop, DAX & SQL Queries',
      'Build 6 Live Interactive Executive Dashboards',
    ],
    instructor: {
      name: 'Kavita Nair',
      title: 'Lead Analytics Manager at Deloitte',
      experience: '8+ Years in Business Intelligence & SQL Analytics',
      expertise: ['Power BI', 'DAX', 'SQL Server', 'Advanced Excel'],
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    },
    prerequisites: ['No prior technical knowledge needed; starts with Excel fundamentals'],
    whoShouldTake: ['BBA, BCA, Commerce graduates seeking analytical analyst roles'],
    toolsCovered: ['Advanced Excel', 'SQL Server', 'Power BI Desktop', 'DAX'],
    projects: [
      {
        title: 'Executive Financial Performance Dashboard',
        description: 'Interactive Power BI dashboard tracking profit margins, revenue growth KPIs.',
        techStack: ['Power BI', 'DAX', 'SQL'],
      },
    ],
    faqs: [
      {
        question: 'Is Power BI certification included in this course?',
        answer: 'Yes, we prepare students for the official Microsoft PL-300 Power BI Analyst certification exam.',
      },
    ],
    careerRoles: [
      {
        title: 'Data Analyst / Business Analyst',
        avgSalary: '₹6.0 LPA - ₹14 LPA',
        hiringCompanies: ['Deloitte', 'KPMG', 'Accenture', 'TCS'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — Advanced Excel Data Modeling & Automation',
        duration: '4 Weeks',
        topics: ['Nested Logical & Financial Formulas', 'XLOOKUP, INDEX-MATCH & Dynamic Arrays', 'Power Query Data Cleanse & Transformation'],
        practicalLab: 'Automated Financial & Sales Reconciliation Model',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — Enterprise SQL Querying & Database Architecture',
        duration: '4 Weeks',
        topics: ['SELECT, WHERE, GROUP BY & Joins', 'Subqueries & Common Table Expressions (CTEs)', 'Window Functions (ROW_NUMBER, DENSE_RANK)'],
        practicalLab: 'SQL Customer Churn & Cohort Retention Analysis',
      },
      {
        moduleNumber: 3,
        title: 'Module 3 — Power BI Desktop & DAX Calculations',
        duration: '4 Weeks',
        topics: ['Data Modeling & Star Schema Architecture', 'CALCULATE, FILTER & Time Intelligence DAX', 'Interactive Drill-Through & Visual Formatting'],
        practicalLab: 'Executive Regional Sales Performance Dashboard',
      },
      {
        moduleNumber: 4,
        title: 'Module 4 — Business Storytelling & PL-300 Certification',
        duration: '4 Weeks',
        topics: ['Power BI Service Cloud Deployment', 'Automated Scheduled Data Refresh', 'Microsoft PL-300 Exam Mock Preparation'],
        practicalLab: 'End-to-End Enterprise Operations Control Tower Dashboard',
      },
    ],
  },
  {
    id: 'course-6',
    title: 'Product Management & Agile Leadership',
    slug: 'product-management-agile-leadership',
    headline: 'Master Product Roadmaps, User Stories, PRDs & Agile Leadership',
    description: 'Learn how to conceptualize, validate, and launch tech products. Master wireframing, SQL metrics, A/B testing, and stakeholder alignment.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop',
    domainId: 'dom-6',
    domainName: 'Management & Business',
    domainSlug: 'management-business',
    duration: '4 Months',
    fee: 42000,
    discountFee: 31999,
    level: 'Beginner to Intermediate',
    mode: 'Live Online Studio',
    badge: 'Executive Track',
    categoryTag: 'JOB_ORIENTED',
    rating: 4.8,
    totalStudents: 650,
    placementAssistance: true,
    featured: true,
    highlights: ['Draft 3 Complete Product Requirement Documents (PRDs)', '1-on-1 Product Critique with Lead PMs'],
    instructor: {
      name: 'Manish Malhotra',
      title: 'Principal Product Manager at Swiggy',
      experience: '9+ Years Scaling Consumer Tech Apps',
      expertise: ['Product Roadmaps', 'PRD', 'Agile Scrum', 'Mixpanel'],
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    },
    prerequisites: ['Basic problem-solving mindset; no coding required'],
    whoShouldTake: ['Aspiring Product Managers, Business Analysts, and Engineers switching to PM'],
    toolsCovered: ['Jira', 'Confluence', 'Figma', 'Mixpanel', 'Google Analytics'],
    projects: [
      {
        title: 'End-to-End SaaS Product Launch PRD',
        description: 'Create user journey maps, wireframes, pricing strategy, and success metrics for a B2B SaaS tool.',
        techStack: ['Jira', 'Figma', 'Mixpanel'],
      },
    ],
    faqs: [
      {
        question: 'Do I need a coding background for Product Management?',
        answer: 'No coding is required! Product management focuses on user problem validation and business roadmaps.',
      },
    ],
    careerRoles: [
      {
        title: 'Associate Product Manager (APM)',
        avgSalary: '₹8.0 LPA - ₹18 LPA',
        hiringCompanies: ['Swiggy', 'Razorpay', 'Flipkart'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — User Problem Discovery & Market Opportunity',
        duration: '4 Weeks',
        topics: ['User Interview Frameworks', 'TAM / SAM / SOM Market Sizing', 'Competitive Landscape & Value Proposition'],
        practicalLab: 'User Persona & Problem Validation Benchmark Study',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — Product Requirement Documents (PRDs) & UX Wireframing',
        duration: '4 Weeks',
        topics: ['Writing Enterprise PRDs & Spec Documents', 'Figma Wireframing & User Journey Flows', 'Feature Prioritization (RICE & Kano Models)'],
        practicalLab: 'Complete PRD & Low-Fi Figma Prototype for B2B SaaS',
      },
      {
        moduleNumber: 3,
        title: 'Module 3 — Agile Scrum Execution & Engineering Alignment',
        duration: '4 Weeks',
        topics: ['Sprint Planning & Backlog Refinement', 'Jira & Confluence Project Workflows', 'Managing Engineering Dependencies & QA'],
        practicalLab: '2-Week Agile Sprint Execution Simulation',
      },
      {
        moduleNumber: 4,
        title: 'Module 4 — Product Analytics, A/B Testing & GTM Launch',
        duration: '4 Weeks',
        topics: ['Mixpanel & Amplitude Event Funnels', 'Designing A/B Experimentation Frameworks', 'Go-To-Market (GTM) Strategy & PM Interview Drills'],
        practicalLab: 'Live App Feature Conversion Optimization & GTM Pitch',
      },
    ],
  },
  {
    id: 'course-7',
    title: 'Financial Modeling & Tally Prime Certification',
    slug: 'financial-modeling-tally-prime-certification',
    headline: 'Master Tally Prime, GST Returns, Income Tax Filing & Corporate Valuation',
    description: 'Gain practical expertise in corporate balance sheets, payroll processing, GST return computation, and DCF financial valuation modeling.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop',
    domainId: 'dom-7',
    domainName: 'Finance & Accounting',
    domainSlug: 'finance-accounting',
    duration: '3 Months',
    fee: 30000,
    discountFee: 21999,
    level: 'Beginner Friendly',
    mode: 'Live Hybrid Labs',
    badge: 'Certified Track',
    categoryTag: 'NEW',
    rating: 4.7,
    totalStudents: 520,
    placementAssistance: true,
    featured: true,
    highlights: ['Hands-on Filing of Live GST & Income Tax Returns', 'Certified Tally Prime Operator Badge'],
    instructor: {
      name: 'CA Rajesh Gupta',
      title: 'Chartered Accountant & Corporate Auditor',
      experience: '12+ Years Corporate Finance Experience',
      expertise: ['Tally Prime', 'GST', 'Financial Valuation', 'Excel'],
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    },
    prerequisites: ['Basic commerce or accounts familiarity helpful'],
    whoShouldTake: ['B.Com, M.Com graduates, Accountant job seekers, and Business Owners'],
    toolsCovered: ['Tally Prime', 'Advanced Excel', 'GST Portal', 'Income Tax Utility'],
    projects: [
      {
        title: 'Corporate Financial Valuation Model',
        description: 'Build 3-statement financial models with 5-year revenue projections and DCF valuation.',
        techStack: ['Excel', 'Tally Prime'],
      },
    ],
    faqs: [
      {
        question: 'Is practical GST portal filing demonstrated during classes?',
        answer: 'Yes! Our CA instructors demonstrate live GST-1, GST-3B return filings.',
      },
    ],
    careerRoles: [
      {
        title: 'Corporate Accountant / Financial Analyst',
        avgSalary: '₹4.5 LPA - ₹9 LPA',
        hiringCompanies: ['KPMG', 'EY', 'Genpact'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — Tally Prime Accounting & Inventory Management',
        duration: '4 Weeks',
        topics: ['Company Creation & Ledger Master Setup', 'Sales, Purchase, Payment & Receipt Vouchers', 'Stock Groups, Units & Warehouse Inventory'],
        practicalLab: 'Complete Corporate Accounts Bookkeeping Ledger',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — Statutory Taxation: GST & Income Tax Filing',
        duration: '4 Weeks',
        topics: ['CGST, SGST & IGST Invoicing Rules', 'GSTR-1, GSTR-3B Computation & Reconciliation', 'TDS Deduction Rules & Income Tax Returns'],
        practicalLab: 'Live GST & Income Tax Portal Return Filing Demonstration',
      },
      {
        moduleNumber: 3,
        title: 'Module 3 — Corporate Financial Modeling & Valuation',
        duration: '4 Weeks',
        topics: ['3-Statement Financial Model Building', 'Discounted Cash Flow (DCF) Valuation', 'Excel Financial Dashboards & Pivot Analytics'],
        practicalLab: '5-Year Corporate DCF Financial Valuation Model',
      },
    ],
  },
  {
    id: 'course-9',
    title: 'n8n & AI Workflow Automation Masterclass',
    slug: 'n8n-ai-workflow-automation-masterclass',
    headline: 'Build autonomous business workflows with n8n, OpenAI APIs & Low-Code Webhooks',
    description: 'Learn how to automate sales funnels, customer support tickets, email follow-ups, and database syncs using n8n workflows and AI LLM nodes.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    domainId: 'dom-9',
    domainName: 'Emerging Technologies',
    domainSlug: 'emerging-technologies',
    duration: '2 Months',
    fee: 28000,
    discountFee: 19999,
    level: 'Beginner to Intermediate',
    mode: 'Live Interactive Studio',
    badge: 'Future Tech',
    categoryTag: 'TRENDING',
    rating: 4.9,
    totalStudents: 410,
    placementAssistance: true,
    featured: true,
    highlights: ['Build 8 Autonomous n8n Workflow Pipelines', 'Integrate OpenAI, Slack, Airtable & PostgreSQL'],
    instructor: {
      name: 'Vikram Sethi',
      title: 'Head of Automation at TechFlow',
      experience: '6+ Years Automation Architecture',
      expertise: ['n8n', 'Zapier', 'OpenAI API', 'Webhooks', 'Make.com'],
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
    prerequisites: ['Basic internet familiarity; zero coding required'],
    whoShouldTake: ['Founders, Operations Managers, Marketers, and Tech Enthusiasts'],
    toolsCovered: ['n8n Cloud', 'OpenAI API', 'Airtable', 'Slack Webhooks', 'Make'],
    projects: [
      {
        title: 'Autonomous AI Sales Lead Qualification Agent',
        description: 'n8n pipeline that reads incoming emails, queries OpenAI for intent, updates database and dispatches WhatsApp alert.',
        techStack: ['n8n', 'OpenAI', 'Airtable'],
      },
    ],
    faqs: [
      {
        question: 'Do I need coding to build n8n workflows?',
        answer: 'No coding required! n8n uses a visual node-based drag-and-drop canvas.',
      },
    ],
    careerRoles: [
      {
        title: 'AI Automation Consultant',
        avgSalary: '₹7.0 LPA - ₹15 LPA',
        hiringCompanies: ['TechFlow', 'Zapier Agency', 'Unicorn Startups'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — n8n Node Workflows & API Integration',
        duration: '4 Weeks',
        topics: ['n8n Visual Workflow Engine & Architecture', 'HTTP Webhook Triggers & Payload Parsing', 'Data Transformations, Branching & Retries'],
        practicalLab: 'Automated Lead Qualification & CRM Database Sync Pipeline',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — AI LLM Nodes, Multi-App Pipelines & Deployment',
        duration: '4 Weeks',
        topics: ['OpenAI & Claude LLM Agent Nodes in n8n', 'Airtable, Slack, PostgreSQL & WhatsApp Connectors', 'Self-Hosted n8n Docker Setup & Cloud Hosting'],
        practicalLab: 'Autonomous AI Customer Support & Dispatch Automation System',
      },
    ],
  },
  {
    id: 'course-11',
    title: 'UI/UX Design Systems & Product Strategy Masterclass',
    slug: 'ui-ux-design-systems-product-strategy-masterclass',
    headline: 'Master Figma 5.0, UX Research, Design Tokens, Interactive Prototypes & Portfolio Strategy',
    description: 'Learn end-to-end user experience and product interface design. Master user psychology, wireframing, component design systems, auto layout, usability testing, and create 3 industry-ready Figma portfolio case studies.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop',
    domainId: 'dom-5',
    domainName: 'UI/UX & Design',
    domainSlug: 'ui-ux-design',
    duration: '4 Months',
    fee: 38000,
    discountFee: 27999,
    level: 'Beginner to Advanced',
    mode: 'Live Interactive Studio + Figma Labs',
    badge: 'Flagship Bestseller',
    categoryTag: 'TRENDING',
    rating: 4.9,
    totalStudents: 1120,
    placementAssistance: true,
    featured: true,
    highlights: [
      'Master Figma Auto Layout 5.0, Variables & Design Tokens',
      'Build 3 Complete Industry Portfolio Case Studies',
      '1-on-1 Portfolio & UX Research Critique from Staff Designers',
      '100% Placement Assistance with 35+ Top Design Studios',
    ],
    instructor: {
      name: 'Siddharth Nair',
      title: 'Staff Product Designer at Zomato (Ex-Swiggy)',
      experience: '10+ Years Experience in Mobile App UX & Design Systems',
      expertise: ['Figma', 'UX Research', 'Design Systems', 'Micro-Interactions', 'Design Tokens'],
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      linkedin: 'https://linkedin.com',
    },
    prerequisites: [
      'No prior design or coding experience required',
      'Basic familiarity with operating Mac or Windows laptop',
    ],
    whoShouldTake: [
      'Students and graduates wanting to become UI/UX Designers & Product Designers',
      'Frontend developers wanting to master product interface & design systems',
      'Graphic designers & traditional marketers switching to digital UX',
    ],
    toolsCovered: ['Figma', 'FigJam', 'Protopie', 'Maze UX Testing', 'Adobe Illustrator', 'Zeplin', 'Miro'],
    projects: [
      {
        title: 'FinTech Mobile Banking SuperApp UX & Design System',
        description: 'Complete iOS & Android UI kit with dark/light theme variables, 40+ atomic components, interactive payment micro-animations, and prototype user testing.',
        techStack: ['Figma', 'FigJam', 'Protopie', 'Maze'],
      },
      {
        title: 'AI Enterprise SaaS Control Center & Analytics Dashboard',
        description: 'Responsive web application dashboard with complex data visualization charts, design tokens, auto layout components, and WCAG 2.2 accessibility compliance.',
        techStack: ['Figma', 'Design Tokens', 'Miro'],
      },
    ],
    faqs: [
      {
        question: 'Do I need a graphics tablet or expensive software?',
        answer: 'No! Figma runs in any modern browser and is completely free for individual learning.',
      },
      {
        question: 'Will Apex Institute help build my Behance & Dribbble portfolio?',
        answer: 'Yes! Our mentors guide you through structuring case studies with user research, wireframes, and high-fidelity prototypes.',
      },
    ],
    careerRoles: [
      {
        title: 'UI/UX Designer',
        avgSalary: '₹6.5 LPA - ₹15 LPA',
        hiringCompanies: ['Zomato', 'Swiggy', 'Razorpay', 'CRED', 'Flipkart'],
      },
      {
        title: 'Product Designer',
        avgSalary: '₹8.0 LPA - ₹18 LPA',
        hiringCompanies: ['MakeMyTrip', 'Ola', 'Paytm', 'Thoughtworks'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — User Psychology, UX Research & Problem Validation',
        duration: '4 Weeks',
        topics: [
          'Design Thinking Frameworks & Empathy Mapping',
          'Qualitative User Interviews & Quantitative Surveys',
          'Creating Realistic User Personas & Customer Journey Maps',
          'Information Architecture (IA), Card Sorting & Site Maps',
        ],
        practicalLab: 'Comprehensive UX Research & Problem Benchmark Study for E-Commerce App',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — Wireframing, Figma Basics & Visual Hierarchy',
        duration: '4 Weeks',
        topics: [
          'Low-Fidelity Paper Wireframes & Digital Sketching',
          'Figma Interface, Vector Networks & Frame Grids',
          'Typography Scale, Color Theory & Visual Weight',
          'Mobile-First Responsive Layouts & Breakpoints',
        ],
        practicalLab: 'Low-Fi & High-Fi Mobile App Wireframe Flow',
      },
      {
        moduleNumber: 3,
        title: 'Module 3 — Design Systems, Auto Layout 5.0 & Component Tokens',
        duration: '4 Weeks',
        topics: ['Atomic Design Principles (Atoms, Molecules, Organisms)', 'Figma Auto Layout 5.0 (Flex, Grid, Absolute Positioning)', 'Component Variants, Properties & Nested Instances', 'Variables, Dark Mode Modes & Design Tokens (Color, Spacing, Radius)'],
        practicalLab: 'Enterprise Mobile & Web Design System UI Kit with 50+ Components',
      },
      {
        moduleNumber: 4,
        title: 'Module 4 — Interactive Prototyping, Usability Testing & Portfolio',
        duration: '4 Weeks',
        topics: ['Smart Animate, Micro-Interactions & State Transitions', 'Maze & Lookback Remote Usability Testing Sessions', 'Developer Handoff, Inspect Panel & CSS Export Specs', 'Building & Publishing Industry-Ready Case Studies on Behance & Notion'],
        practicalLab: 'Final Production Capstone: Interactive FinTech App Portfolio Case Study',
      },
    ],
  },
  {
    id: 'course-12',
    title: 'Advanced Figma Design Systems & Micro-Interactions',
    slug: 'advanced-figma-design-systems-micro-interactions',
    headline: 'Build Scalable Enterprise UI Kits, Variables, Component Tokens & Smart Animations',
    description: 'Specialized masterclass for designers and developers looking to master enterprise Figma design systems, component variants, variable modes, micro-interactions, and seamless developer handoff.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
    domainId: 'dom-5',
    domainName: 'UI/UX & Design',
    domainSlug: 'ui-ux-design',
    duration: '2 Months',
    fee: 28000,
    discountFee: 18999,
    level: 'Intermediate to Advanced',
    mode: 'Live Interactive Studio',
    badge: 'High Demand',
    categoryTag: 'JOB_ORIENTED',
    rating: 4.8,
    totalStudents: 740,
    placementAssistance: true,
    featured: false,
    highlights: [
      'Master Enterprise Design Token Tokens & Variables',
      'Create Complex Micro-Interactions with Protopie & Lottie',
      'Seamless Developer Handoff with Storybook Alignment',
    ],
    instructor: {
      name: 'Ananya Roy',
      title: 'Lead Design System Specialist at Razorpay',
      experience: '7+ Years Crafting Scalable Component Libraries',
      expertise: ['Design Systems', 'Figma Variables', 'Storybook', 'Micro-Interactions'],
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    },
    prerequisites: ['Basic familiarity with Figma interface'],
    whoShouldTake: ['UI/UX Designers, Product Managers, and Frontend Engineers wanting to master design systems'],
    toolsCovered: ['Figma Variables', 'Protopie', 'Lottie', 'Storybook', 'GitLab Tokens'],
    projects: [
      {
        title: 'Multi-Brand Cross-Platform Design System',
        description: 'Design system featuring light, dark, and high-contrast variable modes synced to Tailwind CSS tokens.',
        techStack: ['Figma', 'Tokens Studio', 'Protopie'],
      },
    ],
    faqs: [
      {
        question: 'Is this course suitable for frontend developers?',
        answer: 'Yes! Engineers learn how design tokens translate into React/Tailwind CSS components.',
      },
    ],
    careerRoles: [
      {
        title: 'Design System Engineer / Architect',
        avgSalary: '₹9.0 LPA - ₹20 LPA',
        hiringCompanies: ['Razorpay', 'Atlassian', 'Microsoft', 'Postman'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — Design System Architecture & Token Structure',
        duration: '3 Weeks',
        topics: ['Token Naming Conventions (Global, Alias, Component Tokens)', 'Figma Variables & Primitive Tokens', 'Color Palettes, Typography Systems & Spatial Grids'],
        practicalLab: 'Core Design Token Architecture Setup',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — Advanced Components, Variants & Slots',
        duration: '3 Weeks',
        topics: ['Complex Component Variants & Boolean Properties', 'Slot Components & Structural Layout Flexibility', 'Component Documentation & Governance Guidelines'],
        practicalLab: 'Enterprise Button, Form, Modal & Navigation Library',
      },
      {
        moduleNumber: 3,
        title: 'Module 3 — Micro-Interactions, Animate & Developer Handoff',
        duration: '2 Weeks',
        topics: ['Protopie Micro-Interactions & Physics Animations', 'Exporting Lottie JSON for Mobile & Web Apps', 'Aligning Figma Tokens with Storybook & React Props'],
        practicalLab: 'Fully Interactive Multi-State Component Library & Specs Handoff',
      },
    ],
  },
  {
    id: 'course-13',
    title: 'Performance Marketing, Meta Ads & Google Ads Mastery',
    slug: 'performance-marketing-meta-ads-google-ads-mastery',
    headline: 'Master Media Buying, Conversion Rate Optimization (CRO), Funnel Architecture & AI Copywriting',
    description: 'Learn how to run scalable, profitable ad campaigns across Meta (Facebook/Instagram), Google Performance Max, LinkedIn Ads, and TikTok. Master ROAS scaling, A/B testing creatives, landing page CRO, and Google Analytics 4.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    domainId: 'dom-4',
    domainName: 'Digital Marketing',
    domainSlug: 'digital-marketing',
    duration: '4 Months',
    fee: 35000,
    discountFee: 24999,
    level: 'Beginner to Advanced',
    mode: 'Live Interactive Online + Live Ad Accounts',
    badge: 'High ROAS Track',
    categoryTag: 'JOB_ORIENTED',
    rating: 4.9,
    totalStudents: 1350,
    placementAssistance: true,
    featured: true,
    highlights: [
      'Manage Live Ad Spend & Real Ad Accounts',
      'Master Meta Pixel, Conversions API & GA4 Tracking',
      'Scale E-Commerce & Lead Gen ROAS to 3.5x+',
      '100% Placement Support with 40+ Top Media Agencies',
    ],
    instructor: {
      name: 'Karan Malhotra',
      title: 'VP of Growth Marketing at Nykaa (Ex-Dentsu)',
      experience: '9+ Years Managing ₹50Cr+ Annual Media Spend',
      expertise: ['Meta Ads', 'Google Ads PMax', 'GA4', 'Conversion Rate Optimization', 'Media Buying'],
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
      linkedin: 'https://linkedin.com',
    },
    prerequisites: [
      'Basic understanding of internet & social media',
      'No prior marketing experience required',
    ],
    whoShouldTake: [
      'Fresh graduates seeking roles as Performance Marketers & Growth Specialists',
      'Business owners & entrepreneurs wanting to scale online sales & leads',
      'Marketing professionals looking to transition into high-paying paid ads',
    ],
    toolsCovered: ['Meta Ads Manager', 'Google Ads Console', 'Google Analytics 4', 'Hotjar', 'Triple Whale', 'Canva Pro', 'ChatGPT for Ads'],
    projects: [
      {
        title: 'D2C E-Commerce Brand Growth Scaling Campaign',
        description: 'Setup live Meta & Google Ads campaigns, design high-converting video creatives, configure CAPI event tracking, and optimize ROAS to 4.2x.',
        techStack: ['Meta Ads', 'Google Ads', 'GA4', 'Shopify Analytics'],
      },
      {
        title: 'High-Ticket B2B Lead Generation Funnel & Landing Page CRO',
        description: 'Build automated Google Search ad campaign, landing page lead magnet, and email retargeting funnel with full conversion tracking.',
        techStack: ['Google Ads', 'Google Tag Manager', 'Hotjar'],
      },
    ],
    faqs: [
      {
        question: 'Do students get access to live ad accounts for practice?',
        answer: 'Yes! We provide real demo budgets and ad manager sandboxes for live campaign optimization.',
      },
      {
        question: 'Is Google Analytics 4 (GA4) certification included?',
        answer: 'Yes, we prepare students for the official Google Ads & GA4 certification exams.',
      },
    ],
    careerRoles: [
      {
        title: 'Performance Marketer',
        avgSalary: '₹6.0 LPA - ₹14 LPA',
        hiringCompanies: ['Nykaa', 'Lenskart', 'Zomato', 'Publicis Media', 'Performics'],
      },
      {
        title: 'Digital Growth Manager',
        avgSalary: '₹8.0 LPA - ₹18 LPA',
        hiringCompanies: ['Swiggy', 'Paytm', 'Mamaearth', 'Schbang'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — Marketing Funnels & Customer Acquisition Strategy',
        duration: '4 Weeks',
        topics: [
          'TOFU, MOFU, BOFU Customer Funnel Architecture',
          'Customer Acquisition Cost (CAC) vs Lifetime Value (LTV)',
          'High-Converting Ad Copywriting with AI Prompts',
          'Competitor Ad Spying & Market Research (Meta Ad Library)',
        ],
        practicalLab: 'End-to-End Campaign Strategy & Offer Blueprint',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — Meta Ads (Facebook & Instagram) Scaling Blueprint',
        duration: '4 Weeks',
        topics: ['Meta Business Manager & Ad Account Structure', 'Custom Audiences, Lookalikes & Broad Targeting', 'Dynamic Product Ads (DPA) & Carousel Creatives', 'Meta Conversions API (CAPI) & Server-Side Tracking'],
        practicalLab: 'Live Meta Ad Campaign Creation, Testing & ROAS Scaling',
      },
      {
        moduleNumber: 3,
        title: 'Module 3 — Google Ads, Search, Display & Performance Max',
        duration: '4 Weeks',
        topics: ['Google Search Keyword Match Types & Negative Keywords', 'Quality Score Optimization & Bidding Strategies (tCPA, tROAS)', 'Performance Max (PMax) Campaign Architecture', 'YouTube In-Stream Video Ads & Retargeting'],
        practicalLab: 'High-Intent Google Search & PMax Ad Campaign Launch',
      },
      {
        moduleNumber: 4,
        title: 'Module 4 — GA4 Analytics, Landing Page CRO & Agency Client Pitch',
        duration: '4 Weeks',
        topics: ['Google Analytics 4 Custom Events & Funnel Exploration', 'Landing Page Heatmaps (Hotjar) & A/B Split Testing', 'Media Budget Allocation & Client Pitch Preparation', 'Official Google Ads & Meta Certified Professional Exams'],
        practicalLab: 'Final Capstone: Multi-Channel Performance Marketing Strategy & GA4 Audit',
      },
    ],
  },
  {
    id: 'course-14',
    title: 'SEO, Content Strategy & Growth Hacking Masterclass',
    slug: 'seo-content-strategy-growth-hacking-masterclass',
    headline: 'Rank #1 on Google with Technical SEO, Topic Clusters, Backlinks & Generative AI Content',
    description: 'Master organic traffic growth. Learn technical website audits, Keyword Research, Content Velocity with AI tools, Programmatic SEO, Link Building, and Google Search Console.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000&auto=format&fit=crop',
    domainId: 'dom-4',
    domainName: 'Digital Marketing',
    domainSlug: 'digital-marketing',
    duration: '3 Months',
    fee: 30000,
    discountFee: 21999,
    level: 'Beginner to Intermediate',
    mode: 'Live Online Studio',
    badge: 'Organic Growth',
    categoryTag: 'POPULAR',
    rating: 4.8,
    totalStudents: 890,
    placementAssistance: true,
    featured: false,
    highlights: [
      'Master Ahrefs, SEMrush & Screaming Frog Audits',
      'Programmatic SEO & AI Content Workflows',
      'High-Authority Link Building Strategies',
    ],
    instructor: {
      name: 'Megha Sharma',
      title: 'Head of Organic Growth at Freshworks',
      experience: '8+ Years Driving Organic Search Traffic',
      expertise: ['Technical SEO', 'Keyword Research', 'Content Clusters', 'Ahrefs'],
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
    prerequisites: ['Basic internet and blogging familiarity'],
    whoShouldTake: ['SEO Specialists, Content Creators, Bloggers, and Digital Marketers'],
    toolsCovered: ['Ahrefs', 'SEMrush', 'Screaming Frog', 'Google Search Console', 'SurferSEO', 'ChatGPT', 'WordPress'],
    projects: [
      {
        title: 'Full Website Technical SEO Audit & Ranking Blueprint',
        description: 'Comprehensive audit resolving crawl errors, Core Web Vitals, schema markup, and keyword gap analysis.',
        techStack: ['Screaming Frog', 'Ahrefs', 'Google Search Console'],
      },
    ],
    faqs: [
      {
        question: 'Will I learn how to use AI for SEO content creation?',
        answer: 'Yes! We cover ethical AI content generation, EEAT guidelines, and human editing workflows.',
      },
    ],
    careerRoles: [
      {
        title: 'SEO Specialist / Strategist',
        avgSalary: '₹5.0 LPA - ₹12 LPA',
        hiringCompanies: ['Freshworks', 'Zoho', 'iProspect', 'Dentsu'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — Keyword Research & On-Page SEO Foundations',
        duration: '4 Weeks',
        topics: ['Search Intent Analysis (Informational, Transactional)', 'Ahrefs & SEMrush Keyword Difficulty & Volume Analysis', 'Title Tags, Meta Descriptions & H1-H6 Hierarchy', 'Content Topic Clusters & Pillar Page Architecture'],
        practicalLab: 'Keyword Opportunity & Content Pillar Map for SaaS',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — Technical SEO, Core Web Vitals & Schema Markup',
        duration: '4 Weeks',
        topics: ['Screaming Frog Crawl Audits & 404/301 Redirects', 'XML Sitemap, Robots.txt & Canonical Tag Optimization', 'Google Core Web Vitals (LCP, INP, CLS)', 'JSON-LD Structured Data Schema Markup (FAQ, Article, Product)'],
        practicalLab: 'Technical Site Audit & Fix Plan for Live Domain',
      },
      {
        moduleNumber: 3,
        title: 'Module 3 — Off-Page SEO, Link Building & AI Content Velocity',
        duration: '4 Weeks',
        topics: ['High-Authority Backlink Acquisition Strategies (Digital PR, Skyscraper)', 'Google Search Console Performance Diagnostics', 'Generative AI Content Velocity & EEAT Guidelines', 'Local SEO & Google Business Profile Optimization'],
        practicalLab: 'Link Building Outreach Campaign & GSC Performance Report',
      },
    ],
  },
  {
    id: 'course-comm-1',
    title: 'Executive Business Communication & Corporate Soft Skills Masterclass',
    slug: 'executive-business-communication-corporate-soft-skills',
    headline: 'Master Spoken Business English, Email Etiquette, Presentation Mastery & Workplace Leadership',
    description: 'Designed for students, fresh graduates, job seekers, and working professionals seeking to articulate ideas with impact, clear corporate interview rounds, deliver compelling executive presentations, and navigate modern workplace dynamics with confidence.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    domainId: 'dom-8',
    domainName: 'Communication & Professional Skills',
    domainSlug: 'communication-professional-skills',
    duration: '3 Months',
    fee: 22000,
    discountFee: 14999,
    level: 'Beginner to Advanced',
    mode: 'Live Online Workshops + Interactive Labs',
    badge: 'Flagship Program',
    categoryTag: 'TRENDING',
    rating: 4.9,
    totalStudents: 890,
    placementAssistance: true,
    featured: true,
    highlights: [
      '1-on-1 Spoken English Audits & Accent Neutralization',
      'Corporate Interview Drills & Resume Makeover Workshops',
      'Executive Pitching, Public Speaking & Presentation Labs',
      'Business Email Etiquette & Slack/Teams Workplace Dynamics',
    ],
    instructor: {
      name: 'Ananya Roy',
      title: 'Ex-Corporate HR Director & Senior Executive Coach',
      experience: '12+ Years Coaching Corporate Executives at Deloitte & PwC',
      expertise: ['Business English', 'Executive Presence', 'Public Speaking', 'Behavioral Interviews'],
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      linkedin: 'https://linkedin.com',
    },
    prerequisites: ['Basic understanding of conversational English'],
    whoShouldTake: [
      'Graduates and students preparing for campus placement interviews',
      'Working professionals seeking promotions and leadership visibility',
      'Non-native English speakers wanting to eliminate hesitation and speak fluently',
    ],
    toolsCovered: ['Grammarly Premium', 'MS PowerPoint', 'Canva Presentations', 'Zoom / MS Teams', 'Elevator Pitch Frameworks', 'Loom Video Audits'],
    projects: [
      {
        title: 'Executive Boardroom Pitch & Corporate Portfolio Presentation',
        description: 'Prepare and deliver a 10-minute live business pitch in front of industry judges with real-time feedback on body language, vocal modulation, and slide storytelling.',
        techStack: ['MS PowerPoint', 'Canva', 'Zoom Live Feedback'],
      },
    ],
    faqs: [
      {
        question: 'Will I get personal feedback on my speaking fluency and grammar?',
        answer: 'Yes! You receive 1-on-1 audio/video evaluations from certified communication coaches each week.',
      },
    ],
    careerRoles: [
      {
        title: 'Corporate Communications Specialist',
        avgSalary: '₹5.5 LPA - ₹14 LPA',
        hiringCompanies: ['Deloitte', 'Accenture', 'Amazon', 'McKinsey'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — Business English & Grammar Precision',
        duration: '4 Weeks',
        topics: [
          'Eliminating Common Grammatical Errors & Sentence Construction',
          'Professional Vocabulary & Corporate Terminology Building',
          'Pronunciation, Accent Neutralization & Vocal Clarity',
          'Active Listening & Concise Expression Techniques',
        ],
        practicalLab: 'Live Impromptu Speaking & Pronunciation Audio Audits',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — Written Communication & Professional Email Etiquette',
        duration: '4 Weeks',
        topics: [
          'High-Impact Business Email Writing & Subject Line Strategies',
          'Writing Project Status Reports, Meeting Minutes (MOM) & Proposals',
          'Professional Tone in Slack, MS Teams & Client Messages',
          'Handling Sensitive Workplace Conversations & Conflict Resolution',
        ],
        practicalLab: 'Corporate Email Rewrite & Conflict Scenario Simulation',
      },
      {
        moduleNumber: 3,
        title: 'Module 3 — Public Speaking, Presentations & Interview Mastery',
        duration: '4 Weeks',
        topics: [
          'Designing Visual Storytelling Slides (PowerPoint / Canva)',
          'Overcoming Stage Fright & Body Language Mastery',
          'Behavioral (STAR Method) & HR Interview Questions Preparation',
          'Group Discussion (GD) Tactics & Steering Conversations',
        ],
        practicalLab: 'Live Mock Group Discussion & Final Executive Pitch',
      },
    ],
  },
  {
    id: 'course-comm-2',
    title: 'Spoken English, Interview Confidence & Personality Development Bootcamp',
    slug: 'spoken-english-interview-confidence-personality-development',
    headline: 'Overcome Hesitations, Speak Fluent English, Master GDs & Crack Top HR/Technical Interviews',
    description: 'An intensive hands-on bootcamp designed to build unshakable confidence, fluent English speaking skills, sharp interview answers, and professional body language for freshers and professionals.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
    domainId: 'dom-8',
    domainName: 'Communication & Professional Skills',
    domainSlug: 'communication-professional-skills',
    duration: '2 Months',
    fee: 18000,
    discountFee: 11999,
    level: 'Beginner to Intermediate',
    mode: 'Classroom + Live Online Practice Groups',
    badge: 'Top Rated',
    categoryTag: 'POPULAR',
    rating: 4.95,
    totalStudents: 1150,
    placementAssistance: true,
    featured: true,
    highlights: [
      'Daily 30-Minute Live Speaking Practice in Micro-Groups',
      'ATS Resume Creation & LinkedIn Profile Optimization',
      '10+ Mock HR & Technical Behavioral Interview Practice Sessions',
      'Group Discussion (GD) Drills with Real-Time Panelist Scoring',
    ],
    instructor: {
      name: 'David Miller',
      title: 'Certified CELTA Voice & Accent Trainer',
      experience: '10+ Years Experience Training College Freshers & Job Seekers',
      expertise: ['Spoken English', 'Interview Coaching', 'GD Drills', 'Soft Skills'],
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      linkedin: 'https://linkedin.com',
    },
    prerequisites: ['Willingness to participate in daily live speaking drills'],
    whoShouldTake: [
      'Freshers and college seniors aiming to clear MNC placement drives',
      'Job seekers wanting to boost self-confidence during HR interview rounds',
      'Individuals looking to eliminate public speaking anxiety and stutter',
    ],
    toolsCovered: ['ATS Resume Builders', 'LinkedIn Sales Navigator', 'Zoom Breakout Rooms', 'Vocal Pitch Apps', 'Interview Q&A Vault'],
    projects: [
      {
        title: 'Full Placement Mock Drive & Video Resume Portfolio',
        description: 'Participate in a simulated end-to-end MNC recruitment drive including Aptitude Round prep, Group Discussion, HR Interview, and Video Resume Creation.',
        techStack: ['ATS Resume Builder', 'LinkedIn', 'Video Recording'],
      },
    ],
    faqs: [
      {
        question: 'Are there small practice groups so I can speak without fear?',
        answer: 'Yes! Live practice sessions are conducted in tiny groups of 4-5 students led by a mentor.',
      },
    ],
    careerRoles: [
      {
        title: 'Client Specialist / Talent Acquisition Associate',
        avgSalary: '₹4.5 LPA - ₹10 LPA',
        hiringCompanies: ['TCS', 'Cognizant', 'Infosys', 'Wipro', 'HCL'],
      },
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Module 1 — Spoken English Fluency & Vocabulary Booster',
        duration: '3 Weeks',
        topics: [
          'Daily Conversational Fluency Drills without Hesitation',
          'Building Active Vocabulary & Phrasal Verbs',
          'Correcting Common Indianisms & Translation Mistakes',
          'Confidence Building & Overcoming Shyness',
        ],
        practicalLab: 'Daily 1-on-1 Partner Speaking & Audio Feedback',
      },
      {
        moduleNumber: 2,
        title: 'Module 2 — Interview Masterclass & STAR Method Framing',
        duration: '3 Weeks',
        topics: [
          '"Tell Me About Yourself" & Impactful Self-Introduction',
          'Answering Difficult Behavioral Questions with the STAR Method',
          'Salary Negotiation & Handling Employment Gaps',
          'Body Language, Eye Contact & Virtual Video Interview Hygiene',
        ],
        practicalLab: 'Live 1-on-1 Mock Interview with Detailed Scorecard',
      },
      {
        moduleNumber: 3,
        title: 'Module 3 — Group Discussion (GD) & Professional Persona',
        duration: '2 Weeks',
        topics: [
          'GD Entry Strategies, Summarizing & Topic Analysis',
          'Handling Dominant Speakers & Diplomatic Disagreements',
          'ATS Resume Creation & LinkedIn Professional Branding',
        ],
        practicalLab: 'Live Competitive Group Discussion Simulation',
      },
    ],
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Start a Career in Artificial Intelligence & GenAI in 2026',
    slug: 'how-to-start-career-in-ai',
    category: 'AI & GenAI',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    authorName: 'Dr. Ananya Sen',
    authorTitle: 'Lead AI Fellow',
    authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    readTime: '6 Min Read',
    summary: 'A step-by-step roadmap for mastering Python, PyTorch, LangChain, vector databases, and RAG architectures to land high-paying AI engineering roles.',
    content: `
# How to Start a Career in Artificial Intelligence & GenAI

The landscape of software development is undergoing a generational shift. With the explosion of Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and autonomous agent networks, demand for skilled AI engineers has surged dramatically.

## 1. Master Python & Tensor Math
Python remains the undisputed language of Machine Learning. Focus your initial 4 weeks on:
- NumPy matrix transformations
- Pandas DataFrames & Exploratory Data Analysis (EDA)
- PyTorch tensor manipulation

## 2. Understand RAG Pipelines & Vector Search
Traditional LLMs hallucinate when queried on private company documents. RAG solves this by converting text into vector embeddings stored in Pinecone or ChromaDB.

## 3. Build Production LLM Projects
Employers prioritize candidates with live GitHub repositories demonstrating:
- Custom PDF Q&A bots using LangChain
- Multi-agent networks using CrewAI
- FastAPI endpoints wrapping model inference
`,
    featured: true,
    createdAt: '2026-08-01',
  },
  {
    id: 'blog-2',
    title: 'Top 10 Full Stack Web Development Interview Questions & Answers',
    slug: 'top-full-stack-interview-questions',
    category: 'Interview Preparation',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    authorName: 'Rohan Deshmukh',
    authorTitle: 'Ex-Amazon Engineer',
    authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    readTime: '8 Min Read',
    summary: 'Master Next.js App Router, React 18 hooks, Node.js event loop, PostgreSQL query optimization, and System Design concepts to clear tier-1 interviews.',
    content: `
# Top 10 Full Stack Web Development Interview Questions

Preparing for a senior Full Stack Engineer interview requires both theoretical depth and practical coding fluency.

## Key Focus Areas
1. React 18 Server Components vs Client Components
2. Next.js 14 Server Actions and caching mechanics
3. Relational vs Non-relational database query optimization
4. Building rate-limited JWT authentication microservices
`,
    featured: true,
    createdAt: '2026-08-05',
  },
  {
    id: 'blog-3',
    title: 'AWS Cloud & DevOps Engineering Roadmap 2026: Docker to Multi-Cluster Kubernetes',
    slug: 'aws-cloud-devops-kubernetes-roadmap',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop',
    authorName: 'Vikramaditya Rao',
    authorTitle: 'Principal Cloud Architect',
    authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    readTime: '10 Min Read',
    summary: 'Comprehensive technical guide for mastering Docker containerization, Kubernetes orchestration, Terraform Infrastructure as Code, and CI/CD pipelines.',
    content: `
# AWS Cloud & DevOps Engineering Roadmap

Modern cloud infrastructure demands automated provisioning, zero-downtime deployments, and robust observability.

## 1. Linux Kernel & Shell Automation
Understanding systemd, SSH key management, bash scripting, and networking fundamentals (DNS, TCP/IP, VPC subnetting) forms the bedrock of DevOps.

## 2. Docker & Containerization
Learn multi-stage Dockerfiles, image security scanning using Trivy, and Docker Compose environments for local development.

## 3. Kubernetes (EKS) & GitOps
Master Pod lifecycle, StatefulSets, Ingress NGINX controllers, Helm charts, and automated deployment with ArgoCD.
`,
    featured: true,
    createdAt: '2026-08-07',
  },
  {
    id: 'blog-4',
    title: 'Data Science & Analytics 101: Power BI, SQL, Python & Tableau Complete Guide',
    slug: 'data-analytics-power-bi-sql-guide',
    category: 'Data & Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    authorName: 'Priya Sharma',
    authorTitle: 'Senior Data Scientist',
    authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    readTime: '7 Min Read',
    summary: 'Learn how modern business analysts and data scientists leverage SQL query tuning, Power BI DAX calculations, and Python statistical libraries to solve complex enterprise problems.',
    content: `
# Data Science & Analytics Complete Guide

Data-driven decision making is critical for every modern company. Here is how to master data analytics in 2026.

## 1. Advanced SQL for Analytics
Master Window functions (ROW_NUMBER, DENSE_RANK, LAG/LEAD), Common Table Expressions (CTEs), and aggregation indexing.

## 2. Power BI & DAX Metrics
Build interactive executive dashboards, configure star schema data models, and write complex DAX formulas for time intelligence.
`,
    featured: true,
    createdAt: '2026-08-08',
  },
  {
    id: 'blog-5',
    title: 'UI/UX Design Trends in 2026: Figma Design Systems, Micro-Interactions & Usability Testing',
    slug: 'ui-ux-design-systems-figma-trends',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop',
    authorName: 'Siddharth Nair',
    authorTitle: 'Staff Product Designer',
    authorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    readTime: '5 Min Read',
    summary: 'Explore industry-standard UX research workflows, component design tokens in Figma, auto-layout mastery, and interactive prototyping for mobile apps.',
    content: `
# UI/UX Design Trends & Figma Mastery

Great product design balances user psychology with aesthetic elegance and responsive interaction design.

## Key Design Principles
- Design Systems & Variable Tokens
- Auto Layout 5.0 in Figma
- Mobile-First responsive grids
- Accessibility compliance (WCAG 2.2 AA)
`,
    featured: false,
    createdAt: '2026-08-09',
  },
  {
    id: 'blog-6',
    title: 'How Non-IT Graduates Can Switch into High-Paying Tech Roles in 6 Months',
    slug: 'non-tech-to-it-career-switch-roadmap',
    category: 'Career Advice',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    authorName: 'Meera Nair',
    authorTitle: 'Head of Career Placement Services',
    authorPhoto: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=200&auto=format&fit=crop',
    readTime: '9 Min Read',
    summary: 'A realistic 6-month blueprint for career switchers: choosing non-coding or coding tracks, building ATS resumes, and leveraging 1-on-1 mentorship for job placements.',
    content: `
# How Non-IT Graduates Can Switch into High-Paying Tech Roles

Switching into technology from Arts, Commerce, Civil Engineering, or Sales is fully achievable with the right strategy.

## 1. Choose Your Ideal Domain Track
- **Coding Track**: Full Stack Web Development, Python AI/ML, Cloud DevOps
- **Low-Coding / Business Track**: Data Analytics (Power BI/SQL), UI/UX Design, Digital Marketing

## 2. Build 3 Live Production Projects
Rather than passive tutorial watching, complete end-to-end practical labs that show employer-ready skills.
`,
    featured: true,
    createdAt: '2026-08-10',
  },
  {
    id: 'blog-7',
    title: 'Modern Digital Marketing & Growth Hacking: SEO, Performance Ads & AI Analytics',
    slug: 'digital-marketing-growth-hacking-ai',
    category: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    authorName: 'Karan Malhotra',
    authorTitle: 'VP of Growth Marketing',
    authorPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    readTime: '6 Min Read',
    summary: 'Discover modern growth marketing strategies using automated Google & Meta ad campaigns, SEO content clusters, customer acquisition funnels, and analytics tools.',
    content: `
# Modern Digital Marketing & Growth Hacking

Growth marketing in 2026 relies on automated bidding, programmatic ad creatives, and deep funnel analytics.

## Strategy Stack
1. Programmatic Meta & Google Performance Max Ads
2. Technical SEO & Semantic Content Architecture
3. Conversion Rate Optimization (CRO)
`,
    featured: false,
    createdAt: '2026-08-11',
  },
  {
    id: 'blog-8',
    title: 'Cybersecurity Essentials: Hands-On Guide to Ethical Hacking & Network Defense',
    slug: 'cybersecurity-ethical-hacking-network-defense',
    category: 'Cyber Security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    authorName: 'Rajesh Varma',
    authorTitle: 'Certified Ethical Hacker',
    authorPhoto: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop',
    readTime: '8 Min Read',
    summary: 'Understand penetration testing methodology, OWASP Top 10 vulnerabilities, SIEM log monitoring, and how to start a career in SOC analysis and threat hunting.',
    content: `
# Cybersecurity Essentials & Threat Hunting

With increasing enterprise cloud adoption, network defense and incident response specialists are in record demand.

## Core Security Pillars
- OWASP Top 10 web vulnerabilities (SQLi, XSS, CSRF, SSRF)
- Wireshark packet capture & SIEM log analytics (Splunk)
- Penetration testing methodology using Kali Linux
`,
    featured: false,
    createdAt: '2026-08-12',
  },
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Live Workshop: Building Autonomous GenAI LLM Agents with LangChain',
    slug: 'live-workshop-building-autonomous-genai-agents',
    category: 'Workshops',
    date: 'Saturday, August 22, 2026',
    time: '11:00 AM - 1:30 PM IST',
    location: 'Live Zoom Studio & HSR Layout Campus',
    speakerName: 'Dr. Ananya Sen',
    speakerRole: 'Ex-Google AI Fellow',
    speakerFoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    description: 'Join our hands-on live code session where we construct a multi-agent customer support bot using PyTorch, LangChain, Pinecone, and OpenAI API.',
    featured: true,
    createdAt: '2026-08-10',
  },
  {
    id: 'evt-2',
    title: 'Career Webinar: How to Transition from Non-Tech to Full Stack Coding',
    slug: 'career-webinar-non-tech-to-full-stack',
    category: 'Webinars',
    date: 'Wednesday, August 26, 2026',
    time: '7:00 PM - 8:30 PM IST',
    location: 'Live Interactive Zoom Webinar',
    speakerName: 'Rohan Deshmukh',
    speakerRole: 'Ex-Amazon Senior Engineer',
    speakerFoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    description: 'Learn the exact 6-month roadmap followed by 100+ non-tech graduates to clear technical coding rounds at top product firms.',
    featured: true,
    createdAt: '2026-08-11',
  },
];

export const INITIAL_NOTIFICATIONS: StudentNotification[] = [
  {
    id: 'notif-1',
    userId: 'usr-student-1',
    title: 'Enrollment Confirmed!',
    message: 'Welcome to Full Stack MERN & Next.js Masterclass. Your batch starts Mon-Fri at 7:30 PM.',
    type: 'ENROLLMENT',
    read: false,
    createdAt: '2026-08-10',
  },
  {
    id: 'notif-2',
    userId: 'usr-student-1',
    title: 'Live Zoom Class Scheduled',
    message: 'Next.js 14 Server Actions & Microservices live lab is today at 7:30 PM IST.',
    type: 'CLASS',
    read: false,
    createdAt: '2026-08-11',
  },
  {
    id: 'notif-3',
    userId: 'usr-student-1',
    title: 'ISO Certificate Generated',
    message: 'Your ISO 9001:2026 verified credential is now available in your dashboard.',
    type: 'CERTIFICATE',
    read: true,
    createdAt: '2026-08-08',
  },
];

export const INITIAL_SETTINGS: SiteSettings = {
  phone: '+91 9876543210',
  email: 'contact@apexinstitute.com',
  address: 'Apex Tower, Outer Ring Road, HSR Layout, Bangalore 560102',
  workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM IST',
  facebookUrl: 'https://facebook.com',
  twitterUrl: 'https://twitter.com',
  linkedinUrl: 'https://linkedin.com',
  youtubeUrl: 'https://youtube.com',
  whatsappNo: '+919876543210',
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Aarav Sharma',
    userRole: 'Full Stack Engineer',
    company: 'Razorpay',
    courseId: 'course-1',
    courseTitle: 'Full Stack MERN & Next.js Masterclass',
    rating: 5,
    comment: 'The project-driven curriculum and live mentorship helped me switch careers from non-tech to a 12 LPA Full Stack role at Razorpay in just 6 months!',
    approved: true,
    createdAt: '2026-06-15',
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Admin Director',
    email: 'admin@apexinstitute.com',
    password: 'vageesha2000',
    phone: '+91 9876543210',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-01-01',
  },
  {
    id: 'usr-student-1',
    name: 'Vikram Malhotra',
    email: 'student@example.com',
    password: 'student123',
    phone: '+91 9123456789',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-05-10',
  },
  {
    id: 'usr-faculty-1',
    name: 'Prof. Rohan Deshmukh (Lead Faculty)',
    email: 'faculty@apexinstitute.com',
    password: 'faculty123',
    phone: '+91 9822334455',
    role: 'FACULTY',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    createdAt: '2026-02-15',
  },
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr-1',
    userId: 'usr-student-1',
    userName: 'Vikram Malhotra',
    userEmail: 'student@example.com',
    userPhone: '+91 9123456789',
    courseId: 'course-1',
    courseTitle: 'Full Stack MERN & Next.js Masterclass',
    courseSlug: 'full-stack-mern-nextjs-masterclass',
    status: 'ACTIVE',
    progress: 65,
    batchTiming: 'Mon-Fri (7:30 PM - 9:30 PM)',
    mode: 'Live Online',
    enrolledAt: '2026-05-12',
    course: INITIAL_COURSES[0],
    totalFee: 28000,
    registrationFeePaid: 2000,
    remainingFee: 26000,
    paymentPlan: 'LUMPSUM',
    paymentStatus: 'REGISTRATION_PAID',
  },
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    name: 'Karan Malhotra',
    email: 'karan@gmail.com',
    phone: '+91 9811223344',
    courseId: 'course-1',
    courseTitle: 'Full Stack MERN & Next.js Masterclass',
    message: 'Interested in the upcoming weekend batch. Are installment payment options available?',
    status: 'NEW',
    notes: 'Followed up via call, requested batch syllabus PDF.',
    createdAt: '2026-08-10',
  },
];

/**
 * Resolves a course-specific image matching the title/domain/slug.
 * Ensures courses never fall back to an identical image unless they actually match the topic.
 */
export function getCourseImage(
  title?: string,
  slug?: string,
  domainName?: string,
  existingImage?: string
): string {
  // If an existing image is provided:
  if (existingImage && typeof existingImage === 'string' && existingImage.trim() !== '') {
    // If it's the generative-ai-banner, only keep it if the course is actually AI / LLM related
    if (existingImage.includes('generative-ai-banner')) {
      const lower = `${title || ''} ${slug || ''} ${domainName || ''}`.toLowerCase();
      if (
        lower.includes('generative') ||
        lower.includes('llm') ||
        lower.includes('artificial intelligence') ||
        lower.includes('ai & machine') ||
        lower.includes('prompt')
      ) {
        return existingImage;
      }
      // If it's NOT AI related, continue below to find the true title-specific image!
    } else {
      return existingImage;
    }
  }

  // 1. Direct match with INITIAL_COURSES by slug or ID
  if (slug) {
    const s = slug.toLowerCase().trim();
    const matched = INITIAL_COURSES.find(
      (c) => c.slug.toLowerCase() === s || c.id.toLowerCase() === s
    );
    if (matched && matched.image) return matched.image;
  }

  // 2. Direct match with INITIAL_COURSES by title
  if (title) {
    const tLower = title.toLowerCase().trim();
    const matchedByTitle = INITIAL_COURSES.find(
      (c) => c.title.toLowerCase().trim() === tLower
    );
    if (matchedByTitle && matchedByTitle.image) return matchedByTitle.image;
  }

  // 3. Keyword-based matching for topic & title
  const combined = `${title || ''} ${slug || ''} ${domainName || ''}`.toLowerCase();

  // MERN / Full Stack / Next.js / Web Development / Frontend / Backend
  if (
    combined.includes('mern') ||
    combined.includes('full stack') ||
    combined.includes('web development') ||
    combined.includes('web dev') ||
    combined.includes('next.js') ||
    combined.includes('react') ||
    combined.includes('javascript') ||
    combined.includes('frontend') ||
    combined.includes('backend') ||
    combined.includes('node')
  ) {
    return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop';
  }

  // Generative AI / LLMs
  if (
    combined.includes('generative') ||
    combined.includes('llm') ||
    combined.includes('prompt') ||
    combined.includes('rag') ||
    combined.includes('chatgpt') ||
    combined.includes('openai')
  ) {
    return '/images/generative-ai-banner.jpg';
  }

  // Artificial Intelligence / Machine Learning
  if (
    combined.includes('machine learning') ||
    combined.includes('artificial intelligence') ||
    combined.includes('deep learning') ||
    combined.includes('neural')
  ) {
    return 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1000&auto=format&fit=crop';
  }

  // Power BI / Business Analytics / SQL / Excel
  if (
    combined.includes('power bi') ||
    combined.includes('business analytics') ||
    combined.includes('tableau') ||
    combined.includes('sql') ||
    combined.includes('excel') ||
    combined.includes('bi ') ||
    combined.includes('bi-')
  ) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop';
  }

  // Data Science / Python / Big Data
  if (
    combined.includes('data science') ||
    combined.includes('python') ||
    combined.includes('big data') ||
    combined.includes('data engineering')
  ) {
    return 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1000&auto=format&fit=crop';
  }

  // Product Management / Agile / Scrum / Project Management
  if (
    combined.includes('product management') ||
    combined.includes('agile') ||
    combined.includes('scrum') ||
    combined.includes('project management') ||
    combined.includes('leadership')
  ) {
    return 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop';
  }

  // Finance / Tally / GST / Accounting / Valuation
  if (
    combined.includes('financial') ||
    combined.includes('finance') ||
    combined.includes('tally') ||
    combined.includes('gst') ||
    combined.includes('accounting') ||
    combined.includes('valuation') ||
    combined.includes('banking') ||
    combined.includes('tax')
  ) {
    return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop';
  }

  // Figma / Design Tokens
  if (
    (combined.includes('figma') && combined.includes('token')) ||
    combined.includes('component architecture')
  ) {
    return 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop';
  }

  // UI/UX / Design Systems / Graphic Design
  if (
    combined.includes('ui/ux') ||
    combined.includes('ui-ux') ||
    combined.includes('ux') ||
    combined.includes('ui design') ||
    combined.includes('design system') ||
    combined.includes('graphic design') ||
    combined.includes('figma')
  ) {
    return 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop';
  }

  // Automation / n8n / Web3 / Blockchain / IoT / Robotics
  if (
    combined.includes('n8n') ||
    combined.includes('automation') ||
    combined.includes('workflow') ||
    combined.includes('blockchain') ||
    combined.includes('web3') ||
    combined.includes('iot') ||
    combined.includes('robotics')
  ) {
    return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop';
  }

  // SEO / Organic Growth / Growth Hacking
  if (
    combined.includes('seo') ||
    combined.includes('growth hacking') ||
    combined.includes('organic')
  ) {
    return 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000&auto=format&fit=crop';
  }

  // Digital Marketing / Performance Marketing / Paid Ads
  if (
    combined.includes('marketing') ||
    combined.includes('paid acquisition') ||
    combined.includes('ad ') ||
    combined.includes('ads') ||
    combined.includes('social media')
  ) {
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop';
  }

  // Spoken English / Interview Preparation / Fluency
  if (
    combined.includes('spoken english') ||
    combined.includes('english') ||
    combined.includes('interview') ||
    combined.includes('fluency')
  ) {
    return 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop';
  }

  // Corporate Communication / Soft Skills / Executive Presence
  if (
    combined.includes('corporate communication') ||
    combined.includes('communication') ||
    combined.includes('executive presence') ||
    combined.includes('soft skill') ||
    combined.includes('personality') ||
    combined.includes('public speaking')
  ) {
    return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop';
  }

  // Cloud / DevOps / AWS / Docker / Kubernetes
  if (
    combined.includes('cloud') ||
    combined.includes('devops') ||
    combined.includes('aws') ||
    combined.includes('docker') ||
    combined.includes('kubernetes') ||
    combined.includes('azure')
  ) {
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop';
  }

  // Cyber Security / Ethical Hacking
  if (
    combined.includes('cyber') ||
    combined.includes('security') ||
    combined.includes('hacking')
  ) {
    return 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop';
  }

  // Career Switch / Placement Guaranteed / Job-Oriented Bootcamps
  if (
    combined.includes('career switch') ||
    combined.includes('placement') ||
    combined.includes('bootcamp') ||
    combined.includes('job-oriented') ||
    combined.includes('career program') ||
    combined.includes('career')
  ) {
    return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop';
  }

  // General Career / Tech Education fallback
  return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop';
}


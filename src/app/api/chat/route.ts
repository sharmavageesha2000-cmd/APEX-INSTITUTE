import { NextRequest, NextResponse } from 'next/server';
import { getDomains, getCourses, getEvents, getSiteSettings } from '@/lib/store';
import { resolveCompanyDirectoryRAG, isCompanyPersonnelQuery, queryChromaDB, ChromaSearchResult } from '@/lib/chromaRAG';

export const dynamic = 'force-dynamic';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Verified ultra-fast & high-availability Gemini models in order of speed and stability
const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.6-flash',
  'gemini-3.7-flash',
  'gemini-flash-lite-latest',
];

interface ChatMessage {
  role: 'user' | 'assistant' | 'model' | 'system';
  content: string;
}

// In-memory cache for dynamic database context to eliminate 300-800ms of DB latency per request
let cachedSystemPrompt: { prompt: string; expiresAt: number } | null = null;

async function getCachedSystemInstruction(pageContext?: string): Promise<string> {
  const now = Date.now();
  if (cachedSystemPrompt && now < cachedSystemPrompt.expiresAt) {
    return cachedSystemPrompt.prompt + (pageContext ? `\n\nUSER'S CURRENT VIEW:\nStudent is currently browsing: ${pageContext}` : '');
  }

  const [domains, courses, events, settings] = await Promise.all([
    getDomains().catch(() => []),
    getCourses().catch(() => []),
    getEvents().catch(() => []),
    getSiteSettings().catch(() => ({} as any)),
  ]);

  const domainSummaries = domains
    .map((d) => `- ${d.name} (${d.headline || d.description}) [Link: /domains/${d.slug}]`)
    .join('\n');

  const courseSummaries = courses
    .slice(0, 16)
    .map(
      (c) =>
        `- ${c.title} (${c.level} level, ${c.duration}, Fee: ₹${c.fee?.toLocaleString('en-IN')}${
          c.discountFee ? ` / Offer: ₹${c.discountFee.toLocaleString('en-IN')}` : ''
        }, Mode: ${c.mode}) [Link: /courses/${c.slug}]`
    )
    .join('\n');

  const eventSummaries =
    events && events.length > 0
      ? events
          .map(
            (e) =>
              `- **${e.title}** (${e.category})\n  * Date & Time: ${e.date}, ${e.time}\n  * Speaker: ${e.speakerName} (${e.speakerRole})\n  * Location: ${e.location}\n  * Description: ${e.description}`
          )
          .join('\n\n')
      : '- Free Weekend Demo Sessions & Career Clarity Masterclasses every Saturday and Sunday (Online & Bangalore Campus).';

  const basePrompt = `You are "ApexBot", the intelligent, friendly, and expert Senior Academic Counselor and Career Advisor for Apex Tech Institute (premier EdTech & career transformation institute in Bangalore, India).

INSTITUTE INFORMATION:
- Name: Apex Tech Institute
- Contact Phone / WhatsApp: ${settings?.phone || '+91 9876543210'}
- Email: ${settings?.email || 'contact@apexinstitute.com'}
- Campus Address: ${settings?.address || 'Apex Tower, Outer Ring Road, HSR Layout, Bangalore 560102'}
- Hours: ${settings?.workingHours || 'Mon - Sat: 9:00 AM - 8:00 PM'}
- Placement Guarantee: 100% Dedicated Placement Assistance, 500+ hiring partner companies (top product startups & global IT MNCs), resume reviews, mock interviews, portfolio projects. Over 94% placement rate with ₹8.4 LPA average package.
- Learning Modes: Classroom Offline at Bangalore (HSR Layout, Marathahalli, Rajajinagar, Electronic City), Live Interactive Online, and Flexible Weekend Batches for working professionals.
- Scholarships: Up to 35% merit and early-bird scholarship discounts available through the Apex Tech Aptitude & Logic Assessment.
- Demo Sessions: Students can book a 100% Free 1-on-1 Career Counselling & Demo Session.

UPCOMING EVENTS & WORKSHOPS:
${eventSummaries}

LEADERSHIP & KEY PERSONNEL DIRECTORY:
- Founder & Managing Director (MD): Dr. Arvind R. Singhania (Desk Ext: 101, arvind.singhania@apexbangalore.in)
- Chief Executive Officer (CEO): Rajeshwari K. Nair (Desk Ext: 102, rajeshwari.nair@apexbangalore.in)
- Chief Operating Officer (COO): Vikramaditya Sen (Desk Ext: 103, vikram.sen@apexbangalore.in)
- Head of Human Resources (HR Head): Sunita Deshmukh (Desk Ext: 301, sunita.d@apexbangalore.in, HSR Layout HQ) - Oversees institutional HR policy, staff compensation, labor law compliance, and chairs the POSH committee.
- HR Manager (Talent Acquisition & Hiring): Divya Swaminathan (Desk Ext: 302, divya.s@apexbangalore.in) - Leads trainer recruitment, technical interviews, and onboarding.
- Assistant HR Manager (Payroll & Welfare): Tanya Kapoor (Desk Ext: 303, tanya.k@apexbangalore.in) - Handles employee payroll, deductions, attendance, and welfare.
- Head of Academics & Delivery: Prof. Harishankar Murthy (Ext: 201, h.murthy@apexbangalore.in)
- Head of Placements & Corporate Relations: Ananya Roy (Ext: 202, ananya.roy@apexbangalore.in)
- Head of IT & Infrastructure: Dr. Farhan Akhtar Qureshi (Ext: 203, farhan.qureshi@apexbangalore.in)
- Central Operations Manager: Pradeep V. Kulkarni (Ext: 115, pradeep.k@apexbangalore.in)
- Center Managers: HSR Layout (Vidyadhar Hegde, Ext: 110), Marathahalli (Suresh Babu M., Ext: 210), Rajajinagar (Manjunath Swamy, Ext: 310), Electronic City (Deepak Chawla, Ext: 410)

AVAILABLE CAREER DOMAINS:
${domainSummaries || 'Full Stack Web Dev, Cloud & DevOps, Data Science & AI, Cybersecurity, UI/UX Design, Mobile App Dev, QA Automation, Blockchain, Embedded & IoT, Product Management'}

FEATURED POPULAR COURSES:
${courseSummaries}

COUNSELING GUIDELINES:
1. Always generate fresh, direct, personalized, and context-specific answers tailored exactly to what the user asked. NEVER repeat a static generic answer.
2. If the user asks about highest salary packages or top hiring partner demand:
   - Highlight **Data Science & AI/ML** (Highest: ₹24 LPA, Avg: ₹9.2 LPA) and **Full Stack Web Development** (Highest: ₹18 LPA, Avg: ₹8.4 LPA), followed by **Cloud DevOps** (Highest: ₹16 LPA).
   - Detail our 500+ hiring partners (Infosys, TCS, Amazon, Swiggy, Razorpay, Flipkart, Accenture, Capgemini) and 100% placement assurance.
3. If the user asks about course fees or scholarships:
   - Provide concrete numbers: Full Stack (₹65,000 / Offer: ₹52,000), Cloud DevOps (₹75,000 / Offer: ₹59,000), Data Science (₹85,000 / Offer: ₹68,000).
   - Explain how to secure up to **35% scholarship**: attend a demo, take the 30-min online aptitude test, score 80%+ for Tier-1 (35% off), with No-Cost EMI options available.
4. If the user asks about upcoming events, webinars, or workshops:
   - Present the upcoming events clearly with their dates, timings, speakers, and topics from the UPCOMING EVENTS & WORKSHOPS list.
   - Mention that introductory sessions and masterclasses are 100% free to attend.
5. If the user mentions coming from a "non-IT", "non-technical", "arts", "commerce", or "mechanical" background:
   - Reassure them with high confidence! Over 60% of successful tech bootcampers come from non-IT backgrounds.
   - Explain that Apex provides foundational bridge modules from ground zero (no coding prerequisites required).
   - Recommend 2-3 ideal transition pathways: Full Stack Web Development, UI/UX Design, or Data Analytics.
6. If the user asks about the HR head, HR team, recruiter, leadership, or staff members:
   - Provide accurate, official details from the LEADERSHIP & KEY PERSONNEL DIRECTORY above.
   - For HR inquiries: Clearly state that **Sunita Deshmukh** is the Head of Human Resources (HR Head), **Divya Swaminathan** is the HR Manager for Talent Acquisition / Recruitment, and **Tanya Kapoor** is the Assistant HR Manager for Payroll & Welfare.
7. Keep answers concise, highly engaging, beautifully formatted with markdown bullet points, bold headings, and actionable next steps.`;

  cachedSystemPrompt = {
    prompt: basePrompt,
    expiresAt: now + 3 * 60 * 1000, // 3 minutes TTL
  };

  return basePrompt + (pageContext ? `\n\nUSER'S CURRENT VIEW:\nStudent is currently browsing: ${pageContext}` : '');
}

/**
 * Intelligent domain knowledge fallback engine.
 * Guarantees immediate, accurate, and distinct answers tailored to the user's specific query
 * even if the external LLM provider experiences an unexpected network or quota outage.
 */
function getIntelligentFallbackResponse(userQuery: string): string {
  const q = userQuery.toLowerCase().trim();

  // 1. Beginner Roadmap / 4-month tech roadmap / Non-IT transition
  if (
    q.includes('beginner') ||
    q.includes('roadmap') ||
    q.includes('non-it') ||
    q.includes('non tech') ||
    q.includes('switch') ||
    q.includes('arts') ||
    q.includes('commerce') ||
    q.includes('mechanical') ||
    q.includes('fresher') ||
    q.includes('4-month') ||
    q.includes('month roadmap')
  ) {
    return `### 🎓 4-Month Beginner-to-Job-Ready Tech Roadmap

Over **60% of our successful alumni** transition from non-IT backgrounds (commerce, arts, mechanical, civil, or freshers). Here is the structured 4-month path to get hired:

- **Month 1: Fundamentals & Bridge Module (Ground Zero)**
  - Web & Programming basics: HTML5 semantic structure, CSS3 Flexbox/Grid, Modern JavaScript (ES6+), Git & GitHub collaboration.
  - *No prior coding knowledge needed — daily mentor-guided hands-on labs.*
- **Month 2: Frontend Engineering & Interactive Web Apps**
  - Modern React 19, TypeScript, TailwindCSS, State Management, and REST API integration.
  - Build 2 production capstone frontend applications.
- **Month 3: Full Stack Backend & Cloud Databases**
  - Node.js, Express, PostgreSQL / MongoDB, Prisma ORM, Authentication (JWT), and Docker containers.
  - Build a secure end-to-end full-stack SaaS platform.
- **Month 4: Capstone Portfolio, Placement Sprint & Mock Interviews**
  - Deploy to AWS / Vercel, CI/CD pipelines, System Design basics.
  - Dedicated resume reviews, LinkedIn profile makeover, and 1-on-1 mock interviews with senior industry engineers.

👉 **100% Placement Assistance:** Weekly hiring drives with 500+ partner companies.

Would you like to schedule a free 1-on-1 session with a counselor to map out this journey for your background?`;
  }

  // 2. Fees & Scholarship discounts
  if (
    q.includes('fee') ||
    q.includes('cost') ||
    q.includes('price') ||
    q.includes('scholarship') ||
    q.includes('discount') ||
    q.includes('emi') ||
    q.includes('35%')
  ) {
    return `### 💰 Course Fees & Up to 35% Scholarship Discount

We believe quality tech education should be transparent and accessible. Here is our standard fee structure and how you can avail scholarship discounts:

#### 📚 Popular Program Fees:
- **Full Stack Web Development (4-6 Mos):** Standard Fee: ₹65,000 | *Limited Offer: ₹52,000*
- **Cloud DevOps & SRE (4 Mos):** Standard Fee: ₹75,000 | *Limited Offer: ₹59,000*
- **Applied Data Science & AI (6 Mos):** Standard Fee: ₹85,000 | *Limited Offer: ₹68,000*
- **Cybersecurity & Ethical Hacking (4 Mos):** Standard Fee: ₹65,000 | *Limited Offer: ₹54,000*
- **UI/UX Product Design (3 Mos):** Standard Fee: ₹50,000 | *Limited Offer: ₹38,000*

---

#### 🎓 How to Claim Up to 35% Merit Scholarship:
1. **Book a Free Counselling Session:** Express your interest online or call our admissions desk.
2. **Take the Apex Tech Aptitude Assessment:** A 30-minute online test assessing basic analytical and logical reasoning (no coding required).
3. **Scholarship Tiers:**
   - **Score 80%+:** Qualifies for **Tier 1 (35% Fee Waiver)**
   - **Score 70% - 79%:** Qualifies for **Tier 2 (25% Fee Waiver)**
   - **Early-Bird / Women in Tech:** Additional 10% grant.
4. **Flexible No-Cost EMI:** Available in 3, 6, and 9-month installments with 0% interest through our education banking partners.

Would you like to schedule your **free scholarship aptitude assessment** or discuss flexible EMI options?`;
  }

  // 3. Highest CTC / Salary / Placement packages / Hiring Partners
  if (
    q.includes('placement') ||
    q.includes('salary') ||
    q.includes('package') ||
    q.includes('ctc') ||
    q.includes('lpa') ||
    q.includes('highest') ||
    q.includes('hiring partner') ||
    /\b(hiring|hired)\b/i.test(q)
  ) {
    return `### 🚀 Top Placement Salary Packages & Hiring Partner Demand at Apex

At **Apex Tech Institute**, all programs come with **100% Dedicated Placement Assistance**. Here are the courses offering the highest placement packages and greatest hiring demand:

1. **Applied Data Science & AI/ML**
   - **Highest Package:** **₹24.0 LPA** | **Average:** ₹9.2 LPA
   - **Hiring Demand:** ⭐⭐⭐⭐⭐ (Skyrocketing demand in GenAI, predictive modeling, and analytics).
   - **Top Hiring Roles:** AI Engineer, Data Scientist, ML Ops Specialist.

2. **Full Stack Web Development (MERN + Next.js)**
   - **Highest Package:** **₹18.0 LPA** | **Average:** ₹8.4 LPA
   - **Hiring Demand:** ⭐⭐⭐⭐⭐ (High-volume hiring across top product startups & global IT enterprises).
   - **Top Hiring Roles:** Full Stack Developer, Frontend Architect, Backend Engineer.

3. **Cloud DevOps & SRE (AWS, Kubernetes, Docker)**
   - **Highest Package:** **₹16.5 LPA** | **Average:** ₹8.8 LPA
   - **Hiring Demand:** ⭐⭐⭐⭐⭐ (Critical demand for cloud migrations and infrastructure automation).
   - **Top Hiring Roles:** DevOps Engineer, Cloud Architect, Site Reliability Engineer.

4. **Cybersecurity & Ethical Hacking**
   - **Highest Package:** **₹15.0 LPA** | **Average:** ₹7.9 LPA
   - **Hiring Demand:** ⭐⭐⭐⭐ (Rapidly expanding enterprise security teams).

🏢 **Our Hiring Network:** 500+ hiring partners including **Amazon, Flipkart, Swiggy, Razorpay, Infosys, TCS, Accenture, and Capgemini**.
💼 **Placement Services:** 1-on-1 resume reviews, GitHub portfolio building, 10+ mock technical interviews, and direct referral drives.

Would you like to review the complete syllabus for one of these tracks or book a **Free 1-on-1 Career Counselling Session**?`;
  }

  // 4. Batch timings / Weekend vs Weekday / Mode of study
  if (
    q.includes('batch') ||
    q.includes('timing') ||
    q.includes('weekend') ||
    q.includes('weekday') ||
    q.includes('schedule') ||
    q.includes('online') ||
    q.includes('classroom') ||
    q.includes('offline')
  ) {
    return `### ⏱️ Batch Timings & Flexible Learning Modes

At Apex Tech Institute, we offer flexible learning tracks tailored for college students, job seekers, and working professionals:

#### 1. Regular Weekday Batches (Mon – Fri)
- **Morning Track:** 9:30 AM – 1:30 PM (Lectures + 2-hr Guided Coding Labs)
- **Evening Track:** 6:00 PM – 8:30 PM (Ideal for working professionals)

#### 2. Working Professional Weekend Batches (Sat & Sun)
- **Timings:** 10:00 AM – 4:00 PM (Deep-dive workshops, architecture labs & mentor office hours)
- Self-paced weekly project assignments with 24/7 Slack / Discord mentor support.

#### 3. Modes of Learning:
- **Classroom Offline:** HSR Layout (Bangalore HQ), Marathahalli, Rajajinagar, Electronic City.
- **Live Interactive Online:** Real-time Zoom/Meet sessions with dual-screen code-along labs and recorded archives.
- **Hybrid:** Attend offline on weekends, live online on weekdays.

All classes are recorded in HD and available on our student portal for lifetime access! Would you like to reserve a seat in the upcoming batch?`;
  }

  // 5. Upcoming Events / Workshops / Webinars / Masterclasses
  if (
    q.includes('event') ||
    q.includes('webinar') ||
    q.includes('workshop') ||
    q.includes('masterclass')
  ) {
    return `### 📅 Upcoming Masterclasses & Free Weekend Workshops

Join our complimentary live sessions led by industry architects from top tech companies:

1. **Full Stack Next.js & AI Web Apps Masterclass**
   - **Date & Time:** Upcoming Saturday, 11:00 AM – 1:00 PM IST
   - **Format:** Live Interactive Online + HSR Campus Lab
   - **Takeaways:** Building modern Full-Stack apps with Next.js 14, Tailwind, and LLM APIs.

2. **From Non-IT to Cloud & DevOps: Real-World Transition Guide**
   - **Date & Time:** Upcoming Sunday, 3:00 PM – 5:00 PM IST
   - **Format:** Live Interactive Webinar
   - **Takeaways:** How to transition into DevOps with Docker, Kubernetes, and AWS without a CS degree.

3. **Career Clarity & Placement Strategy Workshop**
   - **Date & Time:** Every Weekend (Saturday & Sunday, 10:00 AM)
   - **Takeaways:** Resume optimization, mock technical interview breakdown, and portfolio design.

All masterclasses are **100% Free** with certificate of participation provided! Click **Events** in the menu or contact us at **+91 9876543210** to reserve your spot.`;
  }

  // 6. Free Demo Class / Booking / Counseling
  if (
    q.includes('demo') ||
    q.includes('book') ||
    q.includes('trial') ||
    q.includes('counsel')
  ) {
    return `### 📞 How to Book Your 100% Free Demo & Career Counselling Session

Booking a free session is quick and carries zero commitment:

1. **Option A (Instant Online Booking):** Click the **"Free Demo"** button on the top navigation bar or submit our quick enquiry form.
2. **Option B (Direct Phone / WhatsApp):** Call or message our admissions counselors directly at **+91 9876543210**.
3. **Option C (Campus Walk-in):** Visit our flagship campus at **Apex Tower, Outer Ring Road, HSR Layout, Bangalore** (Mon – Sat: 9:00 AM – 8:00 PM).

#### What to Expect in the Free Session:
- 🎯 **1-on-1 Career Evaluation:** Analysis of your education, skillset, and career aspirations.
- 💻 **Live Curriculum Walkthrough:** Real-world project demos and cloud lab preview.
- 📊 **Salary Roadmap & Placement Insights:** Current market hiring data and placement timeline.
- 🎓 **Scholarship Assessment:** Instant eligibility check for up to 35% fee discount.

Shall I help you connect with our senior counselor today?`;
  }

  // 7. Full Stack Web Development specific
  if (q.includes('full stack') || q.includes('mern') || q.includes('next') || q.includes('react') || q.includes('web')) {
    return `### 🌟 Full Stack Web Development Masterclass (MERN & Next.js)

Our flagship development track prepares you for high-paying roles as a Full Stack Engineer:
- **Duration:** 4 to 6 Months (Flexible Weekday / Weekend batches)
- **Tech Stack:** React 19, Next.js, Node.js, Express, TypeScript, PostgreSQL, Prisma, MongoDB, TailwindCSS, Docker & AWS deployment.
- **Projects:** 4 Production Capstones (E-Commerce Platform, Real-time Collaborative Tool, Microservices Backend, AI SaaS Application).
- **Placement Outcome:** Average package **₹8.4 LPA** with top packages up to **₹18.0 LPA**.
- **Fee:** ₹65,000 (*Early bird offer: ₹52,000 with up to 35% scholarship available*).

👉 Would you like to check the detailed curriculum or book a **Free Demo Session**?`;
  }

  // 8. Data Science & AI/ML specific
  if (q.includes('data') || q.includes('ai') || q.includes('ml') || q.includes('machine learning') || q.includes('python')) {
    return `### 🤖 Applied Data Science & AI/ML Mastery

Accelerate your career in the highest-paying tech domain:
- **Duration:** 6 Months (Live interactive & hybrid batches)
- **Tech Stack:** Python, Pandas, NumPy, Scikit-Learn, Deep Learning, PyTorch, Generative AI (LLMs, RAG, Prompt Engineering), SQL & Tableau.
- **Projects:** 12+ Hands-on industry case studies with cloud GPU lab access.
- **Placement Outcome:** Average package **₹9.2 LPA** with top packages up to **₹24.0 LPA** (highest at Apex).
- **Fee:** ₹85,000 (*Limited offer: ₹68,000 with up to 35% scholarship available*).

👉 Would you like to explore the syllabus or discuss transition pathways for non-programmers?`;
  }

  // 9. Cloud DevOps & SRE specific
  if (q.includes('cloud') || q.includes('devops') || q.includes('aws') || q.includes('docker') || q.includes('kubernetes') || q.includes('sre')) {
    return `### ☁️ Cloud DevOps & SRE Engineering

Master modern cloud infrastructure and continuous delivery:
- **Duration:** 4 Months (Weekday / Weekend batches)
- **Tech Stack:** AWS, Docker, Kubernetes, Terraform (IaC), Jenkins, GitHub Actions CI/CD, Prometheus & Grafana monitoring, Linux administration.
- **Hands-on Labs:** Live enterprise cloud infrastructure deployment on AWS.
- **Placement Outcome:** Average package **₹8.8 LPA** with top packages up to **₹16.5 LPA**.
- **Fee:** ₹75,000 (*Offer: ₹59,000 with up to 35% scholarship available*).

👉 Would you like to view the certification readiness breakdown or book a demo class?`;
  }

  // 10. HR & Human Resources Directory
  if (
    /\b(hr|human resources?|recruiter|recruitment|talent acquisition|payroll|posh)\b/i.test(q)
  ) {
    return `### 👥 Human Resources (HR) Department at Apex Tech Institute

At Apex Tech Institute, the Human Resources department is headed by:

- **Head of Human Resources (HR Head):** **Sunita Deshmukh**
  - **Email:** sunita.d@apexbangalore.in
  - **Desk Extension:** Ext. 301
  - **Location:** HSR Layout Headquarters (Sector 1, Bangalore)
  - **Core Responsibilities:** Oversees institutional HR policy, recruitment guidelines, compensation scales, labor law compliance, and chairs the POSH / Internal Grievance committee.

- **HR Manager – Talent Acquisition & Recruitment:** **Divya Swaminathan**
  - **Email:** divya.s@apexbangalore.in
  - **Desk Extension:** Ext. 302
  - **Responsibilities:** Leads technical trainer recruitment, instructor screening, interview coordination, and onboarding.

- **Assistant HR Manager – Payroll & Welfare:** **Tanya Kapoor**
  - **Email:** tanya.k@apexbangalore.in
  - **Desk Extension:** Ext. 303
  - **Responsibilities:** Monthly employee payroll, health benefits, attendance, and staff welfare.

Would you like to connect with our HR team or explore open trainer & staff positions?`;
  }

  // 11. Executive Leadership Team
  if (
    /\b(ceo|coo|md|founder|director|leadership)\b/i.test(q)
  ) {
    return `### 🏛️ Executive Leadership Team at Apex Tech Institute

- **Founder & Managing Director (MD):** **Dr. Arvind R. Singhania** (Ext: 101 | arvind.singhania@apexbangalore.in)
- **Chief Executive Officer (CEO):** **Rajeshwari K. Nair** (Ext: 102 | rajeshwari.nair@apexbangalore.in)
- **Chief Operating Officer (COO):** **Vikramaditya Sen** (Ext: 103 | vikram.sen@apexbangalore.in)
- **Head of Human Resources (HR Head):** **Sunita Deshmukh** (Ext: 301 | sunita.d@apexbangalore.in)
- **Head of Academics & Delivery:** **Prof. Harishankar Murthy** (Ext: 201 | h.murthy@apexbangalore.in)
- **Head of Placements:** **Ananya Roy** (Ext: 202 | ananya.roy@apexbangalore.in)

How can I assist you with our leadership or academic tracks today?`;
  }

  // 12. Default helpful response
  return `### 👋 Welcome to Apex Tech Institute Career Advisory!

I am **ApexBot**, your personal AI Academic Counselor. Here are the most popular topics students explore with me:

1. **🚀 Highest Salary Packages & Placements:** Learn how our graduates secure packages up to **₹24.0 LPA** across 500+ hiring partners.
2. **💰 Course Fees & 35% Scholarship:** Get complete fee details, merit discounts, and zero-interest EMI plans.
3. **🎓 Beginner & Non-IT Career Roadmaps:** Step-by-step guidance for switching into tech from any background.
4. **⏱️ Batch Timings & Learning Modes:** Explore weekday, weekend, offline classroom, and live online tracks.
5. **📞 100% Free 1-on-1 Demo Session:** Experience our live classes and personalized mentor counseling.

What area would you like to explore first?`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pageContext } = body;
    let chatMessages: ChatMessage[] = [];
    if (Array.isArray(body.messages) && body.messages.length > 0) {
      chatMessages = body.messages;
    } else if (typeof body.message === 'string' && body.message.trim()) {
      chatMessages = [{ role: 'user', content: body.message.trim() }];
    }

    if (chatMessages.length === 0) {
      return NextResponse.json(
        { reply: 'How can I assist you today with Apex Training Institute courses or counseling?', success: true },
        { status: 200 }
      );
    }

    const lastUserMsgObj = chatMessages[chatMessages.length - 1];
    const lastUserQuery = (lastUserMsgObj?.content || '').trim();

    // 1. Check personnel security guard for queries about unlisted private individuals
    if (isCompanyPersonnelQuery(lastUserQuery)) {
      try {
        const guardCheck = await resolveCompanyDirectoryRAG(lastUserQuery);
        if (guardCheck.isCompanyQuery && !guardCheck.found) {
          return NextResponse.json({
            reply: 'There is no such information available to your query.',
            model: 'chromadb-vector-rag',
            success: true,
          });
        }
      } catch (guardErr) {
        console.warn('Personnel security guard check:', guardErr);
      }
    }

    // 2. Dynamic RAG: Retrieve context from ChromaDB Vector Database
    let ragContextText = '';
    let ragSources: ChromaSearchResult[] = [];
    try {
      const chromaResults = await queryChromaDB(lastUserQuery, 3);
      if (Array.isArray(chromaResults) && chromaResults.length > 0) {
        const relevant = chromaResults.filter((r) => r.distance <= 1.25);
        if (relevant.length > 0) {
          ragSources = relevant;
          ragContextText = relevant
            .map((r, i) => `[Source ${i + 1} (${r.metadata?.category || 'fact'})]: ${r.text}`)
            .join('\n\n');
        }
      }
    } catch (ragErr) {
      console.warn('ChromaDB RAG search notice:', ragErr);
    }

    // 3. Fetch base system instruction and augment with dynamic RAG context
    const baseInstruction = await getCachedSystemInstruction(pageContext);
    let fullSystemInstruction = baseInstruction;
    if (ragContextText) {
      fullSystemInstruction += `\n\n=== RETRIEVED OFFICIAL APEX KNOWLEDGE BASE (RAG CONTEXT) ===\nUse the following official records and verified facts from the vector database to ground your answer with 100% accuracy:\n${ragContextText}\n=============================================================`;
    }

    // 4. Format conversation history for Gemini API
    const geminiContents: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];
    const filteredMessages = chatMessages.filter((m) => m.content && m.content.trim() !== '');

    for (let i = 0; i < filteredMessages.length; i++) {
      const msg = filteredMessages[i];
      const role: 'user' | 'model' =
        msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user';

      const prev = geminiContents[geminiContents.length - 1];
      if (prev && prev.role === role) {
        prev.parts[0].text += `\n\n${msg.content}`;
      } else {
        geminiContents.push({
          role,
          parts: [{ text: msg.content }],
        });
      }
    }

    if (geminiContents.length > 0 && geminiContents[0].role === 'model') {
      geminiContents.shift();
    }

    if (geminiContents.length === 0) {
      return NextResponse.json(
        { error: 'No valid user messages provided.' },
        { status: 400 }
      );
    }

    // 5. Invoke Gemini LLM with dynamic RAG context and 6500ms budget
    let selectedModel = '';
    let responseText = '';

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6500); // 6.5s generous budget

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: fullSystemInstruction }],
            },
            contents: geminiContents,
            generationConfig: {
              temperature: 0.65,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 600,
            },
          }),
        });

        clearTimeout(timeoutId);
        const data = await res.json();

        if (res.ok && data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          responseText = data.candidates[0].content.parts[0].text;
          selectedModel = modelName;
          break;
        } else {
          continue;
        }
      } catch {
        continue;
      }
    }

    // 6. Return dynamic Gemini LLM response
    if (responseText) {
      return NextResponse.json({
        reply: responseText,
        model: selectedModel,
        ragRetrieved: ragSources.length > 0,
        success: true,
      });
    }

    // 7. If external LLM is temporarily unreachable, respond via intelligent knowledge engine
    console.warn('Serving intelligent instant domain response for query:', lastUserQuery);
    const instantReply = getIntelligentFallbackResponse(lastUserQuery);
    return NextResponse.json({
      reply: instantReply,
      model: 'apex-knowledge-engine',
      success: true,
    });
  } catch (err: any) {
    console.error('Chat API Error:', err);
    return NextResponse.json({
      reply: "Welcome to Apex Tech Institute! I am here to help you explore our high-impact training tracks, curriculum, batch timings, fees, and career placement services. What would you like to know?",
      model: 'apex-safety-guard',
      success: true,
    });
  }
}

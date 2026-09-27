import { NextRequest, NextResponse } from 'next/server';
import { getDomains, getCourses, getEvents, getSiteSettings } from '@/lib/store';
import { resolveCompanyDirectoryRAG, isCompanyPersonnelQuery } from '@/lib/chromaRAG';

export const dynamic = 'force-dynamic';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Verified ultra-fast & high-availability Gemini models in order of speed and stability
const CANDIDATE_MODELS = [
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite',
  'gemma-4-26b-a4b-it',
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-flash-latest',
];

interface ChatMessage {
  role: 'user' | 'assistant' | 'model' | 'system';
  content: string;
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

    // 1. Company Personnel & Directory RAG (ChromaDB Vector Database)
    // If the query asks for company personnel, leadership, HR, branch managers, or directory details:
    if (isCompanyPersonnelQuery(lastUserQuery)) {
      try {
        const ragResult = await resolveCompanyDirectoryRAG(lastUserQuery);
        if (ragResult.isCompanyQuery) {
          if (!ragResult.found || !ragResult.answer) {
            // Strictly respond as requested if details are not available
            return NextResponse.json({
              reply: 'There is no such information available to your query.',
              model: 'chromadb-vector-rag',
              success: true,
            });
          }

          return NextResponse.json({
            reply: ragResult.answer,
            model: 'chromadb-vector-rag',
            success: true,
          });
        }
      } catch (ragErr) {
        console.warn('ChromaDB RAG query handled safely:', ragErr);
        return NextResponse.json({
          reply: 'There is no such information available to your query.',
          model: 'chromadb-vector-rag',
          success: true,
        });
      }
    }

    // 2. Website-related answers come strictly through LLM only (Gemini)
    // Gather dynamic institute context for dynamic knowledge
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

    const systemInstruction = `You are "ApexBot", the intelligent, friendly, and expert Senior Academic Counselor and Career Advisor for Apex Tech Institute (premier EdTech & career transformation institute in Bangalore, India).

INSTITUTE INFORMATION:
- Name: Apex Tech Institute
- Contact Phone / WhatsApp: ${settings?.phone || '+91 9876543210'}
- Email: ${settings?.email || 'contact@apexinstitute.com'}
- Campus Address: ${settings?.address || 'Apex Tower, Outer Ring Road, HSR Layout, Bangalore 560102'}
- Hours: ${settings?.workingHours || 'Mon - Sat: 9:00 AM - 8:00 PM'}
- Placement Guarantee: 100% Dedicated Placement Assistance, 500+ hiring partner companies (top product startups & global IT MNCs), resume reviews, mock interviews, portfolio projects. Over 94% placement rate with ₹8.4 LPA average package.
- Learning Modes: Classroom Offline at Bangalore, Live Interactive Online, and Flexible Weekend Batches for working professionals.
- Scholarships: Up to 35% merit and early-bird scholarship discounts available.
- Demo Sessions: Students can book a 100% Free 1-on-1 Career Counselling & Demo Session.

UPCOMING EVENTS & WORKSHOPS:
${eventSummaries}

AVAILABLE CAREER DOMAINS:
${domainSummaries || 'Full Stack Web Dev, Cloud & DevOps, Data Science & AI, Cybersecurity, UI/UX Design, Mobile App Dev, QA Automation, Blockchain, Embedded & IoT, Product Management'}

FEATURED POPULAR COURSES:
${courseSummaries}

USER'S CURRENT VIEW / PAGE CONTEXT:
${pageContext ? `Student is currently browsing: ${pageContext}` : 'General website visit'}

COUNSELING GUIDELINES:
1. Always generate fresh, direct, personalized, and context-specific answers tailored exactly to what the user asked. NEVER repeat a static generic answer.
2. If the user asks about upcoming events, webinars, or workshops:
   - Present the upcoming events clearly with their dates, timings, speakers, and topics from the UPCOMING EVENTS & WORKSHOPS list above.
   - Explain that introductory sessions and masterclasses are 100% free to attend.
   - Offer to help them register or book a free 1-on-1 career counselling demo session.
3. If the user introduces themselves (e.g., "vageesha"), greet them warmly and respectfully by their name.
4. If the user mentions coming from a "non-IT", "non-technical", "arts", "commerce", or "mechanical" background:
   - Reassure them with high confidence! Over 60% of successful tech bootcampers come from non-IT backgrounds.
   - Explain that Apex provides foundational bridge modules from ground zero (no coding prerequisites required).
   - Recommend 2-3 ideal transition pathways: Full Stack Web Development, UI/UX Design, or Data Analytics.
5. Structure your answers cleanly with markdown (bullet points, bold text, concise sections). Keep the tone warm, inspiring, expert, and actionable.`;

    // 2. Format conversation history for Gemini API
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

    // 3. Try models in cascade order with generous timeout per model
    let lastError: any = null;
    let selectedModel = '';
    let responseText = '';

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4500);

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: systemInstruction }],
            },
            contents: geminiContents,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1400,
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
          lastError = data.error || { message: `Status ${res.status}` };
          continue;
        }
      } catch (err: any) {
        lastError = err;
        continue;
      }
    }

    if (!responseText) {
      console.warn('Gemini models unavailable, engaging intelligent rule-based counselor response:', lastError);
      // Contextual fallback response so the user is never left without answers
      const lastUserMsg = (filteredMessages[filteredMessages.length - 1]?.content || '').toLowerCase();
      
      let contextualAdvice = 'Welcome to **Apex Tech Institute**! 🚀\n\nWe provide 100% placement-backed bootcamps led by senior industry engineers across 10 in-demand domains.';
      
      if (lastUserMsg.includes('full stack') || lastUserMsg.includes('web') || lastUserMsg.includes('react')) {
        contextualAdvice = `### 🌟 Full Stack Web Development at Apex\n\nOur **Full Stack MERN & Next.js Masterclass** is our flagship training track:\n- **Duration:** 4-6 Months (Live interactive & hybrid batches)\n- **Curriculum:** React 19, Next.js, Node.js, TypeScript, PostgreSQL & Cloud Deployment\n- **Outcome:** 100% dedicated placement support with hiring partners offering 6-18 LPA packages.\n\n👉 [Explore Full Stack Bootcamp](/courses/full-stack-mern-nextjs-masterclass) or claim your **Free 1-on-1 Demo Session**!`;
      } else if (lastUserMsg.includes('data') || lastUserMsg.includes('ai') || lastUserMsg.includes('python')) {
        contextualAdvice = `### 🤖 Data Science & AI/ML Mastery\n\nOur **Applied Data Science & Machine Learning** program is designed for real-world impact:\n- **Curriculum:** Python, Pandas, Scikit-Learn, Deep Learning, PyTorch & Generative AI\n- **Capstone Projects:** 12+ industry case studies with cloud GPU labs.\n- **Placement Rate:** 94%+ placement success.\n\n👉 [Explore Data Science Track](/courses/applied-data-science-machine-learning) or schedule your counselling call!`;
      } else {
        contextualAdvice = `### Welcome to Apex Career Counseling!\n\nHere are our most popular programs for high-growth tech careers:\n1. **Full Stack Web Development** (MERN, Next.js, TypeScript)\n2. **Cloud DevOps & SRE** (AWS, Docker, Kubernetes, CI/CD)\n3. **Applied Data Science & AI/ML** (Python, Predictive Models, GenAI)\n4. **Cybersecurity & Ethical Hacking** (SOC, Penetration Testing)\n\n💼 All courses include **100% Placement Assistance**, mock interviews, and project portfolio reviews.\n\nWould you like guidance on transitioning into tech or choosing the right track for your background?`;
      }

      return NextResponse.json({
        reply: contextualAdvice,
        model: 'apex-knowledge-engine',
        success: true,
      });
    }

    return NextResponse.json({
      reply: responseText,
      model: selectedModel,
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

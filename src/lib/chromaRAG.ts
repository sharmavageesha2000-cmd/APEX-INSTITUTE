import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import directoryDocs from './company_directory_rag.json';

const execAsync = promisify(exec);

export interface ChromaSearchResult {
  id: string;
  text: string;
  metadata: Record<string, any>;
  distance: number;
}

export interface RAGAnswerResult {
  isCompanyQuery: boolean;
  found: boolean;
  answer?: string;
  sourceDocs?: ChromaSearchResult[];
}

// Known valid personnel in Apex Directory
export const VALID_PERSONNEL = [
  { name: 'Dr. Arvind R. Singhania', keys: ['arvind', 'singhania', 'managing director', 'founder', 'co-founder'] },
  { name: 'Rajeshwari K. Nair', keys: ['rajeshwari', 'nair', 'chief executive', 'ceo'] },
  { name: 'Vikramaditya Sen', keys: ['vikramaditya', 'sen', 'chief operating', 'coo'] },
  { name: 'Sunita Deshmukh', keys: ['sunita', 'deshmukh', 'hr head', 'head of hr', 'human resources head', 'posh head', 'hr', 'human resources', 'human resource', 'head hr', 'hr lead'] },
  { name: 'Divya Swaminathan', keys: ['divya', 'swaminathan', 'talent acquisition head', 'recruitment head', 'recruiter', 'recruitment', 'talent acquisition', 'hr manager', 'hiring manager'] },
  { name: 'Tanya Kapoor', keys: ['tanya', 'kapoor', 'payroll manager', 'payroll', 'welfare manager', 'assistant hr manager'] },
  { name: 'Prof. Harishankar Murthy', keys: ['harishankar', 'murthy', 'academic director', 'head of academics'] },
  { name: 'Ananya Roy', keys: ['ananya', 'roy', 'placement head', 'head of placements', 'corporate relations head'] },
  { name: 'Dr. Farhan Akhtar Qureshi', keys: ['farhan', 'qureshi', 'head of it', 'it head', 'infrastructure head'] },
  { name: 'Karthik Subramanian', keys: ['karthik', 'subramanian', 'head of marketing', 'admissions head'] },
  { name: 'Pradeep V. Kulkarni', keys: ['pradeep', 'kulkarni', 'central operations manager', 'operations manager'] },
  { name: 'Amitav Roy Choudhury', keys: ['amitav', 'choudhury', 'facility manager', 'procurement manager'] },
  { name: 'Vidyadhar Hegde', keys: ['vidyadhar', 'hegde', 'hsr center manager', 'hsr manager', 'headquarters manager'] },
  { name: 'Suresh Babu M.', keys: ['suresh babu', 'marathahalli manager', 'marathahalli head'] },
  { name: 'Manjunath Swamy', keys: ['manjunath', 'swamy', 'rajajinagar manager', 'rajajinagar head'] },
  { name: 'Deepak Chawla', keys: ['deepak', 'chawla', 'electronic city manager', 'electronic city head'] },
  { name: 'Sanjay Rathore', keys: ['sanjay', 'rathore', 'jabalpur manager', 'jabalpur head'] },
];

export const VALID_ROLES = [
  'managing director', 'md', 'founder', 'co-founder',
  'chief executive officer', 'ceo', 'chief executive',
  'chief operating officer', 'coo', 'chief operating',
  'head of human resources', 'hr head', 'head of hr', 'human resources head', 'hr', 'human resources', 'human resource', 'hr manager', 'head hr',
  'talent acquisition', 'recruitment', 'recruiter', 'bgv', 'hiring',
  'payroll', 'employee welfare', 'payroll manager',
  'head of academics', 'academics & delivery', 'trainer quality', 'academic director',
  'head of placements', 'corporate relations', 'placements head', 'placement head',
  'head of it', 'it & infrastructure', 'infrastructure head', 'it head',
  'head of marketing', 'student counseling', 'counseling head',
  'central operations manager', 'operations manager', 'campus operations',
  'procurement & facility manager', 'procurement manager', 'facility manager',
  'center manager', 'branch operations head', 'branch manager', 'regional center head'
];

export const VALID_BRANCHES = [
  'hsr', 'hsr layout', 'outer ring road', 'marathahalli', 'rajajinagar', 'electronic city', 'jabalpur'
];

// Common roles that do NOT exist in the document
const INVALID_ROLES = [
  'cfo', 'chief financial officer', 'cto', 'chief technology officer', 'cmo', 'chief marketing officer',
  'vice president', 'vp', 'legal counsel', 'general counsel'
];

/**
 * Checks if the user message is asking for company personnel, leadership, branch head,
 * personal details, or official company directory info.
 */
export function isCompanyPersonnelQuery(query: string): boolean {
  const q = query.toLowerCase().trim();

  // Explicit personnel / company directory inquiries
  if (
    q.includes('personal detail') ||
    q.includes('personnel detail') ||
    q.includes('employee detail') ||
    q.includes('staff detail') ||
    q.includes('contact detail') ||
    q.includes('company personal') ||
    q.includes('company personnel') ||
    q.includes('leadership team') ||
    q.includes('board of director') ||
    q.includes('executive board')
  ) {
    return true;
  }

  // Headquarters / working hours / official contact inquiries
  if (
    q.includes('headquarters') ||
    q.includes('head office') ||
    q.includes('working hours') ||
    q.includes('operating hours') ||
    q.includes('official email') ||
    q.includes('central helpline') ||
    q.includes('facilities at hsr')
  ) {
    return true;
  }

  // Common persona questions: "who is ...", "who runs ...", "who leads ...", "who manages ...", "who heads ..."
  if (/^who\s+(is|are|was|runs|leads|manages|heads)\s+/i.test(q)) {
    return true;
  }

  // Branch manager queries: "branch manager", "center manager", "who heads <branch>"
  if (q.includes('branch manager') || q.includes('center manager') || q.includes('branch head')) {
    return true;
  }

  // Specific leadership titles and HR inquiries (e.g. "hr name", "who is hr", "hr details", "recruiter", etc.)
  if (
    /\b(hr|human resources?|recruiter|recruitment|talent acquisition|payroll|posh)\b/i.test(q) ||
    /\b(ceo|coo|md|founder|director)\b/i.test(q) ||
    q.includes('managing director') ||
    q.includes('hr head') || q.includes('head of hr') ||
    q.includes('talent acquisition') ||
    q.includes('payroll')
  ) {
    return true;
  }

  // Name inquiries with role or personnel: "what is the name of hr", "name of ceo", "tell me hr name", etc.
  if (
    (q.includes('name') || q.includes('who') || q.includes('tell') || q.includes('give') || q.includes('what')) &&
    (/\b(hr|recruiter|ceo|coo|md|director|manager|founder|academics|placement|head)\b/i.test(q) ||
      VALID_ROLES.some(r => q.includes(r)))
  ) {
    return true;
  }

  // Contact/ext queries: "email of ...", "phone number of ...", "extension of ...", "mobile number of ..."
  if (
    q.includes('email of') ||
    q.includes('phone number of') ||
    q.includes('extension of') ||
    q.includes('desk ext') ||
    q.includes('mobile number of') ||
    q.includes('contact of') ||
    q.includes("'s mobile") ||
    q.includes("'s phone") ||
    q.includes("'s email") ||
    q.includes("'s contact")
  ) {
    return true;
  }

  // Specific known names
  for (const p of VALID_PERSONNEL) {
    for (const k of p.keys) {
      if (k.length > 3 && q.includes(k)) return true;
    }
  }

  return false;
}

/**
 * Primary vector query against local ChromaDB service (runs on port 8008).
 * Falls back to CLI query, and then JSON semantic search if service is unavailable.
 */
export async function queryChromaDB(queryText: string, nResults: number = 3): Promise<ChromaSearchResult[]> {
  const cleanQuery = queryText.trim();
  if (!cleanQuery) return [];

  // Level 1: Fast HTTP query to local ChromaDB service
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const res = await fetch('http://127.0.0.1:8008/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: cleanQuery, n_results: nResults }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.results) && data.results.length > 0) {
        return data.results;
      }
    }
  } catch (httpErr) {
    // Continue to fallback
  }

  // Level 2: Direct CLI query via python scripts/query_chromadb.py
  try {
    const scriptPath = path.resolve(process.cwd(), 'scripts', 'query_chromadb.py');
    if (fs.existsSync(scriptPath)) {
      const sanitized = cleanQuery.replace(/"/g, '\\"');
      const { stdout } = await execAsync(`python "${scriptPath}" "${sanitized}"`, {
        timeout: 3000,
        windowsHide: true,
      });

      if (stdout) {
        const parsed = JSON.parse(stdout.trim());
        if (Array.isArray(parsed.results) && parsed.results.length > 0) {
          return parsed.results;
        }
      }
    }
  } catch (cliErr) {
    // Continue to Level 3
  }

  // Level 3: Bundled in-memory knowledge fallback
  try {
    const docs = directoryDocs as any[];
    if (Array.isArray(docs) && docs.length > 0) {
      const queryTokens = cleanQuery.toLowerCase().split(/\s+/).filter((t) => t.length > 2);

      const scored = docs.map((doc: any) => {
        const text = (doc.text + ' ' + (doc.title || '') + ' ' + JSON.stringify(doc.metadata || {})).toLowerCase();
        let matchCount = 0;
        for (const token of queryTokens) {
          if (text.includes(token)) {
            matchCount++;
          }
        }
        const score = queryTokens.length > 0 ? matchCount / queryTokens.length : 0;
        return {
          id: doc.id,
          text: doc.text,
          metadata: doc.metadata,
          distance: 1.0 - score, // simulated distance
        };
      });

      scored.sort((a: any, b: any) => a.distance - b.distance);
      return scored.slice(0, nResults);
    }
  } catch (jsonErr) {
    // Silent fail
  }

  return [];
}

/**
 * Resolves a company personnel/directory query using ChromaDB RAG.
 * If details are not available, strictly responds:
 * "There is no such information available to your query."
 */
export async function resolveCompanyDirectoryRAG(userQuery: string): Promise<RAGAnswerResult> {
  const isCompany = isCompanyPersonnelQuery(userQuery);
  if (!isCompany) {
    return { isCompanyQuery: false, found: false };
  }

  const qLower = userQuery.toLowerCase();

  // Helper for word boundary check
  const hasWord = (str: string, term: string) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i').test(str);
  };

  // 1. Check for known non-existent roles (CFO, CTO, VP, etc.)
  for (const role of INVALID_ROLES) {
    if (hasWord(qLower, role)) {
      return {
        isCompanyQuery: true,
        found: false,
        answer: 'There is no such information available to your query.',
      };
    }
  }

  // 2. Check for unknown branch queries (Delhi, Mumbai, Pune, etc.)
  const invalidCities = ['delhi', 'mumbai', 'pune', 'chennai', 'kolkata', 'hyderabad', 'noida', 'gurgaon', 'chandigarh', 'jaipur', 'lucknow'];
  for (const city of invalidCities) {
    if (hasWord(qLower, city)) {
      return {
        isCompanyQuery: true,
        found: false,
        answer: 'There is no such information available to your query.',
      };
    }
  }

  // 3. Check for unknown person inquiries in "who is <name>"
  const whoIsMatch = qLower.match(/who\s+(?:is|was)\s+([a-z\s]+)/i);
  if (whoIsMatch) {
    const isKnownRole = VALID_ROLES.some(r => hasWord(qLower, r) || qLower.includes(r));
    const isKnownPerson = VALID_PERSONNEL.some(p => p.keys.some(k => hasWord(qLower, k) || qLower.includes(k)));
    const isKnownBranch = VALID_BRANCHES.some(b => hasWord(qLower, b) || qLower.includes(b));

    if (!isKnownRole && !isKnownPerson && !isKnownBranch) {
      return {
        isCompanyQuery: true,
        found: false,
        answer: 'There is no such information available to your query.',
      };
    }
  }

  // 4. Check for unknown person contact inquiry (e.g. "Sarah's mobile number", "email of John")
  const isAskingContact =
    qLower.includes('contact') ||
    qLower.includes('email') ||
    qLower.includes('phone') ||
    qLower.includes('mobile') ||
    qLower.includes('extension') ||
    qLower.includes('ext');

  if (isAskingContact) {
    const isTargetKnown =
      VALID_PERSONNEL.some(p => p.keys.some(k => qLower.includes(k))) ||
      VALID_BRANCHES.some(b => qLower.includes(b)) ||
      VALID_ROLES.some(r => qLower.includes(r)) ||
      qLower.includes('apex') ||
      qLower.includes('helpline') ||
      qLower.includes('office') ||
      qLower.includes('headquarters');

    if (!isTargetKnown) {
      return {
        isCompanyQuery: true,
        found: false,
        answer: 'There is no such information available to your query.',
      };
    }
  }

  // 5. Query ChromaDB vector database
  const results = await queryChromaDB(userQuery, 3);

  if (!results || results.length === 0) {
    return {
      isCompanyQuery: true,
      found: false,
      answer: 'There is no such information available to your query.',
    };
  }

  const top = results[0];

  // 6. Strict distance cutoff for vector similarity
  if (top.distance > 1.20) {
    return {
      isCompanyQuery: true,
      found: false,
      answer: 'There is no such information available to your query.',
      sourceDocs: results,
    };
  }

  // If the top result is a canonical QA pair, directly return the accurate answer
  if (top.metadata && top.metadata.category === 'qa_pair' && top.metadata.answer) {
    return {
      isCompanyQuery: true,
      found: true,
      answer: top.metadata.answer,
      sourceDocs: results,
    };
  }

  // If the top result is a personnel record, format a clean response
  if (top.metadata && top.metadata.category === 'personnel') {
    const meta = top.metadata;
    let answerText = `**${meta.name}** is the **${meta.title}** at Apex Training Institute.\n\n` +
      `- **Department:** ${meta.dept || 'Executive Board'}\n` +
      `- **Email:** ${meta.email}\n` +
      `- **Desk Extension:** ${meta.ext}\n`;

    if (top.text.includes('Core Responsibilities:')) {
      const resp = top.text.split('Core Responsibilities:')[1]?.trim();
      if (resp) {
        answerText += `- **Core Responsibilities:** ${resp}`;
      }
    }

    return {
      isCompanyQuery: true,
      found: true,
      answer: answerText,
      sourceDocs: results,
    };
  }

  // If the top result is a branch record
  if (top.metadata && top.metadata.category === 'branch') {
    const b = top.metadata;
    const answerText = `### ${b.name}\n\n` +
      `- **Address:** ${b.address}\n` +
      `- **Branch Head / Manager:** ${b.head}\n` +
      `- **Direct Contact:** ${b.contact}\n\n` +
      `${top.text.replace(/^.*Facilities & Role:\s*/i, '**Facilities:** ')}`;

    return {
      isCompanyQuery: true,
      found: true,
      answer: answerText,
      sourceDocs: results,
    };
  }

  // Profile or general document
  return {
    isCompanyQuery: true,
    found: true,
    answer: top.text,
    sourceDocs: results,
  };
}

const RENDER_BASE = 'https://apex-tech-institute.onrender.com';

async function testEndpoint(name, url, options = {}, expectedStatus = 200) {
  const startTime = Date.now();
  try {
    const res = await fetch(url, { redirect: 'follow', ...options });
    const duration = Date.now() - startTime;
    const ok = res.status === expectedStatus;
    console.log(`[${ok ? 'PASS' : 'FAIL'}] ${name} -> Status: ${res.status} (expected ${expectedStatus}) in ${duration}ms`);
    return { ok, status: res.status, res };
  } catch (err) {
    console.error(`[ERROR] ${name} -> ${err.message}`);
    return { ok: false, error: err.message };
  }
}

async function run() {
  console.log('===============================================================');
  console.log('   APEX TECH INSTITUTE - LIVE RENDER DEPLOYMENT VERIFICATION   ');
  console.log(`   Host: ${RENDER_BASE}`);
  console.log('===============================================================\n');

  let passed = 0;
  let total = 0;

  async function check(name, url, options, expected) {
    total++;
    const res = await testEndpoint(name, url, options, expected);
    if (res.ok) passed++;
    return res;
  }

  // 1. Pages
  console.log('--- 1. Testing Live Public Pages ---');
  await check('Homepage', `${RENDER_BASE}/`);
  await check('Courses Catalog', `${RENDER_BASE}/courses`);
  await check('Course Detail Page', `${RENDER_BASE}/courses/full-stack-mern-nextjs-masterclass`);
  await check('Domains Page', `${RENDER_BASE}/domains`);
  await check('Domain Detail (IT)', `${RENDER_BASE}/domains/information-technology`);
  await check('Career Finder Wizard', `${RENDER_BASE}/career-finder`);
  await check('Placements & Records', `${RENDER_BASE}/placements`);
  await check('Skill Passport', `${RENDER_BASE}/skill-passport`);
  await check('About Page', `${RENDER_BASE}/about`);
  await check('Contact Page', `${RENDER_BASE}/contact`);
  await check('Blog Page', `${RENDER_BASE}/blog`);
  await check('Events Page', `${RENDER_BASE}/events`);
  await check('Event Details (Seat Booking)', `${RENDER_BASE}/events/live-workshop-building-autonomous-genai-agents`);
  await check('Login Page', `${RENDER_BASE}/login`);
  await check('Register Page', `${RENDER_BASE}/register`);
  await check('Forgot Password Page', `${RENDER_BASE}/forgot-password`);
  await check('Admin Login Page', `${RENDER_BASE}/admin/login`);
  await check('Course Comparison Matrix', `${RENDER_BASE}/compare`);
  await check('Global Search Index', `${RENDER_BASE}/search`);
  await check('Enroll Redirect Alias', `${RENDER_BASE}/enroll`);
  await check('Student Redirect Alias', `${RENDER_BASE}/student`);

  // 2. Live APIs
  console.log('\n--- 2. Testing Live API GET Routes (200 OK) ---');
  await check('GET /api/courses', `${RENDER_BASE}/api/courses`);
  await check('GET /api/domains', `${RENDER_BASE}/api/domains`);
  await check('GET /api/blogs', `${RENDER_BASE}/api/blogs`);
  await check('GET /api/events', `${RENDER_BASE}/api/events`);
  await check('GET /api/settings', `${RENDER_BASE}/api/settings`);
  await check('GET /api/auth/me (Unauthenticated)', `${RENDER_BASE}/api/auth/me`);

  // 3. Live POST Handlers
  console.log('\n--- 3. Testing Live POST Handlers ---');
  // Enquiry (Free Seat Booking) -> 201 Created
  await check(
    'POST /api/enquiries (Seat booking / enquiry lead)',
    `${RENDER_BASE}/api/enquiries`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Render Live Verification Student',
        email: 'render-live-test@apexinstitute.com',
        phone: '9876543210',
        message: 'Live deployment testing on Render',
      }),
    },
    201
  );

  // Chatbot -> 200 OK
  await check(
    'POST /api/chat (AI Counselor live)',
    `${RENDER_BASE}/api/chat`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'What courses do you offer?' }],
        pageContext: '/courses',
      }),
    },
    200
  );

  console.log('\n===============================================================');
  console.log(`RENDER VERIFICATION SUMMARY: ${passed}/${total} Passed`);
  console.log('===============================================================');
}

run();

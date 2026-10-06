const BASE = 'http://localhost:3000';

let passed = 0;
let failed = 0;

function logPass(msg) {
  passed++;
  console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
}

function logFail(msg, detail) {
  failed++;
  console.error(`\x1b[31m[FAIL]\x1b[0m ${msg} - ${detail}`);
}

async function getJson(path, cookies = '') {
  const res = await fetch(`${BASE}${path}`, {
    headers: { ...(cookies ? { Cookie: cookies } : {}) },
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data, headers: res.headers };
}

async function postJson(path, body, cookies = '') {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(cookies ? { Cookie: cookies } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data, headers: res.headers };
}

async function putJson(path, body, cookies = '') {
  const res = await fetch(`${BASE}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(cookies ? { Cookie: cookies } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data, headers: res.headers };
}

async function patchJson(path, body, cookies = '') {
  const res = await fetch(`${BASE}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(cookies ? { Cookie: cookies } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data, headers: res.headers };
}

async function deleteJson(path, cookies = '') {
  const res = await fetch(`${BASE}${path}`, {
    method: 'DELETE',
    headers: { ...(cookies ? { Cookie: cookies } : {}) },
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data, headers: res.headers };
}

async function testPage(path, expectedStatus = 200) {
  try {
    const res = await fetch(`${BASE}${path}`, { redirect: 'follow' });
    if (res.status === expectedStatus) {
      logPass(`Page: ${path} (status ${res.status})`);
    } else {
      logFail(`Page: ${path}`, `Expected ${expectedStatus}, got ${res.status}`);
    }
  } catch (err) {
    logFail(`Page: ${path}`, err.message);
  }
}

async function run() {
  console.log('================================================================');
  console.log('  APEX TECH INSTITUTE - RIGOROUS END-TO-END RE-VERIFICATION');
  console.log('================================================================\n');

  // 1. Pages
  console.log('--- 1. Testing Core & Auxiliary Pages ---');
  const pages = [
    '/',
    '/courses',
    '/courses/full-stack-mern-nextjs-masterclass',
    '/domains',
    '/domains/information-technology',
    '/career-finder',
    '/career-path',
    '/placements',
    '/skill-passport',
    '/about',
    '/contact',
    '/blog',
    '/blogs',
    '/events',
    '/events/live-workshop-building-autonomous-genai-agents',
    '/login',
    '/register',
    '/forgot-password',
    '/admin/login',
    '/ai-counselor',
    '/compare',
    '/search',
    '/success-stories',
    '/resources',
    '/enroll',
    '/enroll/full-stack-mern-nextjs-masterclass',
    '/student',
    '/student/dashboard',
    '/student/courses',
    '/sitemap.xml',
    '/robots.txt',
  ];

  for (const p of pages) {
    await testPage(p, 200);
  }

  // 2. Public API GET routes
  console.log('\n--- 2. Testing Public API GET Routes (200 OK) ---');
  const getRoutes = [
    '/api/courses',
    '/api/courses?domain=information-technology',
    '/api/domains',
    '/api/blogs',
    '/api/events',
    '/api/settings',
    '/api/auth/me',
  ];

  for (const r of getRoutes) {
    const res = await getJson(r);
    if (res.status === 200) {
      logPass(`GET ${r} (status 200 OK)`);
    } else {
      logFail(`GET ${r}`, `status ${res.status}`);
    }
  }

  // 3. Public POST Handlers
  console.log('\n--- 3. Testing Public POST Handlers ---');
  // Enquiries (Seat Booking) -> 201 Created
  const enquiryRes = await postJson('/api/enquiries', {
    name: 'Reverification Tester',
    email: 'reverify@apexinstitute.com',
    phone: '9876543210',
    message: 'Testing free seat popup and lead dispatch',
  });
  if (enquiryRes.status === 201 && enquiryRes.data.enquiry?.id) {
    logPass(`POST /api/enquiries -> 201 Created (ID: ${enquiryRes.data.enquiry.id})`);
  } else {
    logFail('POST /api/enquiries', `Expected 201 Created, got ${enquiryRes.status}`);
  }

  // Chatbot -> 200 OK
  const chatRes = await postJson('/api/chat', {
    messages: [{ role: 'user', content: 'What are the batch timings for full stack?' }],
    pageContext: '/courses',
  });
  if (chatRes.status === 200 && chatRes.data.reply) {
    logPass(`POST /api/chat -> 200 OK (Model: ${chatRes.data.model || 'live-engine'})`);
  } else {
    logFail('POST /api/chat', `Expected 200 OK, got ${chatRes.status}`);
  }

  // 4. Admin Authentication & Full CRUD
  console.log('\n--- 4. Testing Admin Authentication & CRUD ---');
  const adminLoginRes = await postJson('/api/auth/login', {
    password: 'vageesha2000',
    requiredRole: 'ADMIN',
  });
  const adminCookie = adminLoginRes.headers.get('set-cookie') || '';
  if (adminLoginRes.status === 200) {
    logPass('POST /api/auth/login -> 200 OK (Admin Authenticated)');
  } else {
    logFail('POST /api/auth/login', `status ${adminLoginRes.status}`);
  }

  // Admin GET Enquiries
  const adminEnq = await getJson('/api/enquiries', adminCookie);
  if (adminEnq.status === 200) {
    logPass('GET /api/enquiries (Admin) -> 200 OK');
  } else {
    logFail('GET /api/enquiries (Admin)', `status ${adminEnq.status}`);
  }

  // Course CRUD
  const domainsListRes = await getJson('/api/domains');
  const testDomainId = domainsListRes.data.domains?.[0]?.id || 'dom-1';

  const coursePost = await postJson(
    '/api/courses',
    {
      title: 'Reverify Automation Course',
      slug: `reverify-course-${Date.now()}`,
      domainId: testDomainId,
      headline: 'Automated testing and QA framework',
      fee: 25000,
      duration: '3 Months',
      level: 'Beginner',
      highlights: ['Automated verification', 'Zero bugs'],
      curriculum: [{ title: 'Module 1', topics: ['Testing'] }],
    },
    adminCookie
  );
  if (coursePost.status === 201 && coursePost.data.course?.id) {
    logPass(`POST /api/courses -> 201 Created (ID: ${coursePost.data.course.id})`);
    const courseId = coursePost.data.course.id;

    const coursePut = await putJson(`/api/courses/${courseId}`, { fee: 22000 }, adminCookie);
    if (coursePut.status === 200) {
      logPass(`PUT /api/courses/${courseId} -> 200 OK`);
    } else {
      logFail(`PUT /api/courses/${courseId}`, `status ${coursePut.status}`);
    }

    const courseDel = await deleteJson(`/api/courses/${courseId}`, adminCookie);
    if (courseDel.status === 200) {
      logPass(`DELETE /api/courses/${courseId} -> 200 OK`);
    } else {
      logFail(`DELETE /api/courses/${courseId}`, `status ${courseDel.status}`);
    }
  } else {
    logFail('POST /api/courses', `status ${coursePost.status}`);
  }

  // Domain CRUD
  const domainPost = await postJson(
    '/api/domains',
    {
      name: 'Reverify Domain',
      slug: `reverify-domain-${Date.now()}`,
      tagline: 'Automated Domain Verification',
      description: 'Testing domain creation',
      icon: 'ShieldCheck',
      color: 'from-pink-500 to-purple-600',
    },
    adminCookie
  );
  if (domainPost.status === 201 && domainPost.data.domain?.id) {
    logPass(`POST /api/domains -> 201 Created (ID: ${domainPost.data.domain.id})`);
    const domId = domainPost.data.domain.id;

    const domPut = await putJson(`/api/domains/${domId}`, { tagline: 'Updated Tagline' }, adminCookie);
    if (domPut.status === 200) {
      logPass(`PUT /api/domains/${domId} -> 200 OK`);
    } else {
      logFail(`PUT /api/domains/${domId}`, `status ${domPut.status}`);
    }

    const domDel = await deleteJson(`/api/domains/${domId}`, adminCookie);
    if (domDel.status === 200) {
      logPass(`DELETE /api/domains/${domId} -> 200 OK`);
    } else {
      logFail(`DELETE /api/domains/${domId}`, `status ${domDel.status}`);
    }
  } else {
    logFail('POST /api/domains', `status ${domainPost.status}`);
  }

  // Blog CRUD
  const blogPost = await postJson(
    '/api/blogs',
    {
      title: 'Reverify Blog',
      slug: `reverify-blog-${Date.now()}`,
      category: 'Engineering',
      readTime: '4 min',
      summary: 'Blog testing summary for verification',
      content: 'Detailed blog content for testing.',
    },
    adminCookie
  );
  if (blogPost.status === 201 && blogPost.data.blog?.id) {
    logPass(`POST /api/blogs -> 201 Created (ID: ${blogPost.data.blog.id})`);
    const blogId = blogPost.data.blog.id;

    const blogPut = await putJson(`/api/blogs/${blogId}`, { title: 'Updated Blog Title' }, adminCookie);
    if (blogPut.status === 200) {
      logPass(`PUT /api/blogs/${blogId} -> 200 OK`);
    } else {
      logFail(`PUT /api/blogs/${blogId}`, `status ${blogPut.status}`);
    }

    const blogDel = await deleteJson(`/api/blogs/${blogId}`, adminCookie);
    if (blogDel.status === 200) {
      logPass(`DELETE /api/blogs/${blogId} -> 200 OK`);
    } else {
      logFail(`DELETE /api/blogs/${blogId}`, `status ${blogDel.status}`);
    }
  } else {
    logFail('POST /api/blogs', `status ${blogPost.status}`);
  }

  // Event CRUD
  const eventPost = await postJson(
    '/api/events',
    {
      title: 'Reverify Workshop',
      slug: `reverify-event-${Date.now()}`,
      date: '2026-10-30',
      time: '6:00 PM IST',
      instructorName: 'Apex Senior Architect',
      instructorTitle: 'Principal Lead',
      description: 'Workshop event testing',
      seats: 50,
      mode: 'Online Live',
      category: 'AI & Data',
    },
    adminCookie
  );
  if (eventPost.status === 201 && eventPost.data.event?.id) {
    logPass(`POST /api/events -> 201 Created (ID: ${eventPost.data.event.id})`);
    const evId = eventPost.data.event.id;

    const evPut = await putJson(`/api/events/${evId}`, { seats: 75 }, adminCookie);
    if (evPut.status === 200) {
      logPass(`PUT /api/events/${evId} -> 200 OK`);
    } else {
      logFail(`PUT /api/events/${evId}`, `status ${evPut.status}`);
    }

    const evDel = await deleteJson(`/api/events/${evId}`, adminCookie);
    if (evDel.status === 200) {
      logPass(`DELETE /api/events/${evId} -> 200 OK`);
    } else {
      logFail(`DELETE /api/events/${evId}`, `status ${evDel.status}`);
    }
  } else {
    logFail('POST /api/events', `status ${eventPost.status}`);
  }

  // Patch Enquiry & Put Settings
  if (enquiryRes.data.enquiry?.id) {
    const patchEnq = await patchJson(
      '/api/enquiries',
      { id: enquiryRes.data.enquiry.id, status: 'CONTACTED' },
      adminCookie
    );
    if (patchEnq.status === 200) {
      logPass('PATCH /api/enquiries -> 200 OK');
    } else {
      logFail('PATCH /api/enquiries', `status ${patchEnq.status}`);
    }
  }

  const putSettings = await putJson(
    '/api/settings',
    { contactPhone: '+91 9876543210' },
    adminCookie
  );
  if (putSettings.status === 200) {
    logPass('PUT /api/settings -> 200 OK');
  } else {
    logFail('PUT /api/settings', `status ${putSettings.status}`);
  }

  // 5. Student Complete Registration & Portal Journey
  console.log('\n--- 5. Testing Student Flow ---');
  const availableCoursesRes = await getJson('/api/courses');
  const firstRealCourse = availableCoursesRes.data.courses?.[0]?.id || 'crs-1';
  const secondRealCourse = availableCoursesRes.data.courses?.[1]?.id || firstRealCourse;

  const studentEmail = `student_${Date.now()}@example.com`;
  const regStudent = await postJson('/api/auth/register', {
    name: 'Verified Student User',
    email: studentEmail,
    password: 'studentpassword123',
    phone: '9876543210',
    courseId: firstRealCourse,
    paymentChoice: 'DEPOSIT_2000',
    amountPaidNow: 2000,
    paymentMethod: 'UPI',
  });
  const studentCookie = regStudent.headers.get('set-cookie') || '';
  if (regStudent.status === 201) {
    logPass(`POST /api/auth/register -> 201 Created (Student: ${studentEmail})`);
  } else {
    logFail('POST /api/auth/register', `status ${regStudent.status}`);
  }

  // Student auth me
  const meRes = await getJson('/api/auth/me', studentCookie);
  if (meRes.status === 200 && meRes.data.user?.email === studentEmail) {
    logPass('GET /api/auth/me (Student Authenticated) -> 200 OK');
  } else {
    logFail('GET /api/auth/me (Student)', `status ${meRes.status}`);
  }

  // Student enrollments
  const enrRes = await getJson('/api/enrollments', studentCookie);
  if (enrRes.status === 200 && Array.isArray(enrRes.data.enrollments)) {
    logPass(`GET /api/enrollments -> 200 OK (${enrRes.data.enrollments.length} found)`);

    // Additional course enrollment
    const addEnr = await postJson(
      '/api/enrollments',
      {
        courseId: secondRealCourse,
        batchTiming: 'Weekend (10:00 AM - 1:00 PM)',
      },
      studentCookie
    );
    if (addEnr.status === 201) {
      logPass('POST /api/enrollments (Additional) -> 201 Created');
    } else {
      logFail('POST /api/enrollments', `status ${addEnr.status}`);
    }

    // Fee payment
    const firstEnr = enrRes.data.enrollments[0];
    if (firstEnr) {
      const payFee = await postJson(
        '/api/student/pay-fee',
        {
          enrollmentId: firstEnr.id,
          amount: 5000,
          plan: 'INSTALLMENTS_2',
          paymentMethod: 'UPI',
        },
        studentCookie
      );
      if (payFee.status === 200) {
        logPass(`POST /api/student/pay-fee -> 200 OK (Txn: ${payFee.data.transactionId})`);
      } else {
        logFail('POST /api/student/pay-fee', `status ${payFee.status}`);
      }
    }
  } else {
    logFail('GET /api/enrollments', `status ${enrRes.status}`);
  }

  // Logout
  const logoutRes = await postJson('/api/auth/logout', {}, studentCookie);
  if (logoutRes.status === 200) {
    logPass('POST /api/auth/logout -> 200 OK');
  } else {
    logFail('POST /api/auth/logout', `status ${logoutRes.status}`);
  }

  console.log('\n================================================================');
  console.log(`RE-VERIFICATION RESULTS: ${passed} PASSED, ${failed} FAILED (Total: ${passed + failed})`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

run();

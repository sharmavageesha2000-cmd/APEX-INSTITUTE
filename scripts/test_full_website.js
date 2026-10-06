// Comprehensive Automated Verification Suite for Apex Tech Institute
// Tests all pages, APIs (GET, POST 201, PUT 200, PATCH 200, DELETE 200), Forms, and Auth

const BASE_URL = 'http://localhost:3000';

async function testAll() {
  console.log('===============================================================');
  console.log('   APEX TECH INSTITUTE - AUTOMATED FULL SYSTEM AUDIT');
  console.log('===============================================================\n');

  let passed = 0;
  let failed = 0;
  const results = [];

  function logPass(name, detail = '') {
    passed++;
    console.log(`[PASS] ${name} ${detail ? '(' + detail + ')' : ''}`);
    results.push({ name, status: 'PASS', detail });
  }

  function logFail(name, err) {
    failed++;
    console.error(`[FAIL] ${name} -> Error:`, err);
    results.push({ name, status: 'FAIL', error: err });
  }

  // 1. PAGE ROUTES AUDIT
  console.log('\n--- 1. Testing Page Routes (GET 200 OK) ---');
  const pages = [
    '/',
    '/courses',
    '/courses/full-stack-mern-nextjs-masterclass',
    '/domains',
    '/domains/information-technology',
    '/career-finder',
    '/placements',
    '/skill-passport',
    '/about',
    '/contact',
    '/blog',
    '/events',
    '/events/live-workshop-building-autonomous-genai-agents',
    '/login',
    '/register',
    '/admin/login',
    '/ai-counselor',
    '/compare',
  ];

  for (const page of pages) {
    const t0 = Date.now();
    try {
      const res = await fetch(`${BASE_URL}${page}`);
      const elapsed = Date.now() - t0;
      if (res.status === 200) {
        logPass(`Page: ${page}`, `${res.status} in ${elapsed}ms`);
      } else {
        logFail(`Page: ${page}`, `Expected 200, got ${res.status}`);
      }
    } catch (e) {
      logFail(`Page: ${page}`, e.message);
    }
  }

  // 2. PUBLIC API GET METHODS (200 OK)
  console.log('\n--- 2. Testing Public API GET Routes (200 OK) ---');
  const getRoutes = [
    { url: '/api/courses', name: 'GET /api/courses' },
    { url: '/api/courses?domain=information-technology', name: 'GET /api/courses?domain=...' },
    { url: '/api/domains', name: 'GET /api/domains' },
    { url: '/api/blogs', name: 'GET /api/blogs' },
    { url: '/api/events', name: 'GET /api/events' },
    { url: '/api/settings', name: 'GET /api/settings' },
    { url: '/api/auth/me', name: 'GET /api/auth/me (unauth)' },
  ];

  for (const r of getRoutes) {
    const t0 = Date.now();
    try {
      const res = await fetch(`${BASE_URL}${r.url}`);
      const elapsed = Date.now() - t0;
      if (res.status === 200) {
        const json = await res.json();
        logPass(r.name, `200 OK in ${elapsed}ms`);
      } else {
        logFail(r.name, `Status ${res.status}`);
      }
    } catch (e) {
      logFail(r.name, e.message);
    }
  }

  // 3. PUBLIC POST METHODS (201 Created for Enquiries, 200 for Chat)
  console.log('\n--- 3. Testing Public POST Handlers ---');
  // 3a. Enquiry / Free Seat Booking -> 201 Created
  try {
    const testEnquiry = {
      name: 'Automated Audit Tester',
      email: `audit.${Date.now()}@example.com`,
      phone: '9876543210',
      message: 'Automated full system test verification message.',
    };
    const t0 = Date.now();
    const res = await fetch(`${BASE_URL}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testEnquiry),
    });
    const elapsed = Date.now() - t0;
    const data = await res.json();
    if (res.status === 201 && data.success) {
      logPass('POST /api/enquiries (Lead / Seat booking)', `201 Created in ${elapsed}ms, ID: ${data.enquiry?.id}`);
    } else {
      logFail('POST /api/enquiries', `Expected 201, got ${res.status}: ${JSON.stringify(data)}`);
    }
  } catch (e) {
    logFail('POST /api/enquiries', e.message);
  }

  // 3b. Chatbot Counselor POST -> 200 OK
  try {
    const t0 = Date.now();
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'What is the highest package at Apex?' }],
      }),
    });
    const elapsed = Date.now() - t0;
    const data = await res.json();
    if (res.status === 200 && data.reply) {
      logPass('POST /api/chat (AI Counselor)', `200 OK in ${elapsed}ms, Model: ${data.model}`);
    } else {
      logFail('POST /api/chat', `Expected 200, got ${res.status}`);
    }
  } catch (e) {
    logFail('POST /api/chat', e.message);
  }

  // 4. ADMIN AUTHENTICATION & PRIVILEGED CRUD METHODS
  console.log('\n--- 4. Testing Admin Auth & CRUD (GET 200, POST 201, PUT 200, PATCH 200, DELETE 200) ---');
  let adminCookie = '';
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requiredRole: 'ADMIN',
        password: 'vageesha2000',
      }),
    });
    const setCookie = res.headers.get('set-cookie');
    if (res.status === 200 && setCookie) {
      adminCookie = setCookie.split(';')[0];
      logPass('POST /api/auth/login (Admin Master Password)', `200 OK, Session established`);
    } else {
      logFail('POST /api/auth/login (Admin)', `Status ${res.status}`);
    }
  } catch (e) {
    logFail('POST /api/auth/login (Admin)', e.message);
  }

  if (adminCookie) {
    const adminHeaders = {
      'Content-Type': 'application/json',
      Cookie: adminCookie,
    };

    // 4a. GET /api/enquiries with Admin auth -> 200 OK
    try {
      const res = await fetch(`${BASE_URL}/api/enquiries`, { headers: adminHeaders });
      const data = await res.json();
      if (res.status === 200 && Array.isArray(data.enquiries)) {
        logPass('GET /api/enquiries (Admin)', `200 OK, ${data.enquiries.length} leads loaded`);
      } else {
        logFail('GET /api/enquiries (Admin)', `Status ${res.status}`);
      }
    } catch (e) {
      logFail('GET /api/enquiries (Admin)', e.message);
    }

    // 4b. Course CRUD: POST (201) -> PUT (200) -> DELETE (200)
    let createdCourseId = '';
    const tempSlug = `test-audit-course-${Date.now()}`;
    try {
      const createRes = await fetch(`${BASE_URL}/api/courses`, {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify({
          title: 'Audit Automation Course',
          slug: tempSlug,
          headline: 'Automated Test Course',
          description: 'Testing course creation API',
          domainId: 'dom-1',
          fee: 29999,
          duration: '2 Months',
          level: 'Beginner',
          mode: 'Live Online',
        }),
      });
      const createData = await createRes.json();
      if (createRes.status === 201 && createData.course?.id) {
        createdCourseId = createData.course.id;
        logPass('POST /api/courses (Create)', `201 Created, ID: ${createdCourseId}`);
      } else {
        logFail('POST /api/courses', `Expected 201, got ${createRes.status}: ${JSON.stringify(createData)}`);
      }
    } catch (e) {
      logFail('POST /api/courses', e.message);
    }

    if (createdCourseId) {
      // PUT /api/courses/:id -> 200 OK
      try {
        const putRes = await fetch(`${BASE_URL}/api/courses/${createdCourseId}`, {
          method: 'PUT',
          headers: adminHeaders,
          body: JSON.stringify({
            title: 'Audit Automation Course (Updated)',
            fee: 34999,
          }),
        });
        const putData = await putRes.json();
        if (putRes.status === 200 && putData.success) {
          logPass(`PUT /api/courses/${createdCourseId} (Update)`, `200 OK`);
        } else {
          logFail(`PUT /api/courses/${createdCourseId}`, `Status ${putRes.status}`);
        }
      } catch (e) {
        logFail(`PUT /api/courses/${createdCourseId}`, e.message);
      }

      // DELETE /api/courses/:id -> 200 OK
      try {
        const delRes = await fetch(`${BASE_URL}/api/courses/${createdCourseId}`, {
          method: 'DELETE',
          headers: adminHeaders,
        });
        const delData = await delRes.json();
        if (delRes.status === 200 && delData.success) {
          logPass(`DELETE /api/courses/${createdCourseId} (Delete)`, `200 OK`);
        } else {
          logFail(`DELETE /api/courses/${createdCourseId}`, `Status ${delRes.status}`);
        }
      } catch (e) {
        logFail(`DELETE /api/courses/${createdCourseId}`, e.message);
      }
    }

    // 4c. Domain CRUD: POST (201) -> PUT (200) -> DELETE (200)
    let createdDomainId = '';
    const tempDomainSlug = `audit-domain-${Date.now()}`;
    try {
      const createRes = await fetch(`${BASE_URL}/api/domains`, {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify({
          name: 'Audit Test Domain',
          slug: tempDomainSlug,
          headline: 'Domain for automated verification',
          description: 'Testing domain creation',
        }),
      });
      const createData = await createRes.json();
      if (createRes.status === 201 && createData.domain?.id) {
        createdDomainId = createData.domain.id;
        logPass('POST /api/domains (Create)', `201 Created, ID: ${createdDomainId}`);
      } else {
        logFail('POST /api/domains', `Expected 201, got ${createRes.status}`);
      }
    } catch (e) {
      logFail('POST /api/domains', e.message);
    }

    if (createdDomainId) {
      // PUT /api/domains/:id -> 200 OK
      try {
        const putRes = await fetch(`${BASE_URL}/api/domains/${createdDomainId}`, {
          method: 'PUT',
          headers: adminHeaders,
          body: JSON.stringify({ name: 'Audit Test Domain (Updated)' }),
        });
        if (putRes.status === 200) {
          logPass(`PUT /api/domains/${createdDomainId} (Update)`, `200 OK`);
        } else {
          logFail(`PUT /api/domains/${createdDomainId}`, `Status ${putRes.status}`);
        }
      } catch (e) {
        logFail(`PUT /api/domains/${createdDomainId}`, e.message);
      }

      // DELETE /api/domains/:id -> 200 OK
      try {
        const delRes = await fetch(`${BASE_URL}/api/domains/${createdDomainId}`, {
          method: 'DELETE',
          headers: adminHeaders,
        });
        if (delRes.status === 200) {
          logPass(`DELETE /api/domains/${createdDomainId} (Delete)`, `200 OK`);
        } else {
          logFail(`DELETE /api/domains/${createdDomainId}`, `Status ${delRes.status}`);
        }
      } catch (e) {
        logFail(`DELETE /api/domains/${createdDomainId}`, e.message);
      }
    }

    // 4d. Blog CRUD: POST (201) -> PUT (200) -> DELETE (200)
    let createdBlogId = '';
    try {
      const createRes = await fetch(`${BASE_URL}/api/blogs`, {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify({
          title: `Audit Blog Post ${Date.now()}`,
          category: 'Tech Guides',
          summary: 'Testing blog creation in automated suite.',
          content: 'Full body content of test blog post.',
        }),
      });
      const createData = await createRes.json();
      if (createRes.status === 201 && createData.blog?.id) {
        createdBlogId = createData.blog.id;
        logPass('POST /api/blogs (Create)', `201 Created, ID: ${createdBlogId}`);
      } else {
        logFail('POST /api/blogs', `Expected 201, got ${createRes.status}`);
      }
    } catch (e) {
      logFail('POST /api/blogs', e.message);
    }

    if (createdBlogId) {
      // PUT /api/blogs/:id -> 200 OK
      try {
        const putRes = await fetch(`${BASE_URL}/api/blogs/${createdBlogId}`, {
          method: 'PUT',
          headers: adminHeaders,
          body: JSON.stringify({ title: 'Audit Blog Post (Updated)' }),
        });
        if (putRes.status === 200) {
          logPass(`PUT /api/blogs/${createdBlogId} (Update)`, `200 OK`);
        } else {
          logFail(`PUT /api/blogs/${createdBlogId}`, `Status ${putRes.status}`);
        }
      } catch (e) {
        logFail(`PUT /api/blogs/${createdBlogId}`, e.message);
      }

      // DELETE /api/blogs/:id -> 200 OK
      try {
        const delRes = await fetch(`${BASE_URL}/api/blogs/${createdBlogId}`, {
          method: 'DELETE',
          headers: adminHeaders,
        });
        if (delRes.status === 200) {
          logPass(`DELETE /api/blogs/${createdBlogId} (Delete)`, `200 OK`);
        } else {
          logFail(`DELETE /api/blogs/${createdBlogId}`, `Status ${delRes.status}`);
        }
      } catch (e) {
        logFail(`DELETE /api/blogs/${createdBlogId}`, e.message);
      }
    }

    // 4e. Event CRUD: POST (201) -> PUT (200) -> DELETE (200)
    let createdEventId = '';
    try {
      const createRes = await fetch(`${BASE_URL}/api/events`, {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify({
          title: `Audit Test Workshop ${Date.now()}`,
          category: 'Workshops',
          date: 'Saturday, Dec 12, 2026',
          time: '10:00 AM - 12:00 PM IST',
          location: 'Live Zoom & HSR Campus',
          speakerName: 'Dr. Test Mentor',
          speakerRole: 'AI Fellow',
          description: 'Testing event creation',
        }),
      });
      const createData = await createRes.json();
      if (createRes.status === 201 && createData.event?.id) {
        createdEventId = createData.event.id;
        logPass('POST /api/events (Create)', `201 Created, ID: ${createdEventId}`);
      } else {
        logFail('POST /api/events', `Expected 201, got ${createRes.status}`);
      }
    } catch (e) {
      logFail('POST /api/events', e.message);
    }

    if (createdEventId) {
      // PUT /api/events/:id -> 200 OK
      try {
        const putRes = await fetch(`${BASE_URL}/api/events/${createdEventId}`, {
          method: 'PUT',
          headers: adminHeaders,
          body: JSON.stringify({ title: 'Audit Test Workshop (Updated)' }),
        });
        if (putRes.status === 200) {
          logPass(`PUT /api/events/${createdEventId} (Update)`, `200 OK`);
        } else {
          logFail(`PUT /api/events/${createdEventId}`, `Status ${putRes.status}`);
        }
      } catch (e) {
        logFail(`PUT /api/events/${createdEventId}`, e.message);
      }

      // DELETE /api/events/:id -> 200 OK
      try {
        const delRes = await fetch(`${BASE_URL}/api/events/${createdEventId}`, {
          method: 'DELETE',
          headers: adminHeaders,
        });
        if (delRes.status === 200) {
          logPass(`DELETE /api/events/${createdEventId} (Delete)`, `200 OK`);
        } else {
          logFail(`DELETE /api/events/${createdEventId}`, `Status ${delRes.status}`);
        }
      } catch (e) {
        logFail(`DELETE /api/events/${createdEventId}`, e.message);
      }
    }

    // 4f. PATCH /api/enquiries -> 200 OK
    try {
      const getEnq = await fetch(`${BASE_URL}/api/enquiries`, { headers: adminHeaders });
      const enqData = await getEnq.json();
      const firstEnq = enqData.enquiries?.[0];
      if (firstEnq) {
        const patchRes = await fetch(`${BASE_URL}/api/enquiries`, {
          method: 'PATCH',
          headers: adminHeaders,
          body: JSON.stringify({ id: firstEnq.id, status: 'IN_PROGRESS', notes: 'Audit verified lead' }),
        });
        if (patchRes.status === 200) {
          logPass(`PATCH /api/enquiries (Update Status)`, `200 OK`);
        } else {
          logFail(`PATCH /api/enquiries`, `Status ${patchRes.status}`);
        }
      }
    } catch (e) {
      logFail('PATCH /api/enquiries', e.message);
    }

    // 4g. PUT /api/settings -> 200 OK
    try {
      const putRes = await fetch(`${BASE_URL}/api/settings`, {
        method: 'PUT',
        headers: adminHeaders,
        body: JSON.stringify({
          phone: '+91 9876543210',
          email: 'contact@apexinstitute.com',
          workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM',
        }),
      });
      if (putRes.status === 200) {
        logPass('PUT /api/settings (Update Settings)', `200 OK`);
      } else {
        logFail('PUT /api/settings', `Status ${putRes.status}`);
      }
    } catch (e) {
      logFail('PUT /api/settings', e.message);
    }
  }

  // 5. STUDENT REGISTRATION & ENROLLMENT (POST 201, GET 200)
  console.log('\n--- 5. Testing Student Flow (Register 201, Enrollments 200 & 201) ---');
  let studentCookie = '';
  const testStudentEmail = `student.audit.${Date.now()}@example.com`;
  try {
    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Audit Test Student',
        email: testStudentEmail,
        password: 'password123',
        phone: '9876543210',
        city: 'Bangalore',
        courseId: 'course-1',
        paymentChoice: 'DEPOSIT_2000',
      }),
    });
    const regSetCookie = regRes.headers.get('set-cookie');
    const regData = await regRes.json();
    if (regRes.status === 201 && regData.success) {
      if (regSetCookie) studentCookie = regSetCookie.split(';')[0];
      logPass('POST /api/auth/register (New Student Registration)', `201 Created, User ID: ${regData.user?.id}`);
    } else {
      logFail('POST /api/auth/register', `Expected 201, got ${regRes.status}: ${JSON.stringify(regData)}`);
    }
  } catch (e) {
    logFail('POST /api/auth/register', e.message);
  }

  if (studentCookie) {
    const studentHeaders = {
      'Content-Type': 'application/json',
      Cookie: studentCookie,
    };

    // 5a. GET /api/auth/me (authenticated) -> 200 OK
    try {
      const meRes = await fetch(`${BASE_URL}/api/auth/me`, { headers: studentHeaders });
      const meData = await meRes.json();
      if (meRes.status === 200 && meData.user?.email === testStudentEmail) {
        logPass('GET /api/auth/me (Authenticated Student)', `200 OK, Name: ${meData.user.name}`);
      } else {
        logFail('GET /api/auth/me (Student)', `Status ${meRes.status}`);
      }
    } catch (e) {
      logFail('GET /api/auth/me (Student)', e.message);
    }

    // 5b. GET /api/enrollments -> 200 OK
    let studentEnrollmentId = '';
    try {
      const enrRes = await fetch(`${BASE_URL}/api/enrollments`, { headers: studentHeaders });
      const enrData = await enrRes.json();
      if (enrRes.status === 200 && Array.isArray(enrData.enrollments)) {
        studentEnrollmentId = enrData.enrollments[0]?.id;
        logPass('GET /api/enrollments (Student)', `200 OK, ${enrData.enrollments.length} enrollments found`);
      } else {
        logFail('GET /api/enrollments', `Status ${enrRes.status}`);
      }
    } catch (e) {
      logFail('GET /api/enrollments', e.message);
    }

    // 5c. POST /api/enrollments -> 201 Created
    try {
      const newEnrRes = await fetch(`${BASE_URL}/api/enrollments`, {
        method: 'POST',
        headers: studentHeaders,
        body: JSON.stringify({
          courseId: 'course-2',
          batchTiming: 'Weekend Batch (Sat & Sun)',
        }),
      });
      const newEnrData = await newEnrRes.json();
      if (newEnrRes.status === 201 && newEnrData.success) {
        logPass('POST /api/enrollments (Additional Course Enrollment)', `201 Created`);
      } else {
        logFail('POST /api/enrollments', `Expected 201, got ${newEnrRes.status}: ${JSON.stringify(newEnrData)}`);
      }
    } catch (e) {
      logFail('POST /api/enrollments', e.message);
    }

    // 5d. POST /api/student/pay-fee -> 200 OK
    if (studentEnrollmentId) {
      try {
        const payRes = await fetch(`${BASE_URL}/api/student/pay-fee`, {
          method: 'POST',
          headers: studentHeaders,
          body: JSON.stringify({
            enrollmentId: studentEnrollmentId,
            amount: 2500,
            planChosen: 'INSTALLMENT_3',
          }),
        });
        const payData = await payRes.json();
        if (payRes.status === 200 && payData.success) {
          logPass('POST /api/student/pay-fee (Fee Payment installment)', `200 OK, Txn: ${payData.transactionId}`);
        } else {
          logFail('POST /api/student/pay-fee', `Status ${payRes.status}: ${JSON.stringify(payData)}`);
        }
      } catch (e) {
        logFail('POST /api/student/pay-fee', e.message);
      }
    }

    // 5e. POST /api/auth/logout -> 200 OK
    try {
      const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: studentHeaders,
      });
      if (logoutRes.status === 200) {
        logPass('POST /api/auth/logout', `200 OK`);
      } else {
        logFail('POST /api/auth/logout', `Status ${logoutRes.status}`);
      }
    } catch (e) {
      logFail('POST /api/auth/logout', e.message);
    }
  }

  console.log('\n===============================================================');
  console.log(`AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED (Total: ${passed + failed})`);
  console.log('===============================================================\n');

  return { passed, failed, results };
}

testAll().then(({ passed, failed }) => {
  process.exit(failed > 0 ? 1 : 0);
});

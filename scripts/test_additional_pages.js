const BASE = 'http://localhost:3000';

async function testRoute(path, expectedStatus = 200, followRedirects = true) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      redirect: followRedirects ? 'follow' : 'manual'
    });
    const status = res.status;
    const ok = followRedirects ? (status === 200) : (status === expectedStatus || status === 307 || status === 308 || status === 302);
    console.log(`[${ok ? 'PASS' : 'FAIL'}] ${path} -> Status: ${status} (expected ${expectedStatus}, redirectedUrl: ${res.url})`);
    return ok;
  } catch (err) {
    console.error(`[ERROR] ${path} ->`, err.message);
    return false;
  }
}

async function run() {
  console.log('Testing Additional Routes...');
  const routes = [
    ['/search', 200],
    ['/success-stories', 200],
    ['/resources', 200],
    ['/forgot-password', 200],
    ['/enroll', 200],
    ['/enroll/full-stack-mern-nextjs-masterclass', 200],
    ['/career-path', 200],
    ['/blogs', 200],
    ['/student', 200],
    ['/student/dashboard', 200],
    ['/student/courses', 200],
    ['/admin/courses', 200],
    ['/admin/domains', 200],
    ['/admin/blogs', 200],
    ['/admin/enquiries', 200],
    ['/admin/events', 200],
    ['/admin/settings', 200],
    ['/admin/students', 200],
  ];

  let passed = 0;
  for (const [route, status] of routes) {
    const success = await testRoute(route, status, true);
    if (success) passed++;
  }
  console.log(`\nResult: ${passed}/${routes.length} passed.`);
}

run();

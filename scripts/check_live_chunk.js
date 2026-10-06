async function check() {
  console.log('=== CHECKING EVENT MODAL CHUNK ON RENDER ===');
  const eventHtml = await (await fetch('https://apex-tech-institute.onrender.com/events/live-workshop-building-autonomous-genai-agents')).text();
  const eventMatches = eventHtml.match(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g) || [];
  for (const jm of eventMatches) {
    const rel = jm.replace('src="', '').replace('"', '');
    const url = 'https://apex-tech-institute.onrender.com' + rel;
    const js = await (await fetch(url)).text();
    if (js.includes('Book Your Free Workshop Seat')) {
      console.log('Event Registration chunk:', url);
      console.log('Does chunk contain /api/auth/me prefill?:', js.includes('/api/auth/me'));
      console.log('Does chunk contain Book Another Seat?:', js.includes('Book Another Seat'));
    }
  }

  console.log('\n=== CHECKING SKILL PASSPORT CHUNK ON RENDER ===');
  const passportHtml = await (await fetch('https://apex-tech-institute.onrender.com/skill-passport')).text();
  const passportMatches = passportHtml.match(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g) || [];
  for (const jm of passportMatches) {
    const rel = jm.replace('src="', '').replace('"', '');
    const url = 'https://apex-tech-institute.onrender.com' + rel;
    const js = await (await fetch(url)).text();
    if (js.includes('Student LMS Dashboard') || js.includes('Digital Skill Passport')) {
      console.log('Skill Passport chunk:', url);
      console.log('Does chunk contain "Admin Console"?:', js.includes('Admin Console'));
      console.log('Is restricted to student role?:', js.includes('STUDENT'));
    }
  }
}
check();

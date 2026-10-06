async function check() {
  const html = await (await fetch('https://apex-tech-institute.onrender.com/events/live-workshop-building-autonomous-genai-agents')).text();
  const jsMatch = html.match(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g) || [];
  console.log('Found chunks count:', jsMatch.length);
  for (const jm of jsMatch) {
    const rel = jm.replace('src="', '').replace('"', '');
    const url = 'https://apex-tech-institute.onrender.com' + rel;
    const js = await (await fetch(url)).text();
    if (js.includes('Book Your Free Workshop Seat')) {
      console.log('\nFound Event Registration in chunk:', url);
      console.log('Does chunk contain /api/auth/me prefill?:', js.includes('/api/auth/me'));
      console.log('Does chunk contain Book Another Seat?:', js.includes('Book Another Seat'));
    }
  }
}
check();

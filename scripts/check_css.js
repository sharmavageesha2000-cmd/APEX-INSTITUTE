async function checkAllCss() {
  const home = await (await fetch('https://apex-tech-institute.onrender.com/')).text();
  const matches = home.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/g) || [];
  console.log('CSS Links found:', matches);
  for (const m of matches) {
    const rel = m.replace('href="', '').replace('"', '');
    const url = 'https://apex-tech-institute.onrender.com' + rel;
    const css = await (await fetch(url)).text();
    console.log('\n--- Checking CSS File:', url);
    console.log('File Size:', css.length, 'bytes');
    console.log('Contains overflow-x: hidden:', css.includes('overflow-x:hidden') || css.includes('overflow-x:clip'));
    console.log('Contains responsive @media queries:', css.includes('@media'));
    console.log('Contains mobile touch / font-size 16px:', css.includes('font-size:16px') || css.includes('touch-action'));
    console.log('Contains playful-card class:', css.includes('.playful-card'));
    console.log('Contains bright-btn-primary:', css.includes('.bright-btn-primary'));
  }
}

checkAllCss();

const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:3000';
const SRC_DIR = path.join(__dirname, '..', 'src');

function getAllFiles(dir, exts = ['.tsx', '.ts']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else {
      if (exts.includes(path.extname(fullPath))) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

function extractInternalLinks() {
  const files = getAllFiles(SRC_DIR);
  const links = new Set();
  const linkRegex = /href=["'](\/[^"'#?]*)/g;

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const link = match[1];
      if (
        link.startsWith('/') &&
        !link.startsWith('/_next') &&
        !link.startsWith('/api') &&
        !link.includes('${') &&
        !link.includes('{')
      ) {
        links.add(link);
      }
    }
  });

  return Array.from(links);
}

async function verifyLinks() {
  const links = extractInternalLinks();
  console.log(`Extracted ${links.length} unique internal links across all components:`);
  console.log(links);

  let passed = 0;
  let failed = 0;

  for (const link of links) {
    try {
      const res = await fetch(`${BASE}${link}`, { redirect: 'follow' });
      if (res.status === 200) {
        console.log(`[PASS] ${link} -> 200 OK`);
        passed++;
      } else {
        console.error(`[FAIL] ${link} -> ${res.status}`);
        failed++;
      }
    } catch (err) {
      console.error(`[ERROR] ${link} -> ${err.message}`);
      failed++;
    }
  }

  console.log(`\n===========================================`);
  console.log(`LINK VERIFICATION SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log(`===========================================`);

  if (failed > 0) {
    process.exit(1);
  }
}

verifyLinks();

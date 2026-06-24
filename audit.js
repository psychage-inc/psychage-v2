const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const AUDIT_URL = 'https://psychage-v2.vercel.app';
const OUT_DIR = path.join(__dirname, 'audit-screens');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });
  
  const page = await context.newPage();
  
  console.log(`Navigating to ${AUDIT_URL}...`);
  try {
    const response = await page.goto(AUDIT_URL, { waitUntil: 'networkidle', timeout: 30000 });
    console.log(`Status: ${response ? response.status() : 'Unknown'}`);
    await page.screenshot({ path: path.join(OUT_DIR, 'home_375x812.png'), fullPage: true });
    console.log('Successfully loaded home and took screenshot.');
  } catch (err) {
    console.error('Failed to load site:', err.message);
  }
  
  await browser.close();
}

run();

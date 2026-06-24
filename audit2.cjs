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
  
  const snap = async (name) => {
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), fullPage: true });
    console.log(`Saved screenshot: ${name}.png`);
  };

  try {
    // 5. Search Typing / Results
    console.log('Navigating to Search (Typing)...');
    await page.goto(`${AUDIT_URL}/search`, { waitUntil: 'networkidle' });
    const inputs = await page.$$('input');
    if (inputs.length > 0) {
        await inputs[0].fill('anxiety');
        await snap('5_Search_Typing');
        await inputs[0].press('Enter');
        await snap('5_Search_Results');
    }
    
    console.log('Navigating to Search (Empty)...');
    await page.goto(`${AUDIT_URL}/search?q=thisisanimpossiblequery123`, { waitUntil: 'networkidle' });
    await snap('5_Search_Empty');

    // 6. Tools
    console.log('Navigating to Tools...');
    await page.goto(`${AUDIT_URL}/tools`, { waitUntil: 'networkidle' });
    await snap('6_Tools');

    // 7. Find Care
    console.log('Navigating to Find Care...');
    await page.goto(`${AUDIT_URL}/providers`, { waitUntil: 'networkidle' });
    await snap('7_FindCare');

    // 8. Crisis
    console.log('Navigating to Crisis...');
    await page.goto(`${AUDIT_URL}/crisis`, { waitUntil: 'networkidle' });
    await snap('8_Crisis');

    // Footer Accordion Open
    console.log('Opening Footer Accordion...');
    await page.goto(`${AUDIT_URL}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    const footerButtons = await page.$$('footer button');
    if (footerButtons.length > 0) {
        await footerButtons[0].click();
        await snap('9_Footer_Accordion_Open');
    }
  } catch (err) {
    console.error('Error during audit:', err);
  }
  
  await browser.close();
}

run();

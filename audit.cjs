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
  
  // Primary Mobile Viewport
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });
  
  const page = await context.newPage();
  
  const snap = async (name) => {
    // wait a bit for animations/images
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), fullPage: true });
    console.log(`Saved screenshot: ${name}.png`);
  };

  try {
    // 1. Home
    console.log('Navigating to Home...');
    await page.goto(`${AUDIT_URL}/`, { waitUntil: 'networkidle' });
    await snap('1_Home');
    
    // Desktop Home
    const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`${AUDIT_URL}/`, { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(2000);
    await desktopPage.screenshot({ path: path.join(OUT_DIR, 'desktop_Home.png'), fullPage: true });
    await desktopContext.close();

    // 2. Browse - Topics
    console.log('Navigating to Browse (Topics)...');
    await page.goto(`${AUDIT_URL}/learn`, { waitUntil: 'networkidle' });
    await snap('2_Browse_Topics');

    // 2b. Browse - All Articles
    console.log('Navigating to Browse (All Articles)...');
    await page.goto(`${AUDIT_URL}/learn?tab=all`, { waitUntil: 'networkidle' });
    await snap('2_Browse_AllArticles');

    // 2c. Browse - Interest Sheet
    console.log('Navigating to Browse (Interest Sheet)...');
    // See if there's a button to open it. Or URL param:
    await page.goto(`${AUDIT_URL}/learn?interestSheet=open`, { waitUntil: 'networkidle' });
    await snap('2_Browse_InterestSheet');

    // 3. Category (try clicking the first category from /learn)
    console.log('Navigating to Category...');
    await page.goto(`${AUDIT_URL}/learn`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    // We will find a link that goes to /learn/[category]
    const catLink = await page.$('a[href^="/learn/"]:not([href*="tab="])');
    if (catLink) {
        const catHref = await catLink.getAttribute('href');
        console.log(`Found category link: ${catHref}`);
        await page.goto(`${AUDIT_URL}${catHref}`, { waitUntil: 'networkidle' });
        await snap('3_Category_Valid');
        
        // 4. Reader (try clicking first article in category)
        const artLink = await page.$('a[href^="' + catHref + '/"]');
        if (artLink) {
            const artHref = await artLink.getAttribute('href');
            console.log(`Found article link: ${artHref}`);
            await page.goto(`${AUDIT_URL}${artHref}`, { waitUntil: 'networkidle' });
            await snap('4_Reader');
        } else {
            console.log('No article link found in category.');
        }
    } else {
        console.log('No category link found on Browse.');
        // Fallback
        await page.goto(`${AUDIT_URL}/learn/anxiety`, { waitUntil: 'networkidle' });
        await snap('3_Category_Valid_Fallback');
    }

    // Category - Unknown
    console.log('Navigating to Category (Unknown)...');
    await page.goto(`${AUDIT_URL}/learn/unknown-slug-12345`, { waitUntil: 'networkidle' });
    await snap('3_Category_Unknown');

    // 5. Search
    console.log('Navigating to Search (Idle)...');
    await page.goto(`${AUDIT_URL}/search`, { waitUntil: 'networkidle' });
    await snap('5_Search_Idle');
    
    console.log('Navigating to Search (Typing)...');
    await page.fill('input[type="search"]', 'anxiety');
    await snap('5_Search_Typing');
    await page.keyboard.press('Enter');
    await snap('5_Search_Results');
    
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
    // Find something like an accordion trigger in the footer
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

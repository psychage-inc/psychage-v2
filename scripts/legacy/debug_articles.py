
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Listen for console messages
        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))

        print("Navigating to http://localhost:3000/learn")
        try:
            await page.goto("http://localhost:3000/learn", timeout=60000)
            await page.wait_for_load_state("networkidle")

            # Additional wait to ensure data fetching completes (simulated delay is 800ms)
            await page.wait_for_timeout(2000)

            # Check for text
            if await page.get_by_text("Featured").count() > 0:
                 print("Text 'Featured' FOUND in DOM")
            else:
                 print("Text 'Featured' NOT FOUND in DOM")

            if await page.get_by_text("Most Popular").count() > 0:
                 print("Text 'Most Popular' FOUND in DOM")
            else:
                 print("Text 'Most Popular' NOT FOUND in DOM")

            # Execute JS to check articles state if possible (requires exposing it or checking DOM length)
            # We can check the number of article cards rendered
            article_cards_count = await page.locator("article").count() # Assuming ArticleCard renders an <article> tag?
            # Let's check the code for ArticleCard wrapper. It is motion.div.
            # But we can check for text that we know is in the articles.

            # Let's print the entire body text content count to be safe
            content = await page.content()
            print(f"Page content length: {len(content)}")

            # Check for a specific article title known to be in mock data
            # "Understanding Anxiety: A Comprehensive Guide"
            if "Understanding Anxiety" in content:
                print("Article 'Understanding Anxiety' FOUND in content")
            else:
                print("Article 'Understanding Anxiety' NOT FOUND in content")

        except Exception as e:
            print(f"Error: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())

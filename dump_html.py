
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        print("Navigating to http://localhost:3000/learn")
        try:
            await page.goto("http://localhost:3000/learn", timeout=60000)
            await page.wait_for_load_state("networkidle")
            await page.wait_for_timeout(2000)

            # Dump the main content HTML
            content = await page.evaluate("document.querySelector('main').innerHTML")

            with open("dump.html", "w") as f:
                f.write(content)

            print("HTML dumped to dump.html")

        except Exception as e:
            print(f"Error: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())

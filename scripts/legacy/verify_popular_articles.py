
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

            # Wait for data load
            await page.wait_for_timeout(2000)

            # Check for sections
            if await page.get_by_text("Most Popular").is_visible():
                print("Most Popular is visible")
            else:
                print("Most Popular is NOT visible")

            if await page.get_by_text("Featured").is_visible():
                print("Featured is visible")
            else:
                print("Featured is NOT visible")

            # Screenshot
            await page.screenshot(path="verification_screenshot.png", full_page=True)

        except Exception as e:
            print(f"Error: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())

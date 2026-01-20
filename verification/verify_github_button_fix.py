from playwright.sync_api import sync_playwright, expect
import re

def verify_github_button(page):
    page.goto("http://localhost:5173")

    # Locate the GitHub link
    github_link = page.locator('a[href*="github.com/udithgunasekara"]')

    # Verify it is visible
    expect(github_link).to_be_visible()

    # Verify attributes
    expect(github_link).to_have_attribute("target", "_blank")

    # Verify initial state: small width (10 or w-10 class)
    # Checking class presence
    expect(github_link).to_have_class(re.compile(r"w-10"))

    # Hover to expand
    github_link.hover()

    # Wait for transition
    page.wait_for_timeout(500)

    # Take screenshot of the header area to check for overflow (visual check)
    # And check if the body has a horizontal scrollbar.

    # Check if scrollWidth > clientWidth
    width_info = page.evaluate("() => { return { scrollWidth: document.body.scrollWidth, clientWidth: document.body.clientWidth } }")
    print(f"Scroll info: {width_info}")

    if width_info['scrollWidth'] > width_info['clientWidth']:
        print("WARNING: Horizontal scrollbar detected!")
    else:
        print("SUCCESS: No horizontal scrollbar detected.")

    header = page.locator("header")
    header.screenshot(path="verification/header_hover_fixed.png")

    print("Verification script completed.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_github_button(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

import re
from playwright.sync_api import Page, expect

def test_has_title(page: Page):
    page.goto("http://localhost:8000/")

    # Expect a title "to contain" a substring.
    expect(page).get_by_text(re.compile("All Books Login Register Welcome"))

def test_login_button(page: Page):
    page.goto("http://localhost:8000/")

    # Click the get started link.
    page.get_by_role("link", name="Login").click()

    # Expects page to have a heading with the name of Installation.
    expect(page.get_by_placeholder("Email", name="Email")).to_be_visible()





    # page.goto("http://localhost:8000/")
    # page.get_by_text("All Books Login Register Welcome, {email} My Books Add Book Logout").click()
    # page.get_by_role("link", name="Login").click()
    # page.get_by_role("link", name="Register").click()
    # page.get_by_role("link", name="All Books").click()
    # page.locator("li").filter(has_text="To Kill a Mockingbird Type: Classic Details").get_by_role("link").click()
    # page.get_by_text("The unforgettable novel of a childhood in a sleepy Southern town and the crisis ").click()
    # page.get_by_role("heading", name="Description:").click()
    # page.get_by_text("Type: Classic").click()
    # page.get_by_role("heading", name="To Kill a Mockingbird").click()
    # page.get_by_text("Likes: 0").click()
    # page.get_by_role("img").nth(1).click()
    # page.get_by_role("link", name="Login").click()
    # page.get_by_placeholder("Email").click()
    # page.get_by_placeholder("Email").fill("peter@abv.bg")
    # page.get_by_placeholder("Password").click()
    # page.get_by_placeholder("Password").fill("123456")
    # page.get_by_role("button", name="Login").click()
    # page.get_by_role("link", name="My Books").click()
    # page.get_by_role("link", name="Add Book").click()
    # page.get_by_text("Title").click()
    # page.get_by_text("Description").click()
    # page.get_by_text("Image").click()
    # page.get_by_text("Type").click()
    # page.get_by_text("Welcome, peter@abv.bg").click()
    # page.get_by_role("link", name="Logout").click()
    # page.get_by_role("link", name="All Books").click()
    # page.get_by_role("link", name="Login").click()
    # page.get_by_role("button", name="Login").click(button="right")
    # page.get_by_role("link", name="Register").click()
    # page.once("dialog", lambda dialog: dialog.dismiss())
    # page.get_by_role("button", name="Register").click()

    # ---------------------
   
# import re
# from playwright.sync_api import Page, expect

# def test_has_title(page: Page):
#     page.goto("https://playwright.dev/")

#     # Expect a title "to contain" a substring.
#     expect(page).to_have_title(re.compile("Playwright"))

# def test_get_started_link(page: Page):
#     page.goto("https://playwright.dev/")

#     # Click the get started link.
#     page.get_by_role("link", name="Get started").click()

#     # Expects page to have a heading with the name of Installation.
#     expect(page.get_by_role("heading", name="Installation")).to_be_visible()
const { test, expect } = require('@playwright/test');
const pageUrl = 'http://localhost:8000';

test('Verify "All Books" is visible', async ({ page }) => {
    // Increase the timeout if needed
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBookLinkVisible = await allBooksLink.isVisible();
    expect(isAllBookLinkVisible).toBe(true);
});

test('Verrifi Login button is visible', async ({ page }) => {
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);})

test('Verrifi Register button is visible', async ({ page }) => {
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();
    expect(isRegisterButtonVisible).toBe(true);})

test('Verrifi "All Books" link is visible after user login', async ({ page }) => {
    await page.goto('http://localhost:8000/login', { waitUntil: 'domcontentloaded' }); 

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBookLinkVisible = await allBooksLink.isVisible();
    expect(isAllBookLinkVisible).toBe(true);})

test('Login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:8000/login', { waitUntil: 'domcontentloaded' }); 

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:8000/catalog');})

test('Login with empty credentials', async ({ page }) => {
    await page.goto('http://localhost:8000/login', { waitUntil: 'domcontentloaded' }); 
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required');
        await dialog.accept();
    });
        await page.$('a[href="/login"]');
        expect(page.url()).toBe('http://localhost:8000/login');
});

test('Register with empty credentials', async ({ page }) => {
    await page.goto('http://localhost:8000/register', { waitUntil: 'domcontentloaded' }); 
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required');
        await dialog.accept();
    });
        await page.$('a[href="/register"]');
        expect(page.url()).toBe('http://localhost:8000/register');
});

test('Add book with correct data', async ({ page }) => {
    await page.goto('http://localhost:8000/login', { waitUntil: 'domcontentloaded' }); 

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:8000/catalog')
    ])
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill("#title", 'Test Book');
    await page.fill("#description", 'This is a test book Description');
    await page.fill("#image", 'http://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    await page.waitForURL('http://localhost:8000/catalog');
    expect(page.url()).toBe('http://localhost:8000/catalog');
})

test('Add book with empty title field', async ({ page }) => {
    await page.goto('http://localhost:8000/login', { waitUntil: 'domcontentloaded' }); 

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:8000/catalog')
    ])
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    // await page.fill("#title", 'Test Book');
    await page.fill("#description", 'This is a test book Description');
    await page.fill("#image", 'http://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    
    expect(page.url()).toBe('http://localhost:8000/create');
});

test('Login and verify all books are displayed', async ({ page }) => {
    await page.goto('http://localhost:8000/login', { waitUntil: 'domcontentloaded' }); 

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:8000/catalog')
    ])

    await page.waitForSelector('.dashboard');
    const bookElements = await page.$$('.other-books-list li');
    expect(bookElements.length).toBeGreaterThan(0);

});

test('Login and navigate to Details page', async ({ page }) => {
    await page.goto('http://localhost:8000/login', { waitUntil: 'domcontentloaded' }); 

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:8000/catalog')
    ])
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');
});

test('Verify redirection of Logout link after user is logged in', async ({ page }) => {
    await page.goto('http://localhost:8000/login', { waitUntil: 'domcontentloaded' }); 

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();

    const redirectedUrl = page.url();
    expect(redirectedUrl).toBe('http://localhost:8000/');

})

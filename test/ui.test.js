const { test, expect } = require('@playwright/test');
const pageUrl = 'http://localhost:3000';

test('Verrifi "All Books" is visible', async ({ page }) => {
    await page.goto(pageUrl);
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBookLinkVisible = await allBooksLink.isVisible();
    expect(isAllBookLinkVisible).toBe(true);})

    test('Verrifi Login button is visible', async ({ page }) => {
        await page.goto(pageUrl);
        await page.waitForSelector('nav.navbar');
        const liginButton = await page.$('a[href="/login"]');
        const isLoginButtonVisible = await liginButton.isVisible();
        expect(isLoginButtonVisible).toBe(true);})
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  const getStartedLink = await page.getByRole('link', { name: 'Get Started' })
  await expect(getStartedLink).toBeVisible()
  await getStartedLink.click();
  await expect(page).toHaveURL('https://playwright.dev/docs/intro')
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

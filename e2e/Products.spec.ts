import { test, expect } from '@playwright/test';

test('has heading + navigates to cart', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()
    await page.getByRole('link', { name: '22' }).click();

    await expect(page).toHaveURL('http://localhost:5173/cart')
});

test('', () => { })



import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  // Go to http://localhost:3001/
  await page.goto('http://localhost:3001/')

  // Click div[role="menuitem"]:has-text("creator1")
  await page.locator('div[role="menuitem"]:has-text("creator1")').click()

  // Click [aria-label="Close"]
  await page.locator('[aria-label="Close"]').click()

  // Click [aria-label="account"]
  await page.locator('[aria-label="account"]').click()

  // Click text=Account
  await page.locator('text=Account').click()
  await expect(page).toHaveURL('http://localhost:3001/settings/account')

  // Click button:has-text("Deactivate your account")
  await page.locator('button:has-text("Deactivate your account")').click()

  // Click button[name="yes"]
  await page.locator('button[name="yes"]').click()
  await expect(page).toHaveURL('http://localhost:3001/')
})

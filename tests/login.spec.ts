import { test, expect } from '@playwright/test';
  
test('[VLE-LOGIN-001] Login dengan email dan password valid', async ({ page }) => {
  await page.goto('https://sso.staging.varnion.net.id/login');
  await page.locator('[id="email"]').click();
  await page.locator('[id="email"]').fill('superadmin@test.dev');
  await page.locator('[id="password"]').click();
  await page.locator('[id="password"]').fill('@Superadmin123');
  await page.locator('[data-slot="button"]').click();

  await expect(page.getByText('Login berhasil')).toBeVisible();
});

test('[VLE-LOGIN-002] Login dengan format email tidak valid', async ({ page }) => {
    await page.goto('https://sso.staging.varnion.net.id/login');
    await page.locator('[id="email"]').click();
    await page.locator('[id="email"]').fill('adminvlepo.id');
    await page.locator('[id="password"]').click();
    await page.locator('[id="password"]').fill('@Superadmin123');
    await page.locator('[data-slot="button"]').click();
  
    await expect(page.getByText('Invalid email format')).toBeVisible();
  });
  
test('[VLE-LOGIN-003] Login dengan password salah', async ({ page }) => {
    await page.goto('https://sso.staging.varnion.net.id/login');
    await page.locator('[id="email"]').click();
    await page.locator('[id="email"]').fill('superadmin@test.dev');
    await page.locator('[id="password"]').click();
    await page.locator('[id="password"]').fill('12345');
    await page.locator('[data-slot="button"]').click();
  
    await expect(page.getByText('wrong password')).toBeVisible();
});

test('[VLE-LOGIN-004] Password kurang dari 8 karakter', async ({ page }) => {
    await page.goto('https://sso.staging.varnion.net.id/login');
    await page.locator('[id="email"]').click();
    await page.locator('[id="email"]').fill('superadmin@test.dev');
    await page.locator('[id="password"]').click();
    await page.locator('[id="password"]').fill('12345');
    await page.locator('[data-slot="button"]').click();
  
    await expect(page.getByText('Password must be at least 8 characters and include uppercase, lowercase, number, and symbol')).toBeVisible();
});

test('[VLE-LOGIN-005] Field kosong (email & password)', async ({ page }) => {
    await page.goto('https://sso.staging.varnion.net.id/login');
    await page.locator('[data-slot="button"]').click();
  
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
});

test('[VLE-LOGIN-006] Email lebih dari 50 karakter', async ({ page }) => {
    await page.goto('https://sso.staging.varnion.net.id/login');
    await page.locator('[id="email"]').click();
    await page.locator('[id="email"]').fill('superadmindengannamalebihdari50karakterrrr@test.dev');
    await page.locator('[id="password"]').click();
    await page.locator('[id="password"]').fill('@Superadmin');
    await page.locator('[data-slot="button"]').click();
  
    await expect(page.getByText('Maximal 50 character')).toBeVisible();
});

test('[VLE-LOGIN-007] Password lebih dari 50 karakter', async ({ page }) => {
    await page.goto('https://sso.staging.varnion.net.id/login');
    await page.locator('[id="email"]').click();
    await page.locator('[id="email"]').fill('superadmin@test.dev');
    await page.locator('[id="password"]').click();
    await page.locator('[id="password"]').fill('@Superadmindenganpasswordharuslebihdari50karakterrr');
    await page.locator('[data-slot="button"]').click();
  
    await expect(page.getByText('Maximal 50 character')).toBeVisible();
});

test('[VLE-LOGIN-008] Toggle visibilitas password', async ({ page }) => {
  await page.goto('https://sso.staging.varnion.net.id/login');
    
  const passwordField = page.locator('#password');
  const toggleButton = page.locator('button:has(svg)').first(); 

  await expect(passwordField).toHaveAttribute('type', 'password');
  await passwordField.fill('rahasia123');
  await toggleButton.click();
  await expect(passwordField).toHaveAttribute('type', 'text');
  const value = await passwordField.inputValue();
  expect(value).toBe('rahasia123');
  await toggleButton.click();
  await expect(passwordField).toHaveAttribute('type', 'password');
});


test('[VLE-LOGIN-009] Tombol aktif hanya jika field valid', async ({ page }) => {
    await page.goto('https://sso.staging.varnion.net.id/login');
    const emailField = page.locator('[id="email"]');
  const passwordField = page.locator('[id="password"]');
  const loginButton = page.locator('[data-slot="button"]');

  await expect(loginButton).toBeDisabled();
  await emailField.fill('fira@example.com');
  await expect(loginButton).toBeDisabled();
  await passwordField.fill('rahasia123');
  await expect(loginButton).toBeEnabled();
  await emailField.fill('');
  await expect(loginButton).toBeDisabled();
});

// test('[VLE-LOGIN-005] Field kosong (email & password)', async ({ page }) => {
//     await page.goto('https://sso.staging.varnion.net.id/login');
//     await page.locator('[data-slot="button"]').click();
  
//     await expect(page.getByText('Email is required')).toBeVisible();
//     await expect(page.getByText('Password is required')).toBeVisible();
// });


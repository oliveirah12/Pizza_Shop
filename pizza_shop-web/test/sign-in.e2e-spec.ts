import { test, expect } from '@playwright/test';

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: 'networkidle'});

  await page.getByRole('textbox', { name: 'Seu e-mail' }).fill('johndoe@example.com')

  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = page.getByText('Opa deu bom')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)

});

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: 'networkidle'});

  await page.getByRole('textbox', { name: 'Seu e-mail' }).fill('ron@example.com')

  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = page.getByText('Deu ruim')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)

});

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: 'networkidle'});

  await page.getByRole('link', { name: 'Novo Estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')

});



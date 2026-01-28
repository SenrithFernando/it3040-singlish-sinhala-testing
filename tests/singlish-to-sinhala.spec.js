import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test('SwiftTranslator: user can type Singlish and UI responds', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', {
    waitUntil: 'domcontentloaded',
  });

  const input = page.locator('textarea').first();

  // Ensure input box is usable
  await expect(input).toBeVisible();

  // Type Singlish text
  await input.fill('mama gedhara yanavaa');

  // Small wait to allow UI processing
  await page.waitForTimeout(1500);

  // Assertion: input still contains text (no crash, no reset)
  const typedText = await input.inputValue();
  expect(typedText).toContain('mama');

  // Optional visual proof
  await page.screenshot({ path: 'swifttranslator_test.png' });
});

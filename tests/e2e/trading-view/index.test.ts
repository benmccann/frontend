import { expect, test } from '@playwright/test';

test.describe('trading data overview', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/trading-view');
	});

	test('should include blockchain count in blockchain tile', async ({ page }) => {
		const blockchains = page.getByText(/data from \d+ blockchains/);
		await expect(blockchains).toBeVisible();
	});

	test('should include exchange count in exchanges tile', async ({ page }) => {
		const exchanges = page.getByText(/data from [\d,]+ decentralised exchanges/);
		await expect(exchanges).toBeVisible();
	});

	test('should include pairs count in trading pairs tile', async ({ page }) => {
		const pairs = page.getByText(/data from [\d,]+ trading pairs/);
		await expect(pairs).toBeVisible();
	});

	test('should include database size in backtesting tile', async ({ page }) => {
		const database = page.getByText(/[\d.,] GB worth of data available/);
		await expect(database).toBeVisible();
	});
});

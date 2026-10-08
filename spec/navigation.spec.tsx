import { expect, test } from '@playwright/test'

import { noop } from '@/utils/messages/utils'

import { buildBasePath } from '../src/basePath'

test('navigation highlights the destination before its page loads', async ({
	page,
}) => {
	const root = buildBasePath(process.env)
	await page.goto(root)
	await page.waitForLoadState('networkidle')
	let release: () => void = noop
	const responseGate = new Promise<void>((resolve) => {
		release = resolve
	})
	await page.route('**/RSC/**', async (route) => {
		await responseGate
		await route.continue()
	})
	const blog = page.getByRole('link', { name: 'blog', exact: true })
	await blog.click()
	try {
		await expect(blog).toHaveAttribute('aria-current', 'page')
		await expect(
			page.getByRole('heading', { name: 'About Me', exact: true }),
		).toBeVisible()
	} finally {
		release()
	}
	await expect(page).toHaveURL(new RegExp(`${root}blog$`))
	await expect(
		page.getByRole('heading', { name: 'Blog', exact: true }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { name: 'About Me', exact: true }),
	).not.toBeVisible()
	await page.emulateMedia({ reducedMotion: 'reduce' })
	await page.goBack()
	await expect(
		page.getByRole('link', { name: 'about', exact: true }),
	).toHaveAttribute('aria-current', 'page')
	await expect(page).toHaveURL(new RegExp(`${root}$`))
	await expect(
		page.getByRole('heading', { name: 'About Me', exact: true }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { name: 'Blog', exact: true }),
	).not.toBeVisible()
})

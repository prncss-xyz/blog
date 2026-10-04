import { describe, expect, test } from 'vite-plus/test'

import { mdToHtml } from './createMD'

describe('list depth regression', () => {
	test('nested ul/ol carry data-depth through the full real pipeline', async () => {
		const html = await mdToHtml(
			'- top\n  - nested\n    - deep\n1. a\n   1. b\n      1. c\n',
		)
		expect(html).toContain('<ul data-depth="0"')
		expect(html).toContain('<ul data-depth="1"')
		expect(html).toContain('<ul data-depth="2"')
		expect(html).toContain('<ol data-depth="0"')
		expect(html).toContain('<ol data-depth="1"')
		expect(html).toContain('<ol data-depth="2"')
	})
})

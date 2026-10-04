import { readFile } from 'node:fs/promises'

import { describe, expect, test } from 'vite-plus/test'

import { mdToHtml, mdToText } from './createMD'

describe('mdToText', async () => {
	test('converts markdown to plain text', async () => {
		expect(await mdToText('# Hello **world**\n\n- one\n- two')).toBe(
			'Hello world\n\none\ntwo\n',
		)
	})
})

describe('mdToHtml', () => {
	test('wires dual-theme token variables to visible syntax colors', async () => {
		const [html, css] = await Promise.all([
			mdToHtml('```js\nconst x = 3\n```'),
			readFile('src/pages/syntax-highlighting.css', 'utf8'),
		])

		expect(html).toContain('<span')
		expect(html).toMatch(/<span[^>]*style="[^"]*--shiki-light:/)
		expect(html).toMatch(/<span[^>]*style="[^"]*--shiki-dark:/)
		expect(css).toMatch(/code\[data-theme\*=['"] ['"]\] span/)
		expect(css).toContain('color: var(--shiki-light)')
		expect(css).toContain('color: var(--shiki-dark)')
	})

	test('renders mermaid diagrams on the server using the site font', async () => {
		const html = await mdToHtml(
			'a test paragraph\n\n```mermaid\nflowchart TD\n  Start([Start]) --> Timer[Start the timer]\n  Timer --> Decide{Need a break?}\n  Decide -- Yes --> Pause[Pause]\n  Decide -- No --> Done[Done]\n```',
		)

		// `img-svg` embeds the diagram as `<img src="data:image/svg+xml,...">`, so the
		// SVG payload is URL-encoded inside the data URI rather than inlined.
		expect(html).toContain('<picture>')
		expect(html).toMatch(
			/<source[^>]*media="\(prefers-color-scheme: dark\)"[^>]*srcset="data:image\/svg\+xml,/,
		)
		expect(html).toContain('<img')
		expect(html).toMatch(/src="data:image\/svg\+xml,/)
		// Labels must be rendered as native SVG `<text>`/`<tspan>` (htmlLabels:false),
		// never as HTML inside `<foreignObject>` — which is invisible under `<img>`.
		expect(html).not.toContain('foreignObject')
		const encodedSvg = html.match(/src="data:image\/svg\+xml,([^"]+)"/)?.[1]
		expect(encodedSvg).toBeDefined()
		const svg = decodeURIComponent(encodedSvg!.replaceAll('&#x27;', "'"))
		// Mermaid's flowchart path omits `xml:space` on its word-tspans, so the
		// SVG root must preserve their leading word-separator whitespace.
		expect(svg).toContain("xml:space='preserve'")
		expect(svg).toContain('font-family:Nunito')
		// SVGs loaded through `<img>` cannot use the document's @font-face rules.
		// Embed the font fetched from the site's shared webfont source into the SVG.
		expect(svg).toContain('@font-face')
		expect(svg).toContain('data:font/woff2;base64,')
		expect(svg).not.toContain('font-family:arial,sans-serif')
		const encodedThemeSvgs = [
			...html.matchAll(/(?:src|srcset)="data:image\/svg\+xml,([^"]+)"/g),
		]
		expect(encodedThemeSvgs).toHaveLength(2)
		for (const [, encodedThemeSvg] of encodedThemeSvgs) {
			const themeSvg = decodeURIComponent(
				encodedThemeSvg!.replaceAll('&#x27;', "'"),
			)
			expect(themeSvg).toContain('@font-face')
			expect(themeSvg).toContain('data:font/woff2;base64,')
		}
		expect(html).not.toContain('<pre><code')
	})
})

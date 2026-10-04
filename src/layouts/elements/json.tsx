'use client'

import * as stylex from '@stylexjs/stylex'
import { type ReactNode, useEffect, useState } from 'react'
import { createHighlighter } from 'shiki'

import { Box, type BoxProps } from '../Box'
import { shikiThemes } from '../shiki'

type Highlighter = Awaited<ReturnType<typeof createHighlighter>>

const highlighterPromise = createHighlighter({
	langs: ['json'],
	themes: [shikiThemes.light, shikiThemes.dark],
})

let cachedHighlighter: Highlighter | null = null

highlighterPromise.then((highlighter) => {
	cachedHighlighter = highlighter
})

const styles = stylex.create({
	loading: {
		whiteSpace: 'pre-wrap',
	},
})

function highlightJson(highlighter: Highlighter, jsonStr: string): string {
	return highlighter.codeToHtml(jsonStr, {
		lang: 'json',
		themes: shikiThemes,
		transformers: [
			{
				pre(node) {
					const currentClass = node.properties.className
					const currentClasses = Array.isArray(currentClass)
						? currentClass.map(String)
						: []
					node.properties.className = currentClasses
				},
			},
		],
	})
}

function CodeBox(
	props:
		| { children: ReactNode }
		| ({ dangerouslySetInnerHTML: { __html: string } } & Omit<
				BoxProps<'div'>,
				'children' | 'dangerouslySetInnerHTML'
		  >),
) {
	return <Box monospace fontSize={2} p={4} {...props} />
}

export function Json({
	u,
	...rest
}: { u: unknown } & Omit<BoxProps<'div'>, 'children'>) {
	const jsonStr = JSON.stringify(u, null, 2)

	const [html, setHtml] = useState<string | null>(() => {
		if (cachedHighlighter) {
			return highlightJson(cachedHighlighter, jsonStr)
		}
		return null
	})

	useEffect(() => {
		if (cachedHighlighter) {
			setHtml(highlightJson(cachedHighlighter, jsonStr))
			return
		}

		let active = true
		highlighterPromise.then((highlighter) => {
			if (!active) return
			setHtml(highlightJson(highlighter, jsonStr))
		})
		return () => {
			active = false
		}
	}, [jsonStr])

	if (html === null) {
		return (
			<CodeBox {...rest}>
				cacac
				<pre {...stylex.props(styles.loading)}>{jsonStr}</pre>
			</CodeBox>
		)
	}
	return <CodeBox {...rest} dangerouslySetInnerHTML={{ __html: html }} />
}

'use client'

import * as stylex from '@stylexjs/stylex'
import { useLayoutEffect, useRef } from 'react'

import { scrollbars } from '@/layouts/tokens/scrollbars.stylex'

const styles = stylex.create({
	probe: {
		position: 'fixed',
		width: 100,
		height: 100,
		overflowY: 'scroll',
		visibility: 'hidden',
		pointerEvents: 'none',
	},
})

export function ScrollbarMetrics() {
	const ref = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const probe = ref.current
		if (!probe) return
		const property = scrollbars.width.slice(4, -1)
		function measure() {
			if (!probe) return
			document.documentElement.style.setProperty(
				property,
				`${probe.offsetWidth - probe.clientWidth}px`,
			)
		}
		measure()
		const observer = new ResizeObserver(measure)
		observer.observe(probe)
		window.addEventListener('resize', measure)
		return () => {
			observer.disconnect()
			window.removeEventListener('resize', measure)
			document.documentElement.style.removeProperty(property)
		}
	}, [])

	return <div ref={ref} aria-hidden='true' {...stylex.props(styles.probe)} />
}

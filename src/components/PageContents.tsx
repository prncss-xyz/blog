'use client'

import { type ReactNode, useSyncExternalStore, ViewTransition } from 'react'

import { Col } from '@/layouts/Box'

function subscribeToReducedMotion(onChange: () => void) {
	const media = window.matchMedia('(prefers-reduced-motion: reduce)')
	media.addEventListener('change', onChange)
	return () => media.removeEventListener('change', onChange)
}

function getReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function PageContents({ children }: { children: ReactNode }) {
	const reducedMotion = useSyncExternalStore(
		subscribeToReducedMotion,
		getReducedMotion,
		() => true,
	)
	return (
		<ViewTransition default={reducedMotion ? 'none' : 'auto'}>
			<Col grow={1}>{children}</Col>
		</ViewTransition>
	)
}

'use client'

import * as stylex from '@stylexjs/stylex'
import { type ReactNode, ViewTransition } from 'react'
import { useRouter } from 'waku'

import { Col } from '@/layouts/Box'
import { animationDurations } from '@/layouts/tokens/animationDurations.stylex'

const crossfade = stylex.viewTransitionClass({
	group: {
		animationDuration: animationDurations.normal,
		animationTimingFunction: 'linear',
	},
	old: {
		animationDuration: animationDurations.normal,
		animationTimingFunction: 'linear',
	},
	new: {
		animationDuration: animationDurations.normal,
		animationTimingFunction: 'linear',
	},
})

export function PageContents({ children }: { children: ReactNode }) {
	const { path } = useRouter()

	return (
		<ViewTransition key={path} name='page-contents' default={crossfade}>
			<Col bg='translucent' p={3} minW='readable' grow={1} as='main'>
				{children}
			</Col>
		</ViewTransition>
	)
}

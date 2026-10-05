'use client'

import * as stylex from '@stylexjs/stylex'
import { Component, createRef, type ReactNode } from 'react'
import { useRouter } from 'waku'

import { Col } from '@/layouts/Box'
import { animationDurations } from '@/layouts/tokens/animationDurations.stylex'

const styles = stylex.create({
	layers: { position: 'relative', isolation: 'isolate' },
	content: {
		animationDuration: animationDurations.normal,
		// StyleX's validator and types predate plus-lighter; keep its runtime value.
		// oxlint-disable-next-line stylex/valid-styles
		mixBlendMode: 'plus-lighter' as 'normal',
	},
	outgoing: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		pointerEvents: 'none',
	},
})

type ContentProps = { path: string; children: ReactNode }

// Waku's route children resolve through context, so retaining the ReactNode
// would render the new page twice. Snapshot the DOM before React mutates it.
class ContentCrossfade extends Component<ContentProps> {
	private layers = createRef<HTMLDivElement>()
	private content = createRef<HTMLDivElement>()
	private outgoing: HTMLElement | null = null
	private animations: Animation[] = []

	getSnapshotBeforeUpdate(previous: ContentProps) {
		return previous.path !== this.props.path
			? (this.content.current?.cloneNode(true) ?? null)
			: null
	}

	componentDidUpdate(
		_previous: ContentProps,
		_state: unknown,
		snapshot: Node | null,
	) {
		if (!(snapshot instanceof HTMLElement)) return
		this.clearAnimation()
		const content = this.content.current
		const layers = this.layers.current
		if (!content || !layers) return

		const duration =
			Number.parseFloat(getComputedStyle(content).animationDuration) * 1000
		if (!duration) return

		const { className } = stylex.props(styles.outgoing)
		if (className) snapshot.classList.add(...className.split(' '))
		snapshot.inert = true
		snapshot.setAttribute('aria-hidden', 'true')
		layers.append(snapshot)
		this.outgoing = snapshot

		const options = { duration, easing: 'linear', fill: 'both' as const }
		this.animations = [
			snapshot.animate({ opacity: [1, 0] }, options),
			content.animate({ opacity: [0, 1] }, options),
		]
		void Promise.all(
			this.animations.map((animation) => animation.finished),
		).then(
			() => {
				if (this.outgoing === snapshot) this.clearAnimation()
			},
			() => {},
		)
	}

	componentWillUnmount() {
		this.clearAnimation()
	}

	private clearAnimation() {
		this.animations.forEach((animation) => animation.cancel())
		this.animations = []
		this.outgoing?.remove()
		this.outgoing = null
	}

	render() {
		return (
			<Col ref={this.layers} grow={1} style={styles.layers}>
				<Col ref={this.content} grow={1} style={styles.content}>
					{this.props.children}
				</Col>
			</Col>
		)
	}
}

export function PageContents({ children }: { children: ReactNode }) {
	const { path } = useRouter()
	return (
		<Col bg='translucent' p={5} minW='readable' grow={1} as='main'>
			<ContentCrossfade path={path}>{children}</ContentCrossfade>
		</Col>
	)
}

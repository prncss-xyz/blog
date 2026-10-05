import * as stylex from '@stylexjs/stylex'
import { allPages } from 'content-collections'
import { settings } from 'content-collections'
import type { ReactNode } from 'react'

import { NavLink } from '@/components/NavLink'
import { PageContents } from '@/components/PageContents'
import { PageMeta } from '@/components/PageMeta'
import { LinkIcons } from '@/features/IconLinks'
import { Box, Col, Row } from '@/layouts/Box'
import { DevStyleXInject } from '@/layouts/DevStyleXInject'
import { borderRadii } from '@/layouts/tokens/borderRadii.stylex'
import { colors } from '@/layouts/tokens/colors.stylex'
import { sizeBreakpoints } from '@/layouts/tokens/sizeBreakpoints.stylex'
import { basePath } from '@/meta'
const { title, description } = settings

const styles = stylex.create({
	header: {
		maxWidth: '45rem',
	},
	navLink: {
		color: {
			default: colors.muted,
			':is([aria-current="page"])': colors.text,
		},
	},
	panel: {
		borderRadius: {
			default: borderRadii[1],
			[sizeBreakpoints.readableOrLess]: '0px',
		},
	},
	pageBackground: (imageUrl: string) => ({
		backgroundColor: '#303030',
		backgroundImage: imageUrl,
		backgroundPosition: '0 -44.500383px',
		backgroundRepeat: 'repeat',
	}),
})

export default async function RootLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<Col
			pt={8}
			fontFamily='base'
			minH='screen'
			align='center'
			justify='between'
		>
			<PageMeta title={title} description={description} />
			<link
				rel='icon'
				type='image/svg+xml'
				href={basePath + 'images/favicon.svg'}
			/>
			<DevStyleXInject />
			<Row
				as='header'
				style={styles.header}
				pb={4}
				w='full'
				align='center'
				justify='between'
				borderColor='accent'
				borderWidth='thin'
				border='bottom'
			>
				<Box fontSize={5}>{title}</Box>
				<Row gap={5}>
					{allPages.map(({ slug, title }) => {
						const to = '/' + (slug === 'about' ? '' : slug)
						return (
							<Box as={NavLink} key={to} to={to} style={styles.navLink}>
								{title}
							</Box>
						)
					})}
				</Row>
			</Row>
			<Col
				style={styles.pageBackground(
					`url("${basePath}images/hex-pattern.svg")`,
				)}
				w='full'
				grow={1}
				pt={8}
				pb={6}
				gap={8}
				align='center'
				justify='between'
			>
				<PageContents style={styles.panel}>{children}</PageContents>
				<Row
					style={styles.panel}
					minW='readable'
					justify='center'
					py={3}
					color='accent'
					bg='translucent'
					gap={4}
					as='footer'
				>
					<LinkIcons />
				</Row>
			</Col>
		</Col>
	)
}

export async function getConfig() {
	return {
		render: 'static',
	} as const
}

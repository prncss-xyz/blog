import * as stylex from '@stylexjs/stylex'
import { allPages } from 'content-collections'
import { settings } from 'content-collections'
import type { ReactNode } from 'react'

import { Menu } from '@/components/Menu'
import { PageContents } from '@/components/PageContents'
import { PageMeta } from '@/components/PageMeta'
import { LinkIcons } from '@/features/IconLinks'
import { Box, Col, Row } from '@/layouts/Box'
import { DevStyleXInject } from '@/layouts/DevStyleXInject'
import { basePath } from '@/meta'
const { title, description } = settings

type RootLayoutProps = { children: ReactNode }

const styles = stylex.create({
	pageBackground: (imageUrl: string) => ({
		backgroundColor: '#303030',
		backgroundImage: imageUrl,
		backgroundPosition: '0 -44.500383px',
		backgroundRepeat: 'repeat',
	}),
})

export default async function RootLayout({ children }: RootLayoutProps) {
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
				px={6}
				pb={4}
				w='full'
				align='center'
				justify='between'
				borderColor='accent'
				borderWidth='thin'
				border='bottom'
			>
				<Box fontSize={5}>{title}</Box>
				<Menu home='about' allPages={allPages} />
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
				<PageContents>{children}</PageContents>
				<Row color='accent' gap={4} as='footer'>
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

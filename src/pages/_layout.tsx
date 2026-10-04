import { allPages } from 'content-collections'
import { settings } from 'content-collections'
import type { ReactNode } from 'react'

import { Menu } from '@/components/Menu'
import { PageMeta } from '@/components/PageMeta'
import { LinkIcons } from '@/features/IconLinks'
import { Box, Col, Row } from '@/layouts/Box'
import { DevStyleXInject } from '@/layouts/DevStyleXInject'
import { basePath } from '@/meta'
const { title, description } = settings

type RootLayoutProps = { children: ReactNode }

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<Col
			pt={8}
			pb={6}
			gap={8}
			fontFamily='base'
			minH='screen'
			align='center'
			justify='between'
		>
			<PageMeta title={title} description={description} />
			<link
				rel='icon'
				type='image/png'
				href={basePath + 'images/favicon.png'}
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
			<Col bg='translucent' p={3} minW='readable' grow={1} as='main'>
				{children}
			</Col>
			<Row color='accent' gap={4} as='footer'>
				<LinkIcons />
			</Row>
		</Col>
	)
}

export async function getConfig() {
	return {
		render: 'static',
	} as const
}

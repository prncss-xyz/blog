import type { IconType } from 'react-icons'
import { FaBluesky, FaGithub, FaLinkedin, FaRss } from 'react-icons/fa6'

import { Row } from '@/layouts/Box'
import { links } from '@/links'
import { basePath } from '@/meta'

const mediaIcons = {
	LinkedIn: FaLinkedin,
	GitHub: FaGithub,
	BlueSky: FaBluesky,
} as const

function IconLink({
	href,
	title,
	Icon,
	type,
}: {
	href: string
	title: string
	Icon: IconType
	type?: string
}) {
	return (
		<Row
			as='a'
			href={href}
			target='_blank'
			rel='noreferrer'
			title={title}
			aria-label={title}
			type={type}
			align='baseline'
			justify='center'
			color='text'
		>
			<Icon aria-hidden='true' focusable='false' size={24} />
		</Row>
	)
}

export function LinkIcons() {
	return (
		<Row gap={4}>
			{links.map((link) => (
				<IconLink
					key={link.type}
					title={link.type}
					Icon={mediaIcons[link.type]}
					href={link.payload}
				/>
			))}
			<IconLink
				href={basePath + 'rss.xml'}
				title='RSS feed'
				Icon={FaRss}
				type='application/rss+xml'
			/>
		</Row>
	)
}

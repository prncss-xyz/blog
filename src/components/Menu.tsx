'use client'
import { useOptimistic, useTransition } from 'react'
import { Link, useRouter } from 'waku'

import { Box, Row, type BoxProps } from '@/layouts/Box'

export function Menu({
	home,
	allPages,
	...rest
}: {
	home: string
	allPages: {
		slug: string
		title: string
	}[]
} & BoxProps<'div'>) {
	const { path, push } = useRouter()
	const [selectedPath, selectPath] = useOptimistic(path)
	const [, startTransition] = useTransition()
	return (
		<Row {...rest}>
			{allPages.map(({ slug, title }) => {
				const to = '/' + (slug === home ? '' : slug)
				return (
					<Box
						px={5}
						color={selectedPath === to ? 'text' : 'muted'}
						aria-current={selectedPath === to ? 'page' : undefined}
						as={Link}
						key={String(to)}
						to={to as any}
						onClick={(event) => {
							if (
								event.defaultPrevented ||
								event.button !== 0 ||
								event.metaKey ||
								event.ctrlKey ||
								event.shiftKey ||
								event.altKey
							)
								return
							event.preventDefault()
							startTransition(async () => {
								selectPath(to)
								await push(to as any)
							})
						}}
					>
						{title}
					</Box>
				)
			})}
		</Row>
	)
}

'use client'
import { type ComponentProps, useOptimistic, useTransition } from 'react'
import { Link, useRouter } from 'waku'

export function NavLink({
	to,
	children,
	onClick,
	...rest
}: Omit<ComponentProps<typeof Link>, 'to'> & { to: string }) {
	const { path, push } = useRouter()
	const [selectedPath, selectPath] = useOptimistic(path)
	const [, startTransition] = useTransition()
	return (
		<Link
			{...rest}
			aria-current={selectedPath === to ? 'page' : undefined}
			to={to as any}
			onClick={(event) => {
				onClick?.(event)
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
			{children}
		</Link>
	)
}

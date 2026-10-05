import * as stylex from '@stylexjs/stylex'
import qr from 'qrcode'

import { Box, Col } from '@/layouts/Box'

const styles = stylex.create({
	qr: {
		objectFit: 'cover',
	},
})

async function QRCode({ href, name }: { href: string; name: string }) {
	const svgString = await qr.toString(href, { type: 'svg' })
	return (
		<img
			alt={name}
			src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`}
			{...stylex.props([styles.qr])}
		/>
	)
}

export function QRView({ href, name }: { href: string; name: string }) {
	return (
		<Col align='center' gap={5}>
			<QRCode href={href} name={name} />
			<Box fontSize={4} fontWeight='bold' as='a' href={href}>
				{name}
			</Box>
		</Col>
	)
}

import { settings } from 'content-collections'

import { QRView } from '@/components/QR'
import { Col } from '@/layouts/Box'
import { baseUrl } from '@/meta'

const { title } = settings

export default async function QRPage() {
	return (
		<Col>
			<title>{'QR CODE - ' + title}</title>
			<QRView href={baseUrl} name={title} />
		</Col>
	)
}

export async function getConfig() {
	return {
		render: 'static',
	} as const
}

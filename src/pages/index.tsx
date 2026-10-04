import { PageMeta } from '@/components/PageMeta'
import { MD } from '@/layouts/MD'
import { getPage } from '@/utils/getPage'

const page = getPage('about')

export default async function HomePage() {
	return (
		<>
			<PageMeta {...page} />
			<MD>{page.content}</MD>
		</>
	)
}

export async function getConfig() {
	return {
		render: 'static',
	} as const
}

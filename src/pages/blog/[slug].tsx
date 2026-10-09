import { allBlogs } from 'content-collections'

import { PageMeta } from '@/components/PageMeta'
import { Col } from '@/layouts/Box'
import { MD } from '@/layouts/MD'
import { getOne } from '@/utils/getOne'

export default async function BlogPage({ slug }: { slug: string }) {
	const blog = getOne(allBlogs, (blog) => blog.slug === slug)
	return (
		<Col p={5} grow={1}>
			<PageMeta {...blog} />
			<MD>{blog.content}</MD>
		</Col>
	)
}

export async function getConfig() {
	return {
		render: 'static',
		staticPaths: allBlogs.map((blog) => blog._meta.path),
	} as const
}

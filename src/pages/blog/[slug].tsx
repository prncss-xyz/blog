import { allBlogs } from 'content-collections'

import { PageMeta } from '@/components/PageMeta'
import { MD } from '@/layouts/MD'
import { getOne } from '@/utils/getOne'

export default async function BlogPage({ slug }: { slug: string }) {
	const blog = getOne(allBlogs, (blog) => blog.slug === slug)
	return (
		<>
			<PageMeta {...blog} />
			<MD>{blog.content}</MD>
		</>
	)
}

export async function getConfig() {
	return {
		render: 'static',
		staticPaths: allBlogs.map((blog) => blog._meta.path),
	} as const
}

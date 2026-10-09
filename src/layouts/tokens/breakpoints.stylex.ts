import { defineConsts } from '@stylexjs/stylex'

const readable = '45rem'

export const breakpoints = defineConsts({
	md: `@media (min-width: ${readable})`,
})

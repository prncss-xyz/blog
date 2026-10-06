import { defineConsts } from '@stylexjs/stylex'

const readable = '45rem'

export const sizeBreakpoints = defineConsts({
	readableOrLess: `@media (max-width: ${readable})`,
})

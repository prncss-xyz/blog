import { defineVars } from '@stylexjs/stylex'

import { sizeBreakpoints } from './sizeBreakpoints.stylex'

export const sizes = defineVars({
	none: '0rem',
	full: '100%',
	readable: `min(${sizeBreakpoints.readable}, 100vw)`,
	qrContainer: '16rem',
})

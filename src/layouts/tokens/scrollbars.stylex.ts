import { defineVars } from '@stylexjs/stylex'

export const scrollbars = defineVars({
	// Reserve space on the first render; ScrollbarMetrics refines it per browser.
	width: '15px',
})

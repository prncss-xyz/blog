import { vi } from 'vite-plus/test'

;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

vi.mock('@stylexjs/stylex', () => ({
	create: (x: any) => x,
	props: () => ({}),
	defineVars: (x: any) => x,
}))

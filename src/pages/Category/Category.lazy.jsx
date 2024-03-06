import { lazy } from 'react'

export default lazy(() =>
	import('./Category.jsx').then((module) => ({
		default: module.Category,
	}))
)

import { lazy } from 'react'

export default lazy(() =>
	import('./NotFound.jsx').then((module) => ({
		default: module.NotFound,
	}))
)

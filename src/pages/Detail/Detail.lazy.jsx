import { lazy } from 'react'

export default lazy(() =>
	import('./Detail.jsx').then((module) => ({
		default: module.Detail,
	}))
)

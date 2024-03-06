import { lazy } from 'react'

export default lazy(() =>
	import('./Home.jsx').then((module) => ({
		default: module.Home,
	}))
)

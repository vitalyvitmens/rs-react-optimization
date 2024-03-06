import { lazy } from 'react'

export default lazy(() =>
	import('./Login.jsx').then((module) => ({
		default: module.Login,
	}))
)

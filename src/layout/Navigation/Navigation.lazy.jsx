import { lazy } from 'react'

export default lazy(() =>
	import('./Navigation.jsx').then((module) => ({
		default: module.Navigation,
	}))
)

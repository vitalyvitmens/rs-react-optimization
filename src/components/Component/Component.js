import React, { Suspense } from 'react'

const ComponentName = (name) => {
	return React.lazy(() =>
		import(`../../components/${name}`).then((module) => ({
			default: module[name],
		}))
	)
}
export function Component(props) {
	const Component = ComponentName(props.name)

	return (
		<Suspense fallback="Загрузка...">
			<Component {...props}/>
		</Suspense>
	)
}

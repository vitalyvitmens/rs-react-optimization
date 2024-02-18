import { AuthProvider } from './context/AuthProvider'
import { lazy } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './components'
import { Navigation } from './layout'
import { Login } from './pages'
import styles from './app.module.css'

// const Login = lazy(() =>
//   import('./pages/Login/Login.jsx').then((module) => ({
//     default: module.Login,
//   }))
// )
const Home = lazy(() =>
	import('./pages/Home/Home.jsx').then((module) => ({ default: module.Home }))
)
const Category = lazy(() =>
	import('./pages/Category/Category.jsx').then((module) => ({
		default: module.Category,
	}))
)
const Detail = lazy(() =>
	import('./pages/Detail/Detail.jsx').then((module) => ({
		default: module.Detail,
	}))
)
const NotFound = lazy(() =>
	import('./pages/NotFound/NotFound.jsx').then((module) => ({
		default: module.NotFound,
	}))
)

export const App = () => {
	return (
		<div className={styles.App}>
			<HashRouter>
				<AuthProvider>
					<Routes>
						<Route element={<Navigation />}>
							<Route path="/" element={<Home />} />
							<Route
								path="/:category"
								element={
									<PrivateRoute>
										<Category />
									</PrivateRoute>
								}
							/>
							<Route
								path="/:category/:id"
								element={
									<PrivateRoute>
										<Detail />
									</PrivateRoute>
								}
							/>
							<Route path="*" element={<NotFound />} />
						</Route>
						<Route path="/login" element={<Login />} />
					</Routes>
				</AuthProvider>
			</HashRouter>
		</div>
	)
}

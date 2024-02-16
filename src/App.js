import { AuthProvider } from './context/AuthProvider'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, Category, Detail, NotFound, Login } from './pages'
import { PrivateRoute } from './components'
import styles from './app.module.css'

export const App = () => {
	return (
		<div className={styles.App}>
			<HashRouter>
				<AuthProvider>
					<Routes>
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
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</AuthProvider>
			</HashRouter>
		</div>
	)
}

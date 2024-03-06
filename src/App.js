import { AuthProvider } from './context/AuthProvider'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Login from './pages/Login/Login.lazy'
import Navigation from './layout/Navigation/Navigation.lazy'
import Home from './pages/Home/Home.lazy'
import Category from './pages/Category/Category.lazy'
import Detail from './pages/Detail/Detail.lazy'
import NotFound from './pages/NotFound/NotFound.lazy'
import styles from './app.module.css'

export const App = () => {
	return (
		<div className={styles.App}>
			<HashRouter>
				<AuthProvider>
					<Routes>
						<Route
							element={
								<ErrorBoundary>
									<Navigation />
								</ErrorBoundary>
							}
						>
							<Route path="/" element={<Home />} />
							<Route
								path="/:category"
								element={
									<PrivateRoute>
										<ErrorBoundary>
											<Category />
										</ErrorBoundary>
									</PrivateRoute>
								}
							/>
							<Route
								path="/:category/:id"
								element={
									<PrivateRoute>
										<ErrorBoundary>
											<Detail />
										</ErrorBoundary>
									</PrivateRoute>
								}
							/>
							<Route
								path="*"
								element={
									<ErrorBoundary>
										<NotFound />
									</ErrorBoundary>
								}
							/>
						</Route>
						<Route
							path="/login"
							element={
								<ErrorBoundary>
									<Login />
								</ErrorBoundary>
							}
						/>
					</Routes>
				</AuthProvider>
			</HashRouter>
		</div>
	)
}

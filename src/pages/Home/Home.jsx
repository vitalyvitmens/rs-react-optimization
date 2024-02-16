import { Navigation } from '../../components'
import styles from './Home.module.css'

export const Home = () => {
	return (
		<div className={styles.Home}>
			<Navigation />
			<h1>Добро пожаловать в приложение по вселенной Рика и Морти!</h1>
		</div>
	)
}

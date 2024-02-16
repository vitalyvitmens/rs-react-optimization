import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import styles from './AuthStatus.module.css'

export function AuthStatus() {
	const navigate = useNavigate()
	const auth = useAuth()

	const handleSignout = () => {
		auth.signout(() => {
			navigate('/')
		})
	}

	if (auth.user === null) {
		return (
			<div className={styles.authStatus}>
				Вы не авторизованы!
				<Button onClick={() => navigate('/login')}>Авторизоваться</Button>
			</div>
		)
	}

	return (
		<div className={styles.authStatus}>
			Добро пожаловать <span style={{ fontWeight: 'bold' }}>{auth.user}</span>
			<Button onClick={handleSignout}>Выйти</Button>
		</div>
	)
}

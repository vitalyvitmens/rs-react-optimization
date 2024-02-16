import { useAuth } from '../../context/AuthProvider'
import { Button, CustomInput } from '../../components'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Login.module.css'

export const Login = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const auth = useAuth()
	const from = location.state?.from || '/'

	const handleSubmit = (e) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const username = formData.get('username')

		auth.signin(username, () => {
			navigate(from, {
				replace: true,
			})
		})
	}

	return (
		<div className={styles.Login}>
			<form onSubmit={handleSubmit}>
				<CustomInput
					label={'USERNAME'}
					type="text"
					id="text"
					name="username"
          autoComplete="name"
					placeholder={'Ваше имя'}
					radius={5}
					size={20}
				/>
				<Button type="submit">Login</Button>
			</form>
		</div>
	)
}

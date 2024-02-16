import { AuthStatus } from '../AuthStatus/AuthStatus'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import styles from './Navigation.module.css'

export const Navigation = () => {
	return (
		<div className={styles.Navigation}>
			<Link to="/">
				<img
					src={logo}
					alt="logo"
					width="70"
					height="70"
					style={{ borderRadius: '50%' }}
				/>
			</Link>
      <div className={styles.authCenter}><AuthStatus /></div>
			<div className={styles.center}>
				<Link to="/characters">Герои</Link>
				<Link to="/locations">Локации</Link>
				<Link to="/episodes">Эпизоды</Link>
			</div>
		</div>
	)
}

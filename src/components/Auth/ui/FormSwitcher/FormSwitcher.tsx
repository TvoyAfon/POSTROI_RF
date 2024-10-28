import { FC } from 'react'
import styles from '../../Auth.module.scss'

interface IFormSwitcher {
	handleClick: () => void
	isLogin: boolean
}

const FormSwitcher: FC<IFormSwitcher> = ({ handleClick, isLogin }) => {
	return (
		<div className={styles.auth_container_buttons}>
			<button onClick={handleClick} style={{ backgroundColor: isLogin ? '#7099ED' : '#F4F3F1', color: isLogin ? 'white' : 'black' }}>
				Вход
			</button>
			<button onClick={handleClick} style={{ backgroundColor: !isLogin ? '#7099ED' : '#F4F3F1', color: isLogin ? 'black' : 'white' }}>
				Регистрация
			</button>
		</div>
	)
}

export default FormSwitcher
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import styles from './AuthRegisterPassword.module.scss'

const LoginSignature = () => {
	const formData = useSelector((state: RootState) => state.register.formData)

	return (
		<div className={styles.container_block}>
			<span>{formData.email ? 'Логин' : 'Телефон'}: {formData.email || formData.tel}</span>
		</div>
	)
}

export default LoginSignature
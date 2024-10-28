import { ChangeEvent, FC, useState } from 'react'
import view2_img from '../../../../../assets/images/auth_images/Property 1=Variant2 (1).png'
import view_img from '../../../../../assets/images/auth_images/view.png'
import { IField } from '../field.props'
import styles from './PasswordField.module.scss'

const PasswordField: FC<IField> = ({ onChangeValue, onFormatError, placeholder,onKeyDown }) => {
	const [password, setPassword] = useState<string>('')
	const [isPasswordShowed, setIsPasswordShowed] = useState<boolean>(true)

	const handleToggleShow = () => setIsPasswordShowed(!isPasswordShowed)

	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		const passwd = e.target.value

		setPassword(passwd)
		onChangeValue && onChangeValue(passwd)

		if (passwd.length < 6) {
			onFormatError && onFormatError(true)
		} else {
			onFormatError && onFormatError(false)
		}
	}

	return (
		<div style={{
			position: 'relative',
			width: '100%'
		}}>
			<input onKeyDown={onKeyDown} className={styles.field} autoComplete='new-password' onChange={handleChangePassword} value={password} required type={isPasswordShowed ? 'password' : 'text'} placeholder={placeholder || 'Пароль'} />
			<img onClick={handleToggleShow} style={{ width: '20px', height: '20px', position: 'absolute', right: '15px', top: '10px', cursor: 'pointer' }} src={isPasswordShowed ? view_img : view2_img} alt="view" />
		</div>
	)
}

export default PasswordField
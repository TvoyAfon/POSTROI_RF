import { CSSProperties, FC } from 'react'
import RadioButton from '../../../ui/RadioButton/RadioButton'
import styles from '../../Auth.module.scss'

interface IAuthTypeSwitcher {
	selectRadioButton?: () => void
	isPhone?: boolean
	style?: CSSProperties
}

const AuthTypeSwitcher: FC<IAuthTypeSwitcher> = ({ selectRadioButton, isPhone, style = {} }) => {
	return (
		<div className={styles.auth_container_radioInput} style={style}>
			<RadioButton label='E-mail' onClick={selectRadioButton} checked={!isPhone} />
			<RadioButton label='Телефон' onClick={selectRadioButton} checked={isPhone} />
		</div>
	)
}

export default AuthTypeSwitcher
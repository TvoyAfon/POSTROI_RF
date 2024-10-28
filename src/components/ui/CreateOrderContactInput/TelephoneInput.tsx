import React from 'react'
import { ITextArea } from '../../../interface/createOrderTextArea'
import styles from './TelephoneInput.module.scss'

const TelephoneInput: React.FC<ITextArea> = ({ style, placeholder, onChange, value, disabled, name }) => {
	return (
		<input name={name} disabled={disabled} onChange={onChange} value={value} className={styles.contactInput} style={style} placeholder={placeholder} />
	)
}

export default TelephoneInput

import React from 'react'
import { ITextAreaProps } from '../../../interface/createOrderTextArea'
import styles from './CreateOrderTextArea.module.scss'

const CreateOrderTextArea: React.FC<ITextAreaProps> = ({ placeholder, value, onChange, style, name }) => {
	return (
		<textarea name={name} style={style} value={value} onChange={onChange} className={styles.createOrderTextArea} placeholder={placeholder} />
	)
}

export default CreateOrderTextArea

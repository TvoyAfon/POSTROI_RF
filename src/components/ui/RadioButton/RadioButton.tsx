import { CSSProperties, FC, HTMLAttributes, useEffect, useState } from 'react'
import styles from './RadioButton.module.scss'

interface IRadioButton extends HTMLAttributes<HTMLDivElement> {
	checked?: boolean
	isCheckedByDefault?: boolean
	onChangeChecked?: (isChecked: boolean) => void
	className?: string
	label?: string,
	labelStyle?: CSSProperties
}

const RadioButton: FC<IRadioButton> = ({ checked = false, isCheckedByDefault = false, onChangeChecked, onClick, labelStyle, className = '', label = '', ...props }) => {

	const [isChecked, setIsChecked] = useState<boolean>(isCheckedByDefault)

	useEffect(() => {
		setIsChecked(checked)
	}, [checked])

	{/*const handleChange = () => {
		const state = !isChecked
		setIsChecked(state)
		onChangeChecked && onChangeChecked(state)
	}*/}

	return (
		<div onClick={onClick} className={styles['radio__container']}>
			<div className={`${styles.radio} ${className}`} {...props}>
				<div className={`${isChecked ? styles['radio__checked'] : styles['radio_default']}`}></div>
			</div>
			<span style={labelStyle} className={styles['radio__label']}>{label}</span>
		</div>

	)
}

export default RadioButton
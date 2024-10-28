import React, { CSSProperties } from 'react'
import CheckboxButton from '../../../../ui/CheckboxButton/CheckboxButton'
import styles from './CheckBoxGroup.module.scss'

export interface ICheckBoxGroup {
	label1?: string,
	label2?: string,
	style?: CSSProperties,
	labelProp?: CSSProperties,
	checked1?: boolean,
	onClick1?: () => void,
	checked2?: boolean,
	onClick2?: () => void
}

const CheckBoxGroup: React.FC<ICheckBoxGroup> = ({ label1, label2, style, labelProp, checked1, onClick1, checked2, onClick2 }) => {
	return (
		<div style={style} className={styles.checkbox_container}>
			<CheckboxButton checked={checked1} onClick={onClick1} labelStyle={{ fontWeight: 700, ...labelProp }} label={label1} />
			<CheckboxButton checked={checked2} onClick={onClick2} labelStyle={{ fontWeight: 700, ...labelProp }} label={label2} />
		</div>
	)
}

export default CheckBoxGroup

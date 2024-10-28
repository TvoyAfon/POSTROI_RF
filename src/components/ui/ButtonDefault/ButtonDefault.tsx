import React from 'react'
import { IButtonDefault } from '../../../interface/buttonDefault.props'
import styles from './ButtonDefault.module.scss'

const ButtonDefault: React.FC<IButtonDefault> = ({ onClick, children, style }) => {
	return (
		<button className={styles.button} onClick={onClick} style={style}>{children}</button>
	)
}

export default ButtonDefault

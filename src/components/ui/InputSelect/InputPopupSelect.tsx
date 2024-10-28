import React from 'react'
import { IInputSelectPopup } from '../../../interface/inputselect.props'
import styles from './InputSelect.module.scss'

const InputPopupSelect: React.FC<IInputSelectPopup> = ({ width, children }) => {
	return (
		<div className={styles.inputPopupSelect} style={{ position: 'absolute', width: width, cursor: 'pointer' }}>
			{children}
		</div>
	)
}

export default InputPopupSelect

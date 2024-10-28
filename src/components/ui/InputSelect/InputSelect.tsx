import React, { useState } from 'react'
import arrow_bottom from '../../../assets/images/createOrder_img/circle-arrow-down-01.svg'
import { IInputSelect } from '../../../interface/inputselect.props'
import InputPopupSelect from './InputPopupSelect'
import styles from './InputSelect.module.scss'
const InputSelect: React.FC<IInputSelect> = ({ value, placeholder, onChange, width = '400px', children, bg = '#F4F3F1' }) => {

	const [openSelect, setOpenSelect] = useState(false)
	const handleChange = () => {
		setOpenSelect(true)
		onChange && onChange()
	}

	return (
		<div className={styles.input} style={{ position: 'relative' }}>
			<input
				style={{ height: 40, width: width, backgroundImage: `url(${arrow_bottom},)`, backgroundPosition: '95%,50%', backgroundRepeat: 'no-repeat', backgroundColor: bg }}

				type="text"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				className={styles.inputSelect} />
			{openSelect && <InputPopupSelect children={children} width={width} />}
		</div>
	)
}

export default InputSelect

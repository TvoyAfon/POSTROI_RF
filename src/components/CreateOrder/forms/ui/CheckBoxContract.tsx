import React, { useState } from 'react'
import CheckboxButton from '../../../ui/CheckboxButton/CheckboxButton'
import Tooltip from '../../../ui/Tooltip/Tooltip'
import { flexRow } from '../styles/stylesCreateOrder'

const CheckBoxContract: React.FC<{ onClick: () => void, valueContract: boolean, valueDocument: boolean, onClickDoc: () => void }> = ({ onClick, valueContract, valueDocument, onClickDoc }) => {
	const [open, setOpen] = useState(valueContract)
	const handleClick = () => {
		setOpen(!open)
		onClick()
	}
	return (
		<div className='flex-column'>
			<div style={flexRow}>
				<CheckboxButton
					checked={valueContract}
					onClick={handleClick}
					label='Вам нужен договор?' /><Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			{open && <div style={{ paddingLeft: 20 }}>
				<CheckboxButton
					onClick={onClickDoc}
					checked={valueDocument}
					label='Вам нужны закрывающие или отчетные документы?' />
			</div>}
		</div>
	)
}

export default CheckBoxContract

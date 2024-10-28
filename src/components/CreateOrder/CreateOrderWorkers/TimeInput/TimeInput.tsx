import React from 'react'
import { useSelector } from 'react-redux'
import clock from '../../../../assets/clock.svg'
import { useModal } from '../../../../hooks/useModal'
import { ITimeInput } from '../../../../interface/modal.props'
import { RootState } from '../../../../store/store'
import styles from './TimeInput.module.scss'
import TimeInputPopup from './TimeInputPopup'

const TimeInput: React.FC<ITimeInput> = () => {
	const { handleClose, handleOpen, isOpen } = useModal()
	const { dataWorkers } = useSelector((state: RootState) => state.createOrderWorkersData)
	return (
		<div className={styles.timeInput} style={{ display: 'flex', gap: 14, alignItems: 'center', position: 'relative',zIndex:2 }}>
			<input value={dataWorkers.time} disabled style={{ width: 100, backgroundColor: "#F4F3F1" }} placeholder='Время' type="text" />
			<img onClick={() => handleOpen()} src={clock} style={{ cursor: 'pointer' }} alt="clock" />
			{isOpen && <TimeInputPopup
				onClose={handleClose} />}
		</div>
	)
}

export default TimeInput

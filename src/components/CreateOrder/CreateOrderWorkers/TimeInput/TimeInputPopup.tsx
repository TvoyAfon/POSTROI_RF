import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ITimeInput } from '../../../../interface/modal.props'
import { addOrderWorkersData } from '../../../../store/slices/data/OrderDataWorkers'
import { RootState } from '../../../../store/store'
import Button from '../../../ui/Button/Button'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import CodeInput from '../../../ui/CodeInput/CodeInput'
import styles from './TimeInput.module.scss'

const TimeInputPopup: React.FC<ITimeInput> = ({ onClose }) => {
	const dispatch = useDispatch()
	const { dataWorkers } = useSelector((state: RootState) => state.createOrderWorkersData)
	const [min, setMin] = useState("")
	const [hour, setHours] = useState('')
	const [error, setError] = useState('')

	const validateTime = (hour: string, min: string) => {
		const hourInt = parseInt(hour)
		const minInt = parseInt(min)

		if (isNaN(hourInt) || isNaN(minInt)) {
			return false
		}

		return hourInt >= 0 && hourInt <= 23 && minInt >= 0 && minInt <= 59
	}

	const handleConfirm = () => {
		if (validateTime(hour, min)) {
			dispatch(addOrderWorkersData({
				...dataWorkers, time: `${hour}:${min}`
			}))
			onClose && onClose()
		} else {
			setError('Пожалуйста, введите корректное время в формате HH:MM (00:00 - 23:59)')
		}
	}

	return (
		<div className={styles.popup}>
			<div style={{ display: 'flex', justifyContent: 'end' }}>
				<CloseButton onClick={onClose} />
			</div>
			<div className='flex-column gap-medium' style={{ alignItems: 'center' }}>
				<span className='textSizeL' style={{ textAlign: 'center', color: '#7099ED' }}>Время</span>
				<div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
					<div>
						<CodeInput onChange={(e) => setHours(e)} placeholder='Ч' inputStyle={{ width: 48, height: 80 }} fields={2} name='time-inpt-hour' inputMode='tel' />
					</div>
					<span style={{ fontSize: 24, color: 'gray' }}>:</span>
					<div>
						<CodeInput onChange={(e) => setMin(e)} placeholder='М' inputStyle={{ width: 48, height: 80 }} fields={2} name='time-inpt-minute' inputMode='tel' />
					</div>
				</div>
				{error && <span style={{ color: 'red' }}>{error}</span>}
				<Button onClick={handleConfirm} style={{ width: 170 }}>Подтвердить</Button>
			</div>
		</div>
	)
}

export default TimeInputPopup

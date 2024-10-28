import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderWorkersData } from '../../../store/slices/data/OrderDataWorkers'
import { addAddressError, addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import InputAddress from '../../ui/InputAddress/InputAddress'
import InputCalendar from '../../ui/InputCalendar/InputCalendar'
import TimeInput from './TimeInput/TimeInput'

const CreateOrderWorkersContacts: React.FC = () => {
	const { dateFlag } = useSelector((state: RootState) => state.calendarReducer)
	const [currentAddress, setCurrentAddress] = useState('')
	const dispatch = useDispatch()
	const { dataWorkers } = useSelector((state: RootState) => state.createOrderWorkersData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	useEffect(() => {
		if (currentAddress) {
			dispatch(addOrderWorkersData({ ...dataWorkers, where: currentAddress }))// Update address when currentAddress changes
		}
	}, [currentAddress])

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const onChangeDate = (date: string, dateObjStart: Date, dateObjEnd: Date) => {
		dispatch(addOrderWorkersData({ ...dataWorkers, when: date, dateObjEnd, dateObjStart }))
	}
	const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addAddressError(e.target.value))
		dispatch(addOrderWorkersData({ ...dataWorkers, where: e.target.value }))
	}


	return (
		<div className='flex-column'>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
				<span style={{ fontWeight: 700, paddingBottom: 12, fontSize: 16 }}>Когда нужна услуга?</span>
				<section style={{ display: 'flex', gap: 12 }}>
					<InputCalendar style={{ width: 350 }} dataValue={dataWorkers.when} onChange={onChangeDate} />
					<TimeInput />
				</section>
				{error.inputDateError && !dateFlag && <error.inputDateError />}
			</div>
			<section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Где выполнить работу?</span>
				<div>
					<InputAddress
						setCurrentAddress={setCurrentAddress}
						onChange={handleLocationChange}
						value={dataWorkers.where} />
					{error.inputAddressError && dataWorkers.where.length === 0 && <error.inputAddressError />}</div>
			</section>
		</div>

	)
}

export default CreateOrderWorkersContacts

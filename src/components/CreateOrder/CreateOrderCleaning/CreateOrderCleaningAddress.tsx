import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { validationNumber } from '../../../common/validationNumber'
import { addOrderCleaningData } from '../../../store/slices/data/OrderDataCleaning'
import { addAddressError, addClickFlag, addTelephoneError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import TelephoneInput from '../../ui/CreateOrderContactInput/TelephoneInput'
import InputAddress from '../../ui/InputAddress/InputAddress'
import InputCalendar from '../../ui/InputCalendar/InputCalendar'

const CreateOrderCleaningAddress: React.FC = () => {
	const { dateFlag } = useSelector((state: RootState) => state.calendarReducer)
	const [currentAddress, setCurrentAddress] = useState('')
	const dispatch = useDispatch()
	const { dataCleaning } = useSelector((state: RootState) => state.createOrderCleaningData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)
	
	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	useEffect(() => {
		if (currentAddress) {
			dispatch(addOrderCleaningData({ ...dataCleaning, address: currentAddress }))// Update address when currentAddress changes
		}
	}, [currentAddress])



	const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderCleaningData({ ...dataCleaning, address: e.target.value }))
		dispatch(addAddressError(e.target.value))
	}
	const onChangeDate = (date: string, dateObjStart: Date, dateObjEnd: Date) => {
		dispatch(addOrderCleaningData({ ...dataCleaning, date: date, dateObjEnd, dateObjStart }))
	}
	const handleChangeTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (validationNumber(e).length < 13) {
			dispatch(addOrderCleaningData({ ...dataCleaning, telephone: validationNumber(e) }))
			dispatch(addTelephoneError(e.target.value))
		}
	}

	return (
		<div className='flex-column'>
			<div className='flex-column gap-medium'>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Адрес:</span>
				<div>
					<InputAddress
						setCurrentAddress={setCurrentAddress}
						value={dataCleaning.address}
						onChange={handleChangeAddress} />
					{error.inputAddressError && dataCleaning.address.length === 0 && <error.inputAddressError />}</div>
			</div>
			<div className='flex-column gap-medium'>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Когда нужна услуга:</span>
				<div>
					<InputCalendar
						dataValue={dataCleaning.date}
						onChange={onChangeDate} />
					{error.inputDateError && !dateFlag && <error.inputDateError />}
				</div>
			</div>
			<div className='flex-column gap-medium'>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Контактный телефон</span>
				<div>
					<TelephoneInput
						onChange={handleChangeTelephone}
						value={dataCleaning.telephone}
						style={{ width: 285 }}
						placeholder='+7' />
					{error.inputTelephoneError && dataCleaning.telephone.length === 0 && <error.inputTelephoneError />}</div>
			</div>

		</div>
	)
}

export default CreateOrderCleaningAddress

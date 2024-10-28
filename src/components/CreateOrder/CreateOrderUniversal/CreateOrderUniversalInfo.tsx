import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validationNumber } from '../../../common/validationNumber'
import { addOrderUniversalData } from '../../../store/slices/data/OrderUniversalData'
import { addAddressError, addClickFlag, addTelephoneError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import Field from '../../ui/Field/Field'
import InputAddress from '../../ui/InputAddress/InputAddress'
import InputCalendar from '../../ui/InputCalendar/InputCalendar'

const CreateOrderUniversalInfo: React.FC = () => {
	const { dateFlag } = useSelector((state: RootState) => state.calendarReducer)
	const { dataUniversal } = useSelector((state: RootState) => state.createOrderUniversalData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])


	const handleChangeTel = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (validationNumber(e).length < 13) {
			dispatch(addOrderUniversalData({ ...dataUniversal, phone: validationNumber(e) }))
			dispatch(addTelephoneError(e.target.value))
		}
	}

	const onChangeDate = (date: string) => {
		dispatch(addOrderUniversalData({ ...dataUniversal, date: date }))
	}

	const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderUniversalData({ ...dataUniversal, address: e.target.value }))
		dispatch(addAddressError(e.target.value))
	}


	return (
		<div className='flex-column'>
			<div className='flex-column gap-small'>
				<span className='textSizeM'>Когда нужна услуга</span>
				<InputCalendar
					onChange={onChangeDate}
					dataValue={dataUniversal.date} />
				{error.inputDateError && !dateFlag && <error.inputDateError />}
			</div>
			<div className='flex-column gap-small'>
				<span className='textSizeM'>Где выполнить работу</span>
				<InputAddress
					onChange={handleChangeAddress}
					value={dataUniversal.address} />
				{error.inputAddressError && dataUniversal.address.length === 0 && <error.inputAddressError />}
			</div>
			<div className='flex-column gap-small'>
				<span className='textSizeM'>Контактный телефон</span>
				<Field
					value={dataUniversal.phone}
					onChange={handleChangeTel}
					placeholder='+7'
					style={{ width: 284 }} />
				{error.inputTelephoneError && dataUniversal.phone.length < 12 && <error.inputTelephoneError />}
			</div>
		</div>
	)
}

export default CreateOrderUniversalInfo

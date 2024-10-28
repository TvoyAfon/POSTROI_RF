import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validationNumber } from '../../../common/validationNumber'
import { addOrderTruckingData } from '../../../store/slices/data/OrderDataTrucking'
import { addAddressError, addClickFlag, addTelephoneError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import Field from '../../ui/Field/Field'
import InputAddress from '../../ui/InputAddress/InputAddress'
import InputCalendar from '../../ui/InputCalendar/InputCalendar'
import styles from './CreateOrderTrucking.module.scss'

const CreateOrderTruckingInfo: React.FC = () => {
	const { dateFlag } = useSelector((state: RootState) => state.calendarReducer)
	const [currentAddress, setCurrentAddress] = useState('')
	const dispatch = useDispatch()
	const { dataTrucking } = useSelector((state: RootState) => state.createOrderTruckingData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	useEffect(() => {
		if (currentAddress) {
			dispatch(addOrderTruckingData({ ...dataTrucking, where: currentAddress }))// Update address when currentAddress changes
		}
	}, [currentAddress])


	const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderTruckingData({ ...dataTrucking, where: e.target.value }))
		dispatch(addAddressError(e.target.value))
	}
	const onChangeDate = (date: string, dateObjStart: Date, dateObjEnd: Date) => {
		dispatch(addOrderTruckingData({ ...dataTrucking, when: date, dateObjEnd, dateObjStart }))
	}
	const onChangeTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (validationNumber(e).length < 13) {
			dispatch(addOrderTruckingData({ ...dataTrucking, telephone: validationNumber(e) }))
			dispatch(addTelephoneError(e.target.value))
		}
	}

	return (
		<div className={styles.truckingInfo} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
			<section>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Когда нужна услуга?</span>
				<InputCalendar
					dataValue={dataTrucking.when}
					onChange={onChangeDate} />
				{error.inputDateError && dateFlag && !dataTrucking.when && <error.inputDateError />}
			</section>
			<section>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Где выполнить работу?</span>
				<InputAddress
					setCurrentAddress={setCurrentAddress}
					onChange={onChangeAddress}
					value={dataTrucking.where} />
				{error.inputAddressError && dataTrucking.where.length === 0 && <error.inputAddressError />}
			</section>
			<section style={{ display: 'flex', flexDirection: 'column' }}>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Контактный телефон</span>
				<Field onChange={onChangeTelephone} value={dataTrucking.telephone} name='telephone' style={{ width: 284 }} placeholder='+7' />
				{error.inputTelephoneError && <error.inputTelephoneError />}
			</section>
		</div>
	)
}

export default CreateOrderTruckingInfo

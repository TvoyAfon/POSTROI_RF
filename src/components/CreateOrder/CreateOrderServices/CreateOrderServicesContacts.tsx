import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validationNumber } from '../../../common/validationNumber'
import { addOrderServicesData } from '../../../store/slices/data/OrderDataServices'
import { addAddressError, addClickFlag, addTelephoneError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import TelephoneInput from '../../ui/CreateOrderContactInput/TelephoneInput'
import InputAddress from '../../ui/InputAddress/InputAddress'
import styles from './CreateOrderServices.module.scss'

const CreateOrderServicesContacts: React.FC = () => {

	const dispatch = useDispatch()
	const { dataServices } = useSelector((state: RootState) => state.createOrderServicesData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)
	const [currentAddress, setCurrentAddress] = useState('')

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	useEffect(() => {
		if (currentAddress) {
			dispatch(addOrderServicesData({ ...dataServices, address: currentAddress }))// Update address when currentAddress changes
		}
	}, [currentAddress])


	const handleChangeTel = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (validationNumber(e).length < 13) {
			dispatch(addOrderServicesData({ ...dataServices, telephone: validationNumber(e) }))
			dispatch(addTelephoneError(e.target.value))
		}
	}

	const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderServicesData({ ...dataServices, address: e.target.value }))
		dispatch(addAddressError(e.target.value))
	}

	return (
		<div className={styles.createOrderServicesContacts}>
			<div className='flex-column gap-medium'>
				<span style={{ fontSize: 16, fontWeight: 700 }}>Контактный телефон</span>
				<TelephoneInput onChange={handleChangeTel} value={dataServices.telephone} placeholder='+7' style={{ width: 284 }} />
				{error.inputTelephoneError && dataServices.telephone.length === 0 && <error.inputTelephoneError />}
			</div>
			<div className='flex-column gap-medium'>
				<span style={{ fontSize: 16, fontWeight: 700 }} >Адрес:</span>
				<InputAddress
					setCurrentAddress={setCurrentAddress}
					onChange={handleChangeAddress}
					value={dataServices.address} />
				{error.inputAddressError && dataServices.address.length === 0 && <error.inputAddressError />}
			</div>

		</div>
	)
}

export default CreateOrderServicesContacts

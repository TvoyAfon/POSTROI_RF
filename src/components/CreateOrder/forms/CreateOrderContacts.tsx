import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validationNumber } from '../../../common/validationNumber'
import { addOrderData } from '../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { addAddressError, addClickFlag, addDateError, addTelephoneError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CheckboxButton from '../../ui/CheckboxButton/CheckboxButton'
import TelephoneInput from '../../ui/CreateOrderContactInput/TelephoneInput'
import InputAddress from '../../ui/InputAddress/InputAddress'
import InputCalendar from '../../ui/InputCalendar/InputCalendar'
import Tooltip from '../../ui/Tooltip/Tooltip'
import { flexRow } from './styles/stylesCreateOrder'

const CreateOrderContacts: React.FC = () => {
	const [currentAddress, setCurrentAddress] = useState('')
	const dispatch = useDispatch()
	const { data } = useSelector((state: RootState) => state.createOrderData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	useEffect(() => {
		if (currentAddress) {
			dispatch(addOrderData({ ...data, address: currentAddress }))// Update address when currentAddress changes
		}
	}, [currentAddress])

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])


	const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderData({ ...data, address: e.target.value }))
		dispatch(addAddressError(e.target.value))
	}

	const onChangeDate = (date: string, dateObjStart: Date, dateObjEnd: Date) => {
		dispatch(addOrderData({ ...data, date: date, dateObjEnd, dateObjStart }))
		dispatch(addDateError(date))

	}
	const handleChangeTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (validationNumber(e).length < 13) {
			dispatch(addOrderData({ ...data, telephone: validationNumber(e) }))
			dispatch(addTelephoneError(e.target.value))
		}
	}

	const handleClickChat = () => {
		dispatch(addOrderData({
			...data, connect: {
				...data.connect,
				chat: !data.connect.chat
			}
		}))
	}
	const handleClickPhone = () => {
		dispatch(addOrderData({
			...data, connect: {
				...data.connect,
				phone: !data.connect.phone
			}
		}))
	}

	return (
		<div className='flex-column'>
			<section className='flex-column gap-medium'>
				<span className='textSizeM'>Где выполнять работу?</span>
				<InputAddress
					value={data.address}
					onChange={handleChangeAddress}
					setCurrentAddress={setCurrentAddress}
					style={{ width: 600 }} />
				{error.inputAddressError && data.address.length === 0 && <error.inputAddressError />}
			</section>
			<section className='flex-column gap-medium'>
				<span className='textSizeM'>Когда нужна услуга?</span>
				<InputCalendar
					dataValue={data.date}
					onChange={onChangeDate}
					style={{ width: 600 }} />
				{error.inputDateError && data.date.length === 0 && <error.inputDateError />}
			</section>
			<section className='flex-column gap-medium'>
				<span className='textSizeM'>Контактный телефон</span>
				<TelephoneInput
					value={data.telephone}
					onChange={handleChangeTelephone}
					style={{ width: 600 }} />
				{error.inputTelephoneError && data.telephone.length === 0 && <error.inputTelephoneError />}
			</section>
			<section className='flex-column gap-medium'>
				<span className='textSizeM'>Укажите как вам удобно общаться с исполнителями</span>
				<div style={flexRow}>
					<CheckboxButton
						onClick={() => handleClickChat()}
						checked={data.connect.chat}
						label='В чате сервиса' />
					<Tooltip>
						<div>
							Подсказка
						</div>
					</Tooltip>
				</div>
				<div style={flexRow}>
					<CheckboxButton
						onClick={() => handleClickPhone()}
						checked={data.connect.phone}
						label='По телефону' />
					<Tooltip>
						<div>
							Подсказка
						</div>
					</Tooltip>
				</div>
			</section>
		</div>
	)
}

export default CreateOrderContacts

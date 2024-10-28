import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validationNumber } from '../../../common/validationNumber'
import { addSignsData } from '../../../store/slices/Signs/dataSigns/DataSignsSlice'
import { addClickFlag, addEmailError, addTelephoneError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CheckboxButton from '../../ui/CheckboxButton/CheckboxButton'
import Field from '../../ui/Field/Field'


const SignsContacts: React.FC = () => {

	const [checkEmail, setCheckEmail] = useState(false)

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const { error } = useSelector((state: RootState) => state.createOrderValidation)
	const { dataSigns } = useSelector((state: RootState) => state.signsData)
	const dispatch = useDispatch()

	const handleChangeTel = (e: React.ChangeEvent<HTMLInputElement>) => {

		dispatch(addTelephoneError(e.target.value))
		if (validationNumber(e).length < 13) {
			dispatch(addSignsData({ ...dataSigns, telephone: validationNumber(e) }))
		}
	}
	const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (emailReg.test(e.target.value)) {
			setCheckEmail(true)
		} else setCheckEmail(false)

		dispatch(addEmailError(e.target.value))
		dispatch(addSignsData({ ...dataSigns, email: e.target.value }))
	}

	const handleChangeCalls = () => {
		dispatch(addSignsData({
			...dataSigns,
			communication: {
				...dataSigns.communication,
				calls: !dataSigns.communication?.calls
			}
		}))
	}

	const handleChangeMessages = () => {
		dispatch(addSignsData({
			...dataSigns,
			communication: {
				...dataSigns.communication,
				messages: !dataSigns.communication?.messages
			}
		}))
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div>
				<Field
					onChange={handleChangeTel}
					value={dataSigns.telephone}
					style={{ width: 288 }}
					placeholder='+7'
					label='Телефон' />
				{error.inputTelephoneError && dataSigns.telephone?.length === 0 && <error.inputTelephoneError />}
			</div>
			<div>	<Field
				value={dataSigns.email}
				onChange={handleChangeEmail}
				style={{ width: 288 }}
				placeholder='@'
				label='Электронная почта' />
				{error.inputEmailError && !checkEmail && <error.inputEmailError />}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
				<h3 style={{ fontSize: 16, fontWeight: 700 }}>Способ связи</h3>
				<CheckboxButton
					checked={dataSigns.communication?.calls}
					onClick={handleChangeCalls}
					label='Звонки' />
				<CheckboxButton
					checked={dataSigns.communication?.messages}
					onClick={handleChangeMessages}
					label='Сообщения' />
				{error.radioButtonError && dataSigns.communication === null && <error.radioButtonError />}
			</div>
		</div>
	)
}

export default SignsContacts

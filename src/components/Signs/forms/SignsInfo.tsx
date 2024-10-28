import React, { useEffect } from 'react'
import Field from '../../ui/Field/Field'
import InputAddress from '../../ui/InputAddress/InputAddress'

import { useDispatch, useSelector } from 'react-redux'
import { addSignsData } from '../../../store/slices/Signs/dataSigns/DataSignsSlice'
import { addAddressError, addClickFlag, addExperinceError, addPriceError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CheckboxButton from '../../ui/CheckboxButton/CheckboxButton'
const SignsInfo: React.FC = () => {

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	const { dataSigns } = useSelector((state: RootState) => state.signsData)
	const dispatch = useDispatch()

	const handleClickWarranty = () => {
		dispatch(addSignsData({
			...dataSigns,
			additionally: {
				...dataSigns.additionally,
				warranty: !dataSigns.additionally.warranty
			}
		}))
	}
	const handleClickMaterials = () => {
		dispatch(addSignsData({
			...dataSigns,
			additionally: {
				...dataSigns.additionally,
				materials: !dataSigns.additionally.materials
			}
		}))
	}
	const handleClickContract = () => {
		dispatch(addSignsData({
			...dataSigns,
			additionally: {
				...dataSigns.additionally,
				contract: !dataSigns.additionally.contract
			}
		}))
	}

	const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addAddressError(e.target.value))
		dispatch(addSignsData({ ...dataSigns, address: e.target.value }))
	}

	const handleChangeExp = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addExperinceError(e.target.value))
		const regNum = /^\d{0,6}$/
		const value = e.target.value
		if ((regNum.test(value) || value === '') && value.length < 3)
			dispatch(addSignsData({ ...dataSigns, experience: value }))
	}
	const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addPriceError(e.target.value))
		const regNum = /^\d{0,6}$/ // Изменяем регулярное выражение для проверки от 0 до 6 цифр

		if (regNum.test(e.target.value) || e.target.value === '') {
			/* Валидация только для номеров и длина до 6 символов */
			dispatch(addSignsData({ ...dataSigns, price: e.target.value }))
		}
	}
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
			<section style={{ display: 'flex', flexDirection: 'column' }}>
				<h3 style={{ fontSize: 16, fontWeight: 700 }}>Место оказания услуг</h3>
				<span>Укажите, где вы оказываете услуги, например адрес, район или город </span>
				<div>
					<InputAddress onChange={handleChangeAddress} value={dataSigns.address} />
					{error.inputAddressError && dataSigns.address.length === 0 && <error.inputAddressError />}
				</div>
			</section>
			<section style={{ display: 'flex', flexDirection: 'column' }}>
				<h3 style={{ fontSize: 16, fontWeight: 700 }}>Опыт работы</h3>
				<Field onChange={handleChangeExp} value={dataSigns.experience} style={{ width: 288 }} placeholder='Ваш опыт работы' />
				{error.inputExperienceError && dataSigns.experience.length === 0 && <error.inputExperienceError />}
			</section>
			<section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
				<h3 style={{ fontSize: 16, fontWeight: 700 }}>Дополнительно</h3>
				<CheckboxButton checked={dataSigns.additionally.contract} onChange={() => handleClickContract()} label='Работаю по договору' />
				<CheckboxButton checked={dataSigns.additionally.warranty} onClick={(() => handleClickWarranty())} label='Гарантия на работу' />
				<CheckboxButton checked={dataSigns.additionally.materials} onClick={() => handleClickMaterials()} label='Возможная закупка материалов' />
				<div style={{ fontSize: 16, fontWeight: 700 }}>
					<Field onChange={handleChangePrice} value={dataSigns.price} placeholder='₽' label='Минимальная цена заказа' />
					{error.inputPriceError && dataSigns.price.length === 0 && <error.inputPriceError />}
				</div>
			</section>
		</div>
	)
}

export default SignsInfo

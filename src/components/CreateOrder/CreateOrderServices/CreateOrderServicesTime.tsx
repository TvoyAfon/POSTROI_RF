import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addOrderServicesData } from '../../../store/slices/data/OrderDataServices'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import TelephoneInput from '../../ui/CreateOrderContactInput/TelephoneInput'
import InputCalendar from '../../ui/InputCalendar/InputCalendar'
import RadioButton from '../../ui/RadioButton/RadioButton'

const CreateOrderServicesTime: React.FC = () => {
	const { dateFlag } = useSelector((state: RootState) => state.calendarReducer)
	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	const [checked, setChecked] = useState(false)

	const dispatch = useDispatch()
	const { dataServices } = useSelector((state: RootState) => state.createOrderServicesData)

	const onChangeDate = (date: string, dateObjStart: Date, dateObjEnd: Date) => {
		dispatch(addOrderServicesData({ ...dataServices, date: date, dateObjEnd, dateObjStart }))
	}

	const handleChangeWorkTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = Number(e.target.value)

		// Проверяем значения от 2 до 48
		if (val < 2) {
			dispatch(addOrderServicesData({ ...dataServices, workTime: '2' }))
		} else if (val > 48) {
			// Игнорируем если значение больше 48
			return
		} else {
			// Убираем все некорректные символы
			const valueNumber = e.target.value.replace(/\D/g, '')
			dispatch(addOrderServicesData({ ...dataServices, workTime: valueNumber }))
		}

		if (checked) {
			dispatch(addOrderServicesData({ ...dataServices, workTime: '' }))
		}
	}

	const handleClickCheck = () => {
		setChecked(!checked)
		if (checked) dispatch(addOrderServicesData({ ...dataServices, descretion: true }))
		if (!checked) dispatch(addOrderServicesData({ ...dataServices, descretion: false }))
	}

	return (
		<div className='flex-column '>
			<div className='flex-column gap-medium'>
				<span style={{ fontSize: 16, fontWeight: 700 }}>Когда нужно приступить</span>
				<div>
					<InputCalendar dataValue={dataServices.date} onChange={onChangeDate} />
					{error.inputDateError && !dateFlag && <error.inputDateError />}
				</div>
			</div>
			<div className='flex-column gap-medium'>
				<span style={{ fontSize: 16, fontWeight: 700 }} >Укажите предположительное время работы в часах (минимум 2 часа, максимум 48 часов)
				</span>
				<TelephoneInput
					onChange={handleChangeWorkTime}
					style={{ width: 77 }}
					value={dataServices.workTime}
					placeholder='ч' />
				<RadioButton checked={dataServices.descretion} onClick={handleClickCheck} label=' На усмотрение специалиста
           '/>
				{error.inputDateError && dataServices.workTime.length === 0 && !dataServices.descretion && <error.inputDateError />}
			</div>
			<div style={{ fontSize: 16, fontWeight: 300, color: '#8E8E93' }}>
				Обратите внимание, что в данной категории если вы договорились с исполнителем и выбрали его, вы должны<br />будете указать точную дату и время, на которое вы договорились, либо указать «ближайшее время», а<br /> исполнитель должен его подтвердить. Если исполнитель указал, что начал движение на вашу заявку, указав<br /> это через приложение, то отказ от заказа будет платный. Исполнителю нужно будет компенсировать<br /> стоимость времени, потраченного на дорогу. Отказ от компенсации будет расценён как нарушение<br /> пользовательского соглашения. В этом случае администрация сайта имеет право заблокировать ваш профиль<br /> на срок до 30 дней. При повторном нарушении профиль может быть заблокирован бессрочно.
			</div>
		</div>
	)
}

export default CreateOrderServicesTime

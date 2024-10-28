import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderTruckingData } from '../../../store/slices/data/OrderDataTrucking'
import { addClickFlag, addRadioButtonError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import RadioButton from '../../ui/RadioButton/RadioButton'
import Tooltip from '../../ui/Tooltip/Tooltip'
import styles from './CreateOrderTrucking.module.scss'

const CreateOrderTruckingPayMethod: React.FC = () => {
	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const dispatch = useDispatch()
	const { dataTrucking } = useSelector((state: RootState) => state.createOrderTruckingData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	useEffect(() => {
		dataTrucking.payMethod === null && dispatch(addRadioButtonError(true))
		dataTrucking.payMethod !== null && dispatch(addRadioButtonError(false))
	}, [dataTrucking.payMethod])

	return (
		<div className={styles.truckingPayMethod}>
			<div className='flex-column gap-medium'>
				<span style={{ fontSize: '16px', fontWeight: '700' }}>Укажите способ оплаты</span>
				<div style={{ display: 'flex', gap: 12 }}>
					<RadioButton
						checked={dataTrucking.payMethod === 'settlement'}
						onClick={() => dispatch(addOrderTruckingData({ ...dataTrucking, payMethod: "settlement" }))}
						label='Наличными или переводом на карту водителю (стоимость договорная)' />
					<Tooltip>Всплывающая подсказка</Tooltip>
				</div>
				<div style={{ display: 'flex', gap: 12 }}>
					<RadioButton
						checked={dataTrucking.payMethod === 'fromApp'}
						onClick={() => dispatch(addOrderTruckingData({ ...dataTrucking, payMethod: "fromApp" }))}
						label='Через приложение по тарифам приложения
          '/>
					<Tooltip>Всплывающая подсказка</Tooltip>
				</div>
				<div style={{ display: 'flex', gap: 12 }}>	<RadioButton
					checked={dataTrucking.payMethod === 'cards'}
					onClick={() => dispatch(addOrderTruckingData({ ...dataTrucking, payMethod: "cards" }))}
					label='На расчетный счет самозанятого, ИП или юридического лица.' />
					<Tooltip>Всплывающая подсказка</Tooltip>
				</div>
				{error.radioButtonPayError && dataTrucking.payMethod === null && <error.radioButtonPayError />}
			</div>
			<div className='flex-column gap-medium'><span style={{ fontSize: '16px', fontWeight: '700' }}>Обратите внимание</span>
				<div style={{ color: '#8E8E93' }}>Обратите внимание, что в данной категории если вы договорились с исполнителем и выбрали его, вы должны<br /> будете указать точную дату и время, на которое вы договорились, либо указать «ближайшее время», а<br /> исполнитель должен его подтвердить. Если исполнитель указал, что начал движение на вашу заявку, указав<br /> это через приложение, то отказ от заказа будет платный. Исполнителю нужно будет компенсировать<br /> стоимость времени, потраченного на дорогу. Отказ от компенсации будет расценён как нарушение<br /> пользовательского соглашения. В этом случае администрация сайта имеет право заблокировать ваш профиль<br /> на срок до 30 дней. При повторном нарушении профиль может быть заблокирован бессрочно.
				</div></div>
		</div>
	)
}

export default CreateOrderTruckingPayMethod

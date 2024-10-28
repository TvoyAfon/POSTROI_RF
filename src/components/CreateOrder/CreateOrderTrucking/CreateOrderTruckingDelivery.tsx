import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderTruckingData } from '../../../store/slices/data/OrderDataTrucking'
import { RootState } from '../../../store/store'
import RadioButton from '../../ui/RadioButton/RadioButton'
import styles from './CreateOrderTrucking.module.scss'

import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'

const CreateOrderTruckingDelivery: React.FC = () => {
	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const dispatch = useDispatch()
	const { dataTrucking } = useSelector((state: RootState) => state.createOrderTruckingData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)

	return (
		<div className={styles.truckingDelivery}>
			<span style={{ fontWeight: 700, fontSize: 16 }}>По городу или межгород</span>
			<div className='flex-column gap-medium'>
				<RadioButton checked={dataTrucking.delivery === 'city'} onClick={() => dispatch(addOrderTruckingData({ ...dataTrucking, delivery: 'city' }))} label='По городу' />
				<RadioButton checked={dataTrucking.delivery === 'middlecity'} onClick={() => dispatch(addOrderTruckingData({ ...dataTrucking, delivery: 'middlecity' }))} label='Межгород' />
				{error.radioButtonError && dataTrucking.delivery === null && <error.radioButtonError />}
			</div>

			<span style={{ fontWeight: 700, fontSize: 16 }}>Обратите внимание</span>
			<div style={{ fontSize: '16px', fontWeight: '300' }}>Минимальная стоимость услуг грузовая газель от 1000р/час по городу или 30р/км межгород<br />
				Минимальное количество часов работы 1,5 часа<br />
				Минимальная сумма заказа от 1500р
			</div>
		</div>
	)
}
export default CreateOrderTruckingDelivery

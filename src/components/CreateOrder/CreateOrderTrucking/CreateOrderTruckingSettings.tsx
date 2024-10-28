import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderTruckingData } from '../../../store/slices/data/OrderDataTrucking'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CheckboxButton from '../../ui/CheckboxButton/CheckboxButton'
import Tooltip from '../../ui/Tooltip/Tooltip'
import styles from './CreateOrderTrucking.module.scss'


const CreateOrderTruckingSettings: React.FC = () => {

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const dispatch = useDispatch()
	const { dataTrucking } = useSelector((state: RootState) => state.createOrderTruckingData)

	const handleClickOffers = () => {
		dispatch(addOrderTruckingData({
			...dataTrucking, settings: {
				...dataTrucking.settings,
				offers: !dataTrucking.settings.offers
			}
		}))
	}
	const handleClickApp = () => {
		dispatch(addOrderTruckingData({
			...dataTrucking, settings: {
				...dataTrucking.settings,
				notice: !dataTrucking.settings.notice
			}
		}))
	}
	const handleClickContract = () => {
		dispatch(addOrderTruckingData({
			...dataTrucking, settings: {
				...dataTrucking.settings,
				contract: !dataTrucking.settings.contract
			}
		}))
	}

	return (
		<div className={styles.truckingSettings}>
			<span style={{ fontWeight: '700', fontSize: '16px' }}>НАСТРОЙКИ</span>
			<div style={{ display: 'flex', gap: '12px' }}>
				<CheckboxButton
					checked={dataTrucking.settings.offers} onClick={() => handleClickOffers()}
					label=' Хотите получать уведомления об откликах на ваш заказ?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: '12px' }}>
				<CheckboxButton
					checked={dataTrucking.settings.notice}
					onClick={() => handleClickApp()}
					label=' Хотите получать предложения от специалистов с рейтингом ниже 4,5?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: '12px' }}>
				<CheckboxButton
					checked={dataTrucking.settings.contract}
					onClick={() => handleClickContract()}
					label=' Вам нужен договор?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
		</div>
	)
}

export default CreateOrderTruckingSettings

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderCleaningData } from '../../../store/slices/data/OrderDataCleaning'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CheckboxButton from '../../ui/CheckboxButton/CheckboxButton'
import Tooltip from '../../ui/Tooltip/Tooltip'


const CreateOrderCleaningSettings: React.FC = () => {
	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const dispatch = useDispatch()
	const { dataCleaning } = useSelector((state: RootState) => state.createOrderCleaningData)

	const handleClickOffers = () => {
		dispatch(addOrderCleaningData({
			...dataCleaning, settings: {
				...dataCleaning.settings,
				offers: !dataCleaning.settings.offers
			}
		}))
	}
	const handleClickApp = () => {
		dispatch(addOrderCleaningData({
			...dataCleaning, settings: {
				...dataCleaning.settings,
				notice: !dataCleaning.settings.notice
			}
		}))
	}
	const handleClickContract = () => {
		dispatch(addOrderCleaningData({
			...dataCleaning, settings: {
				...dataCleaning.settings,
				contract: !dataCleaning.settings.contract
			}
		}))
	}

	return (
		<div className='flex-column gap-medium'>
			<span style={{ fontSize: 16, fontWeight: 700 }}>Настройки</span>
			<div style={{ display: 'flex', gap: 12 }}>
				<CheckboxButton
					onClick={() => handleClickApp()}
					checked={dataCleaning.settings.notice}
					label='Хотите получать уведомления об откликах на ваш заказ?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<CheckboxButton
					onClick={() => handleClickOffers()}
					checked={dataCleaning.settings.offers}
					label='Хотите получать предложения от специалистов с рейтингом ниже 4,5?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<CheckboxButton
					onClick={() => handleClickContract()}
					checked={dataCleaning.settings.contract}
					label='Вам нужен договор?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
		</div>
	)
}

export default CreateOrderCleaningSettings

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderServicesData } from '../../../store/slices/data/OrderDataServices'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CheckboxButton from '../../ui/CheckboxButton/CheckboxButton'
import Tooltip from '../../ui/Tooltip/Tooltip'


const CreateOrderServicesSettings: React.FC = () => {
	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])


	const dispatch = useDispatch()
	const { dataServices } = useSelector((state: RootState) => state.createOrderServicesData)

	const handleClickOffers = () => {
		dispatch(addOrderServicesData({
			...dataServices, settings: {
				...dataServices.settings,
				offers: !dataServices.settings.offers
			}
		}))
	}
	const handleClickApp = () => {
		dispatch(addOrderServicesData({
			...dataServices, settings: {
				...dataServices.settings,
				notice: !dataServices.settings.notice
			}
		}))
	}
	const handleClickContract = () => {
		dispatch(addOrderServicesData({
			...dataServices, settings: {
				...dataServices.settings,
				contract: !dataServices.settings.contract
			}
		}))
	}

	return (
		<div className='flex-column gap-medium'>
			<span style={{ fontWeight: '700', fontSize: '16px' }}>НАСТРОЙКИ</span>
			<div style={{ display: 'flex', gap: 12 }}>
				<CheckboxButton
					checked={dataServices.settings.offers}
					onClick={() => handleClickOffers()}
					label=' Хотите получать уведомления об откликах на ваш заказ?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<CheckboxButton
					checked={dataServices.settings.notice}
					onClick={() => handleClickApp()}
					label=' Хотите получать предложения от специалистов с рейтингом ниже 4,5?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<CheckboxButton
					checked={dataServices.settings.contract}
					onClick={() => handleClickContract()}
					label=' Вам нужен договор?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
		</div>
	)
}
export default CreateOrderServicesSettings

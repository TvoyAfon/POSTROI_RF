import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addOrderMaterialsData } from '../../../store/slices/data/OrderDataMaterials'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CheckboxButton from '../../ui/CheckboxButton/CheckboxButton'
import Tooltip from '../../ui/Tooltip/Tooltip'

const CreateOrderMaterialsSettings: React.FC = () => {

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const { dataMaterials } = useSelector((state: RootState) => state.createOrderMaterialsData)
	const dispatch = useDispatch()

	const handleClickOffers = () => {
		dispatch(addOrderMaterialsData({
			...dataMaterials, settings: {
				...dataMaterials.settings,
				offers: !dataMaterials.settings.offers
			}
		}))
	}
	const handleClickApp = () => {
		dispatch(addOrderMaterialsData({
			...dataMaterials, settings: {
				...dataMaterials.settings,
				notice: !dataMaterials.settings.notice
			}
		}))
	}
	const handleClickContract = () => {
		dispatch(addOrderMaterialsData({
			...dataMaterials, settings: {
				...dataMaterials.settings,
				contract: !dataMaterials.settings.contract
			}
		}))
	}

	return (
		<div className='flex-column gap-medium'>
			<span style={{ fontWeight: 700, fontSize: 16 }}>Настройки</span>
			<div style={{ display: 'flex', gap: 12 }}>
				<CheckboxButton checked={dataMaterials.settings.notice} onChange={handleClickApp} label='Хотите получать уведомления об откликах на ваш заказ?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<CheckboxButton checked={dataMaterials.settings.offers} onChange={handleClickOffers} label='Хотите получать предложения от специалистов с рейтингом ниже 4,5?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			<div style={{ display: 'flex', gap: 12 }}>
				<CheckboxButton checked={dataMaterials.settings.contract} onChange={handleClickContract} label='Вам нужен договор?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
		</div>
	)
}

export default CreateOrderMaterialsSettings

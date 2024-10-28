import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import CheckboxButton from '../../ui/CheckboxButton/CheckboxButton'
import { addOrderUniversalData } from '../../../store/slices/data/OrderUniversalData'

const CreateOrderUniversalSettings: React.FC = () => {

	const { dataUniversal } = useSelector((state: RootState) => state.createOrderUniversalData)
	const dispatch = useDispatch()

	const handleClickOffers = () => {
		dispatch(addOrderUniversalData({ ...dataUniversal, settings:{
			...dataUniversal.settings,
			offers:!dataUniversal.settings.offers
		}}))
	}
	const handleClickNotice = () => {
		dispatch(addOrderUniversalData({ ...dataUniversal, settings:{
			...dataUniversal.settings,
			notice:!dataUniversal.settings.notice
		}}))
	}
	const handleClickContract = () => {
		dispatch(addOrderUniversalData({ ...dataUniversal, settings:{
			...dataUniversal.settings,
			contract:!dataUniversal.settings.contract
		}}))
	}
	
	

	const checkBox = [
		{
			label: 'Получать предложения от специалистов с рейтингом ниже 4.5',
			onClick: () => handleClickOffers(),
			checked: dataUniversal.settings.offers
		},
		{
			label: 'Получать уведомления об откликах на ваш заказ?',
			onClick: () => handleClickNotice(),
			checked: dataUniversal.settings.notice
		},
		{
			label: 'Вам нужен договор?',
			onClick: () => handleClickContract(),
			checked: dataUniversal.settings.contract
		},
	]


	return (
		<div className='flex-column gap-medium'>
			<span className='textSizeM'>Настройки</span>
			{checkBox.map((el, index) => (
				<CheckboxButton
					key={index}
					onClick={el.onClick}
					checked={el.checked}
					label={el.label} />
			))}
		</div>
	)
}

export default CreateOrderUniversalSettings

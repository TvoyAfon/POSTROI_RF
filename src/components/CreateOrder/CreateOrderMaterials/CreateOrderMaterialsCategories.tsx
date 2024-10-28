import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderMaterialsData } from '../../../store/slices/data/OrderDataMaterials'
import { addAddressError, addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import InputAddress from '../../ui/InputAddress/InputAddress'
import RegisterButton from '../../ui/RegisterButton'
import Tooltip from '../../ui/Tooltip/Tooltip'
import CategoriesMaterials from './CategoriesMaterials/CategoriesMaterials'

const CreateOrderMaterialsCategories: React.FC = () => {
 const [currentAddress,setCurrentAddress] = useState('')
	const { error } = useSelector((state: RootState) => state.createOrderValidation)
	const { dataMaterials } = useSelector((state: RootState) => state.createOrderMaterialsData)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])
  
	useEffect(() => {
		if (currentAddress) {
			dispatch(addOrderMaterialsData({ ...dataMaterials, address: currentAddress }))// Update address when currentAddress changes
		}
	}, [currentAddress])


	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderMaterialsData({ ...dataMaterials, address: e.target.value }))
		dispatch(addAddressError(e.target.value))
	}

	return (
		<div className='flex-column '>
			<div className='flex-column gap-medium'>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Адрес</span>
				<span>Укажите регион, город, район в котором нужны строительные материалы.</span>
				<InputAddress 
				setCurrentAddress={setCurrentAddress}
				onChange={handleChange} 
				value={dataMaterials.address} />
				{error.inputAddressError && <error.inputAddressError />}
			</div>
			<span style={{ fontWeight: 700, fontSize: 16 }}>Укажите категории необходимых строительных материалов (одну или несколько)</span>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
				<CategoriesMaterials />
				<section className='flex-column '>
					<span style={{ fontWeight: 700, fontSize: 16 }}>ВЫБРАННЫЕ КАТЕГОРИИ</span>
					<div className='flex-column gap-medium'>
						<span style={{ fontWeight: 700, fontSize: 16 }}>Отделочные материалы</span>
						<span>Керамическая плитка и керамогранит</span>
						<span>Сыпучие материалы</span>
					</div>
					<div className='flex-column gap-small'>
						<span style={{ fontWeight: 700, fontSize: 16 }}>Строительные материалы</span>
						<span>Металлопрокат</span>
						<span>Цемент и сыпучие материалы</span>
					</div>
					<div className='flex-column gap-small'>
						<span style={{ fontWeight: 700, fontSize: 16 }}>Сантехника</span>
						<span>Санфаянс</span>
						<span>Внутренний водопровод и канализация</span>
					</div>
					<div className='flex-column gap-small'>
						<span style={{ fontWeight: 700, fontSize: 16 }}>Кровля и фасад</span>
						<span>Профлист</span>
						<span>Фасадная подсистема</span>
					</div>
				</section>
				<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
					<RegisterButton style={{ width: 209, height: 34, fontSize: 14, fontWeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Подключить специалиста</RegisterButton>
					<Tooltip>Вcплывающая подсказка</Tooltip>
				</div>
			</div>
		</div>
	)
}

export default CreateOrderMaterialsCategories

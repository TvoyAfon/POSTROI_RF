import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { payMethodsObject } from '../../../common/categories'
import { addOrderMaterialsData } from '../../../store/slices/data/OrderDataMaterials'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import RadioButton from '../../ui/RadioButton/RadioButton'
import Tooltip from '../../ui/Tooltip/Tooltip'

const CreateOrderMaterialsPay: React.FC = () => {

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const { dataMaterials } = useSelector((state: RootState) => state.createOrderMaterialsData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)
	const dispatch = useDispatch()

	const handleClick = (pay: string) => {
		return () => {
			dispatch(addOrderMaterialsData({ ...dataMaterials, payMethod: pay }))
		}
	}

	return (
		<div className='flex-column'>
			<span style={{ fontSize: 16, fontWeight: 700 }}>Укажите способ оплаты</span>
			<section className='flex-column gap-medium'>
				{payMethodsObject.map((payMethod, index) => (
					<span style={{ display: 'flex', gap: 12, fontSize: 14, fontWeight: 300 }} key={index}>
						<RadioButton
							onClick={handleClick(payMethod.key)}
							checked={dataMaterials.payMethod === payMethod.key}
							label={payMethod.name} />
						<Tooltip>Всплывающая подсказка</Tooltip>
					</span>
				))}
				{error.radioButtonPayError && dataMaterials.payMethod.length === 0 && <error.radioButtonPayError />}
			</section>
		</div>
	)
}
export default CreateOrderMaterialsPay
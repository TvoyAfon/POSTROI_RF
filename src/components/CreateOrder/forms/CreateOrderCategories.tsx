import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderData } from '../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { addCategoryError, addClickFlag, addInputTaskNameError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import Field from '../../ui/Field/Field'
import { stylesCategories } from './styles/stylesCreateOrder'
import CategoriesOrderModal from './ui/CategoriesOrderModal'

const CreateOrderCategories: React.FC = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(addClickFlag(false))
		dispatch(addCategoryError(false))
	}, [])

	const { data } = useSelector((state: RootState) => state.createOrderData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)
	const { selectedHierarchy } = useSelector((state: RootState) => state.createOrderHierarchySlice)

	const categories = [
		selectedHierarchy.category,
		selectedHierarchy.subCategories[0],
		selectedHierarchy.subsubCategories[0],
	]
	const existingCategories = categories.filter(Boolean)


	const handleChangeTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addOrderData({
			...data,
			taskName: e.target.value
		})
		)
		dispatch(addInputTaskNameError(e.target.value))
	}

	return (
		<div className='flex-column'>
			<section className='flex-column gap-medium'>
				<span className='textSizeM'>Название заказа</span>
				<div>
					<Field
						onChange={handleChangeTaskName}
						value={data.taskName}
						style={{ width: '100%' }} />
					{error.inputTaskNameError && data.taskName.length === 0 && <error.inputTaskNameError />}
				</div>
			</section>
			<div>
				<CategoriesOrderModal
					isOrder={true}
				/>
				{
					data.categoryType.length !== 0 ? <div style={stylesCategories}>
						<span >{existingCategories.join(' > ')}</span>
					</div> : null
				}
			</div>
			{error.categoriesError && <error.categoriesError />}

		</div>
	)
}

export default CreateOrderCategories
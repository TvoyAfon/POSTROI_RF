import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSignsData } from '../../../store/slices/Signs/dataSigns/DataSignsSlice'
import { RootState } from '../../../store/store'
import { stylesCategories } from '../../CreateOrder/forms/styles/stylesCreateOrder'
import CategoriesOrderModal from '../../CreateOrder/forms/ui/CategoriesOrderModal'
import Field from '../../ui/Field/Field'

const SignsCategories: React.FC = () => {
	const dispatch = useDispatch()

	const { dataSigns } = useSelector((state: RootState) => state.signsData)
	const { selectedHierarchy } = useSelector((state: RootState) => state.createOrderHierarchySlice)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)


	const handleChangeTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(addSignsData({
			...dataSigns, taskName: e.target.value
		}))
	}
	const categories = [
		selectedHierarchy.category1,
		selectedHierarchy.category2,
		selectedHierarchy.category3,
	]
	const existingCategories = categories.filter(Boolean)

	return (
		<div className='flex-column'>
			<div className='flex-column gap-medium'>
				<span className='textSizeM'>Название объявления</span>
				<div>
					<Field
						onChange={handleChangeTaskName}
						value={dataSigns.taskName}
						style={{ width: '100%' }} />
					{error.inputTaskNameError && dataSigns.taskName.length === 0 && <error.inputTaskNameError />}
				</div>
			</div>
			<div>
				<CategoriesOrderModal
					isOrder={false}
				/>
				{
					dataSigns.categoryType.length !== 0 ? <div style={stylesCategories}>
						<span >{existingCategories.join(' > ')}</span>
					</div> : null
				}
			</div>
			{error.categoriesError && <error.categoriesError />}
		</div>
	)
}

export default SignsCategories

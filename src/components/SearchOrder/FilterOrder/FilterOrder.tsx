import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IFilterOrder } from '../../../interface/modal.props'
import { addCategoriesOrder } from '../../../store/slices/CategoriesForFilter/CategoriesForFilterSlice'
import Button from '../../ui/Button/Button'
import CategoriesList from '../../ui/CategoriesList/CategoriesList'
import CloseButton from '../../ui/CloseButton/CloseButton'
import ModalContainer from '../../ui/Modal/ModalContainer'

const FilterOrder: React.FC<IFilterOrder> = ({ handleCloseFilter }) => {
	const [currentCat, setCurrentCat] = useState<string>('')
	const [currentSubCategory, setCurrentSubCategory] = useState<string>('')
	const filters = ['Все', 'Частные', 'Организации']
	const dispatch = useDispatch()

	const handleCategorySelect = (category: string, subCategory: string) => {
		setCurrentCat(category)
		setCurrentSubCategory(subCategory)
	}

	const handleApply = () => {
		if (currentCat && currentSubCategory) {
			dispatch(addCategoriesOrder({
				categoryOrder: currentCat,
				subCategoryOrder: currentSubCategory
			}))
			handleCloseFilter && handleCloseFilter()
		}
	}

	return (
		<ModalContainer style={{ width: 1180, position: 'fixed' }} isOnOverlay zIndex={12}>
			<div style={{ paddingBottom: 16 }} className='flex-column'>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span className='textSizeL'>Фильтры</span>
					<CloseButton onClick={handleCloseFilter} />
				</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					{filters.map((filter, index) => (
						<span style={{ cursor: "pointer" }} key={index}>{filter}</span>
					))}
				</div>
				<CategoriesList
					isFilter={true}
					onCategorySelect={handleCategorySelect} />
			</div>
			<Button
				onClick={handleApply}
			>Показать 24 объявления</Button>
		</ModalContainer>
	)
}

export default FilterOrder

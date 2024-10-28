
import React, { CSSProperties, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOutsideClick } from '../../../../hooks/useOutside'
import { clearFavorites } from '../../../../store/slices/CategoriesFavorites/CategoriesFavorites'
import { addCategoriesOrder } from '../../../../store/slices/CategoriesForFilter/CategoriesForFilterSlice'
import { RootState } from '../../../../store/store'
import Button from '../../../ui/Button/Button'
import CategoriesList from '../../../ui/CategoriesList/CategoriesList'
import ModalContainer from '../../../ui/Modal/ModalContainer'
import SearchOrderFavourites from './SearchOrderFavourites'
import SearchOrderModalSection from './SearchOrderModalSection'

interface ISearchOrderModal {
	onClose: () => void
	, style?: CSSProperties,
}

const SearchOrderModal: React.FC<ISearchOrderModal> = ({ onClose, style }) => {
	const ref = useRef<HTMLDivElement>(null)
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
	const [selectedsubCategory, setSelectedsubCategory] = useState<string | null>(null)
	const [selectedSection, setSelectedSection] = useState<string>('Все категории')
	const { user } = useSelector((state: RootState) => state.auth)
	useOutsideClick(ref, onClose)
	const dispatch = useDispatch()
	const categories = useSelector((state: RootState) => state.favCategories)

	const handleClearCategory = () => {
		if (categories && selectedSection === 'Избранное') {
			return dispatch(clearFavorites())
		}
		else if (selectedSection === 'Все категории') {
			setSelectedCategory(null) // Reset selected category
			dispatch(addCategoriesOrder({
				categoryOrder: 'Выберите категорию заказов',
				subCategoryOrder: ''
			}))
			onClose()
		}
	}

	const handleCategorySelect = (category: string, subCategory: string) => {
		setSelectedCategory(category)
		setSelectedsubCategory(subCategory)
	}

	const handleApplyCategory = () => {

		if (selectedCategory && selectedsubCategory) {
			dispatch(addCategoriesOrder({
				categoryOrder: selectedCategory,
				subCategoryOrder: selectedsubCategory
			}))
			onClose() // Close the modal
		}
	}

	return (
		<ModalContainer
			zIndex={11}
			style={{ width: 1170, top: 335, borderRadius: selectedSection === 'Избранное' ? '32px 32px 32px 32px' : '0px 0px 32px 32px', ...style }} isOnOverlay>
			<div ref={ref}>
				{user?.id && <SearchOrderModalSection
					setSelectedSection={setSelectedSection}
					selectedSection={selectedSection}
				/>}
				<div style={{ paddingTop: 16, paddingBottom: 16 }}>
					{selectedSection === 'Все категории' ?
						<CategoriesList
							isFilter={true}
							onCategorySelect={handleCategorySelect} /> :
						selectedSection === 'Избранное' && <SearchOrderFavourites />}
				</div>
				<div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingTop: 16 }}>
					<Button
						onClick={handleClearCategory}
						style={{ backgroundColor: '#F4F3F1', color: '#282930', fontSize: 14 }}>Очистить все</Button>
					{selectedSection === 'Избранное' &&
						<Button
							style={{ backgroundColor: '#F4F3F1', color: '#282930', fontSize: 14 }}
						>
							Активировать все
						</Button>}
					<Button
						onClick={handleApplyCategory}
						style={{ fontSize: 14 }}>Применить</Button>
					<span style={{ color: '#8E8E93' }}>Выберите одну или несколько категорий</span>
				</div>
			</div>
		</ModalContainer>
	)
}

export default SearchOrderModal
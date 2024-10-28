import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteCategory } from '../../../../store/slices/CategoriesFavorites/CategoriesFavorites'
import { setSelectedHierarchy } from '../../../../store/slices/other/categoriesList'
import { RootState } from '../../../../store/store'
import Button from '../../../ui/Button/Button'
import CategoriesList from '../../../ui/CategoriesList/CategoriesList'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../ui/Modal/ModalContainer'

const SearchOrderFavDetail: React.FC<{ onClose: () => void }> = ({ onClose }) => {

	const { selectedHierarchy } = useSelector((state: RootState) => state.createOrderHierarchySlice)


	const dispatch = useDispatch()


	const handleSetSelectedHierarhy = (updatedHierarchy: any) => {
		dispatch(setSelectedHierarchy(updatedHierarchy))

	}

	useEffect(() => {
		console.log(selectedHierarchy)
	}, [selectedHierarchy])

	const handleSaveFavorites = () => {
		const { category, subCategories, subsubCategories } = selectedHierarchy


		// Create a structure for new subCategories
		const newSubCategories = subCategories.map((subcategory, index) => ({
			id: Date.now() + index,
			name: subcategory,
			subsubcategories: subsubCategories.map((subsub, subIndex) => ({
				id: Date.now() + subIndex,
				name: subsub
			})),
		}))

		const favoriteCategory = {
			id: Date.now(),
			name: category,
			subCategories: newSubCategories,
		}

		dispatch(addFavoriteCategory(favoriteCategory))
		onClose() // Close modal after saving


	}

	return (
		<ModalContainer
			style={{ position: 'fixed', top: '50%', left: '50%', width: 1180 }}
			zIndex={11}
			isOnOverlay>
			<div className='flex-column'>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span className='textSizeL'>ДОБАВИТЬ В ИЗБРАННЫЕ</span>
					<CloseButton onClick={onClose} />
				</div>
				<CategoriesList
					selectedHierarchy={selectedHierarchy}
					isFilter={true}
					isAddFavorites={true}
					setSelectedHierarchy={handleSetSelectedHierarhy} />
				<Button
					onClick={handleSaveFavorites}
					style={{ width: 200 }}>Сохранить</Button>
			</div>
		</ModalContainer>
	)
}

export default SearchOrderFavDetail
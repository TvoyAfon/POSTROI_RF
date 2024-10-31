import React, { useEffect, useState } from 'react'
import Button from '../../../ui/Button/Button'
import CategoriesListFilter from '../../../ui/CategoriesList/CategoriesListFilter'
import { ISelectedCategories } from '../../../ui/CategoriesList/types/types.props'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../ui/Modal/ModalContainer'

const SearchOrderFavDetail: React.FC<{ onClose: () => void }> = ({ onClose }) => {


	const [currentCategories, setCurrentCategories] = useState<ISelectedCategories>({
		category1: '',
		category2: [],
		category3: [],
		category4: [],
		selectedId: []
	})

	useEffect(() => {
		console.log(currentCategories)
	}, [currentCategories])

	const handleSaveFavorites = () => {

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
				<CategoriesListFilter
					currentCategories={currentCategories}
					setCurrentCategories={setCurrentCategories}
				/>
				<Button
					onClick={handleSaveFavorites}
					style={{ width: 200 }}>Сохранить</Button>
			</div>
		</ModalContainer>
	)
}

export default SearchOrderFavDetail
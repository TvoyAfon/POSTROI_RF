import React from 'react'
import { IFilterOrder } from '../../../interface/modal.props'
import Button from '../../ui/Button/Button'
import CategoriesListFilter from '../../ui/CategoriesList/CategoriesListFilter'
import CloseButton from '../../ui/CloseButton/CloseButton'
import ModalContainer from '../../ui/Modal/ModalContainer'

const FilterOrder: React.FC<IFilterOrder> = ({ handleCloseFilter }) => {
	const filters = ['Все', 'Частные', 'Организации']


	/*	const handleApply = () => {
			if (currentCat && currentSubCategory) {
				dispatch(addCategoriesOrder({
					category1: currentCat,
					category2: currentSubCategory
				}))
				handleCloseFilter && handleCloseFilter()
			}
		}
			*/
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
				<CategoriesListFilter

				/>
			</div>
			<Button

			>Показать 24 объявления</Button>
		</ModalContainer>
	)
}

export default FilterOrder

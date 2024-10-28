import React, { SetStateAction } from 'react'
import filter from '../../../../assets/images/other/filter-horizontal.svg'
import { useModal } from '../../../../hooks/useModal'
import FilterOrder from '../../../SearchOrder/FilterOrder/FilterOrder'


const FilterSigns: React.FC<{
	countOfCards?: string,
	setSelectedCategory: React.Dispatch<SetStateAction<string | null>>,
	handleResetFilters?: () => void,
	selectedCategory?: string | null
}> = ({ countOfCards, setSelectedCategory, handleResetFilters, selectedCategory }) => {
	const { handleClose, handleOpen, isOpen } = useModal()
	return (
		<>
			{isOpen && <FilterOrder
				selectedCategory={selectedCategory}
				handleResetFilters={handleResetFilters}
				setSelectedCategory={setSelectedCategory}
				countOfCards={countOfCards}
				handleCloseFilter={handleClose} />}
			<div onClick={handleOpen}
				style={{ backgroundColor: "#F4F3F1", height: 40, display: 'flex', alignItems: 'center', padding: 8, borderRadius: 8 }}>
				<img src={filter} alt="filter" />
			</div>
		</>
	)
}

export default FilterSigns

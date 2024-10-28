import React from 'react'
import filter_svg from '../../../../assets/images/searchOrder_images/filter-horizontal.svg'
import { useModal } from '../../../../hooks/useModal'
import FilterOrder from '../../FilterOrder/FilterOrder'

const SearchMyOrderFilter: React.FC = () => {
	const { handleClose, handleOpen, isOpen } = useModal()

	return (
		<>
			{isOpen && <FilterOrder handleCloseFilter={handleClose} />}
			<div
				style={{ cursor: 'pointer', backgroundColor: '#F4F3F1', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 25, borderRadius: 8 }}
				onClick={handleOpen}>
				<img
					src={filter_svg} alt="filter" />
			</div>
		</>
	)
}

export default SearchMyOrderFilter

import React from 'react'
import filter_svg from '../../../../../assets/images/searchOrder_images/filter-horizontal.svg'
import { useModal } from '../../../../../hooks/useModal'
import { stylesForFilter } from '../../styles/searchOrderHeaderStyles'
import SearchOrderFilterDetail from './SearchOrderFilterDetail'


const SearchOrderFilter: React.FC = () => {
	const { handleClose, handleOpen, isOpen } = useModal()

	return (
		<>
			{isOpen && <SearchOrderFilterDetail onClose={handleClose} />}
			<div
				onClick={handleOpen}
				style={{ display: "flex", gap: 8, alignItems: 'center', position: 'relative', cursor: 'pointer' }}>
				<img style={{ width: 20 }} src={filter_svg} alt="" />
				<span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Все фильтры</span>
				<div
					style={stylesForFilter}>
					12
				</div>
			</div>
		</>
	)
}

export default SearchOrderFilter

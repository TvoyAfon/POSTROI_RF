import React from 'react'
import filter_svg from '../../../../../assets/images/other/filter-horizontal.svg'
import { IDefaultModal } from '../../../../../interface/modal.props'
import FilterVendorModal from './FilterVendorModal'

const FilterVendor: React.FC<IDefaultModal> = ({ onOpen, stateValue, onClose, style, countStyle }) => {

	return (<>
		<div onClick={onOpen} style={{ display: 'flex', gap: 10, position: 'relative', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', ...style }}>
			<img src={filter_svg} alt="filter" />
			<span style={{ fontSize: 14, fontWeight: 300 }}>Все фильтры</span>
			<div style={{ width: 18, height: 18, borderRadius: '50%', position: 'absolute', backgroundColor: '#7099ED', textAlign: 'center', top: '-90%', left: '100%', ...countStyle }}>
				<span style={{ color: 'white' }}>0</span>
			</div>
		</div>
		{stateValue && <FilterVendorModal onClose={onClose} />}
	</>
	)
}

export default FilterVendor

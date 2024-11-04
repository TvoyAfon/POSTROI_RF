import React from 'react'

import InputSelect from '../../../../../ui/InputSelect/InputSelect'

const FilterVendorRegion: React.FC = () => {
	return (
		<div>
			<span className='textSizeL'>Регионы поставки</span>
			<InputSelect width='100%' />
		</div>
	)
}

export default FilterVendorRegion

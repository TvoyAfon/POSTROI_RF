import React, { useState } from 'react'
import settings_svg from '../../../../assets/images/other/settingsModal.svg'
import notice_svg from '../../../../assets/images/other/uvedomlenia.svg'
import { useModal } from '../../../../hooks/useModal'
import Line from '../../../ui/Line/Line'
import Tooltip from '../../../ui/Tooltip/Tooltip'
import SearchOrderFavDetail from './SearchOrderFavDetail'
import SearchOrderModalNotice from './SearchOrderModalNotice'

interface SearchOrderModalSectionProps {
	selectedSection: string
	setSelectedSection: React.Dispatch<React.SetStateAction<string>>
}

const SearchOrderModalSection: React.FC<SearchOrderModalSectionProps> = ({ selectedSection, setSelectedSection }) => {
	const [openFav, setOpenFav] = useState(false)
	const { handleClose, handleOpen, isOpen } = useModal()

	const isSelected = (categorySection: string) => {
		return selectedSection === categorySection ? '1px solid #749EF2' : '1px solid #8E8E93'
	}

	const getTextColor = (categorySection: string) => {
		return selectedSection === categorySection ? '#749EF2' : '#8E8E93'
	}

	return (
		<>
			{openFav && <SearchOrderFavDetail onClose={() => setOpenFav(false)} />}
			<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
				<div
					onClick={() => setSelectedSection('Все категории')}
					style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
					<span style={{ color: getTextColor('Все категории') }} className='textSizeL'>Все категории</span>
					<Line style={{ border: isSelected('Все категории') }} lineWidth='150px' />
				</div>
				<div
					onClick={() => setSelectedSection('Избранное')}
					style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
					<span style={{ color: getTextColor('Избранное') }} className='textSizeL'>Избранные категории</span>
					<Line style={{ border: isSelected('Избранное') }} lineWidth='225px' />
				</div>
				<Tooltip>
					<span>Подсказка</span>
				</Tooltip>
				{selectedSection === 'Избранное' &&
					<div
						style={{ display: 'flex', gap: 16, paddingBottom: 4, position: 'relative' }}>
						<img
							onClick={() => setOpenFav(true)}
							style={{ cursor: 'pointer' }}
							src={settings_svg}
							alt="st" />
						<img
							onClick={handleOpen}
							style={{ cursor: 'pointer' }}
							src={notice_svg}
							alt="push" />
						{isOpen && <SearchOrderModalNotice onClose={handleClose} />}
					</div>}
			</div>
		</>
	)
}

export default SearchOrderModalSection
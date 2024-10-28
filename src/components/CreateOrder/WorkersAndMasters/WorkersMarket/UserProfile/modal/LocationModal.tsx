import React, { CSSProperties } from 'react'
import { useSelector } from 'react-redux'
import editIcon from '../../../../../../assets/images/profile/edit.svg'
import { RootState } from '../../../../../../store/store'

const LocationModal: React.FC<{ handleOpenCity: () => void, style?: CSSProperties }> = ({ handleOpenCity, style }) => {
	const { city } = useSelector((state: RootState) => state.currentCity)

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
			<span style={{ fontWeight: 700, ...style }}>{city}</span>
			<img onClick={handleOpenCity} style={{ cursor: 'pointer' }} src={editIcon} alt="edit" />
		</div>
	)
}

export default LocationModal

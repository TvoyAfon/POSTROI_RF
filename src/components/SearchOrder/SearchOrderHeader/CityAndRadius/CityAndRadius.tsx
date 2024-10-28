import React from 'react'
import { useSelector } from 'react-redux'
import caret_png from '../../../../assets/images/searchOrder_images/caret-up-solid 1.svg'
import { ICityAndRadius } from '../../../../interface/searchOrderWithMap.props'
import { RootState } from '../../../../store/store'
import styles from '../../SearchOrder.module.scss'

const CityAndRadius: React.FC<ICityAndRadius> = ({ openMap, setOpenSearchOrderMap, style }) => {
	const { user } = useSelector((state: RootState) => state.auth)
	const { city } = useSelector((state: RootState) => state.currentCity)
	const { searchRadius } = useSelector((state: RootState) => state.searchOrderRadius)

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div
				style={{ width: !openMap ? 240 : 310, ...style }}
				className={styles.searchOrder_container_section_map}
				onClick={() => setOpenSearchOrderMap && setOpenSearchOrderMap(true)}><span>{user?.city_name || city}</span>
				<img style={{ cursor: 'pointer' }} src={caret_png} alt="arrow" />
			</div>
			{searchRadius !== 0 ? <span style={{ color: '#8E8E93' }}>В радиусе {searchRadius} км</span> : null}
		</div>
	)
}

export default CityAndRadius

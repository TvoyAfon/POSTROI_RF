import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useOutsideClick } from '../../../hooks/useOutside'
import { changeCityCoords, ICoord } from '../../../store/slices/CurrentCitySlice'
import Loader from '../Loader/Loader'
import styles from './InputAddress.module.scss'
import { IInputAddress } from './inputAddress.props'

const InputAddressPopup: React.FC<IInputAddress> = ({ data, onClose, loading, setCurrentAddress }) => {
	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, onClose)
	const dispatch = useDispatch()

	const [previousCoords, setPreviousCoords] = useState<ICoord | null>(null)

	const handleClickCurrentAddress = (address: string, coords: [number, number]) => {
		const coordinates: ICoord = {
			lon: coords[0],
			lat: coords[1]
		}

		if (!previousCoords || previousCoords.lon !== coordinates.lon || previousCoords.lat !== coordinates.lat) {
			setPreviousCoords(coordinates)
			dispatch(changeCityCoords(coordinates))
			setCurrentAddress && setCurrentAddress(address)
			setTimeout(onClose, 0)
		}
	}
	return (
		<div ref={ref} className={styles['inputAddressPopup']}>
			{loading ? (
				<div className={styles['loaderContainer']}>
					<Loader text='Загрузка...' />
				</div>
			) : data && data.length > 0 ? (
				data.map((dt, index) => (
					<div className='flex-column gap-small' key={index}>
						<span
							onClick={() => handleClickCurrentAddress(dt.address, dt.coordinates)}
							style={{ cursor: 'pointer', fontWeight: 500, fontSize: 16 }}>{dt.address}</span>
					</div>
				))
			) : (
				<span style={{ textAlign: 'center' }}>По указанному адресу ничего не найдено.</span>
			)}
		</div>
	)
}

export default InputAddressPopup
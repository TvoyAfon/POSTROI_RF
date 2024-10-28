import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import loc_svg from '../../../assets/images/createOrder_img/location.svg'
import { useModal } from '../../../hooks/useModal'
import { useGetAddressByCoords } from '../../../hooks/yandex/useGetCoordsByAddress'
import { useGetDataByAddress } from '../../../hooks/yandex/useGetDataByAddress'
import { IInputAddress } from '../../../interface/inputCalendar.props'
import { RootState } from '../../../store/store'
import YandexMap from '../InputYandexMap/YandexMap'
import Tooltip from '../Tooltip/Tooltip'
import styles from './InputAddress.module.scss'
import InputAddressPopup from './InputAddressPopup'

const InputAddress: React.FC<IInputAddress> = ({ onChange, value, style, name = 'location', setCurrentAddress }) => {
	const [showMap, setShowMap] = useState<boolean>(false)
	const { data, error, loading } = useGetDataByAddress(value!)
	const { cityCoords } = useSelector((state: RootState) => state.currentCity)
	const { dataByCoords } = useGetAddressByCoords([cityCoords.lon, cityCoords.lat])
	const address = dataByCoords?.address

	const { handleClose, handleOpen, isOpen } = useModal()

	const [userChangedValue, setUserChangedValue] = useState<boolean>(false)

	useEffect(() => {
		if (address && setCurrentAddress) {
			setCurrentAddress(address)
		}
	}, [address])

	useEffect(() => {
		if (value && value.length > 0) {
			if (userChangedValue) {
				handleOpen()
			}
		} else if (value?.length === 0) {
			handleClose()
		}
	}, [value, userChangedValue])

	// Установка флага, если пользователь изменяет значение
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(e)
		setUserChangedValue(true)
	}

	return (
		<div className={styles.inputAddress}>
			<div
				style={{ display: 'flex', gap: 10, position: 'relative' }}>
				<input
					onFocus={() => setShowMap(true)}
					style={{ width: 600, height: 40, backgroundColor: '#F4F3F1', ...style, textOverflow: 'ellipsis' }}
					autoComplete='off'
					onChange={handleChange} // Используйте новый обработчик
					value={value}
					type="text"
					name={name}
					placeholder='Город, улица, дом' />
				<Tooltip style={{ position: 'absolute', top: "-79.5%", left: '25%' }}>
					<div>
						{address}
					</div>
				</Tooltip>
				{isOpen && data &&
					<InputAddressPopup
						setCurrentAddress={setCurrentAddress}
						onClose={handleClose}
						data={data}
						loading={loading}
						error={error} />}
				<button
					onClick={() => setShowMap(!showMap)}
					style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
					<img src={loc_svg} alt="location" />
				</button>
			</div>
			{showMap &&
				<YandexMap
					styleContainer={{ width: 600, height: 400 }} />}
		</div>
	)
}

export default InputAddress
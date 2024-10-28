import jscookie from 'js-cookie'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useGetGeoByIp } from '../../hooks/useGetGeoByIp'
import { IModalCity } from '../../interface/modal.props'
import { addCurrentCity } from '../../store/slices/CurrentCitySlice'
import { setTriggerCityCookie } from '../../store/slices/other/triggerFetch'
import styles from './ModalCurrentCity.module.scss'

const ModalCurrentCity: React.FC<IModalCity> = ({ handleCloseModalCity, handleOpenMap, style }) => {

	const dispatch = useDispatch()

	const cityByIp = useGetGeoByIp(jscookie.get('x-real-ip')!)



	const handleClose = () => {
		localStorage.setItem('currentCity', cityByIp)
		dispatch(addCurrentCity(cityByIp))
		dispatch(setTriggerCityCookie())
		handleCloseModalCity && handleCloseModalCity()
	}

	return (
		<>
			<div style={style} className={styles.modal_container} >
				<span style={{ fontSize: '18px' }}>Ваш город <span style={{ fontWeight: '500' }}>{cityByIp}?</span></span>
				<div style={{ display: 'flex', gap: '12px' }}>
					<button onClick={handleOpenMap} name='changeCity'>Сменить город</button>
					<button onClick={handleClose} name='done'>Все верно</button>
				</div>
			</div>
		</>
	)
}

export default ModalCurrentCity

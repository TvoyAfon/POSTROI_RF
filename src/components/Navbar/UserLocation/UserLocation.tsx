import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import glass_img from '../../../assets/images/mainpage_images/magnifying-glass-solid.png'
import { INavigationProps } from '../../../interface/navmenu.props'
import OverLay from '../../ui/OverLay'
import ToggleButton from '../../ui/ToggleButton/ToggleButton'
import styles from './UserLocation.module.scss'
import UserLocationCity from './UserLocationCity/UserLocationCity'
import UserLocationMap from './UserLocationMap/UserLocationMap'

import { userService } from '../../../services/user/user.service'
import { addOpenModalClickFlag } from '../../../store/closeModalClick/closeModalClickSlice'
import { changeUser } from '../../../store/slices/AuthSlice/AuthSlice'
import { addCurrentCity, changeCities, setCitiesByDefault } from '../../../store/slices/CurrentCitySlice'
import { openUserLocation } from '../../../store/slices/ModalUserLocationSlice/modalUserLocationSlice'
import { RootState } from '../../../store/store'
import CloseButton from '../../ui/CloseButton/CloseButton'
import Loader from '../../ui/Loader/Loader'
import UncorrectFormat from '../../ui/Modal/UncorrectFormat'

const UserLocation: React.FC<INavigationProps> = ({ handleCloseMap, isOpenMap, changeCity }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { cities } = useSelector((state: RootState) => state.currentCity)
  const [value, setValue] = useState('')
  const [isHidden, setIsHidden] = useState(false)
  const [isGeoLocation, setIsGeoLocation] = useState<boolean>(false)
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false)
  const { isOpenModalFlag } = useSelector((state: RootState) => state.modalClickFlag)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    setTimeout(() => {
      dispatch(openUserLocation(false))
    })

  }, [])

  useEffect(() => {
    dispatch(addOpenModalClickFlag(true))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const lowCaseVal = val.toLowerCase()

    setValue(val)

    // Если значение пустое, сбрасываем фильтр
    if (!val) {
      dispatch(setCitiesByDefault())
      return
    }
    // Фильтр городов по частичному совпадению по названию
    const filteredCities = cities.filter(city =>
      city.name.toLowerCase().includes(lowCaseVal)
    )
    // Если найдено совпадение, обновляем список городов
    if (filteredCities.length > 0) {
      dispatch(changeCities(filteredCities))
    } else {
      dispatch(changeCities([]))
    }
  }
  const handleBlur = () => {
    setIsHidden(false)
  }

  const handleCityChange = (cityByCoords: string) => {
    setValue(cityByCoords)
    localStorage.setItem('currentCity', cityByCoords)
  }

  const handleConfirm = async () => {

    if (!value) {
      setIsOpenErrorModal(true)
      return
    }

    if (!user?.id) {
      localStorage.setItem('currentCity', value)
      changeCity && changeCity(value)
      handleCloseMap && handleCloseMap()
      return dispatch(addCurrentCity(value))
    }

    try {
      setLoading(true)
      setIsOpenErrorModal(false)
      await userService.editCity(user?.id, value)
      dispatch(changeUser({
        ...user,
        city_name: value
      }))
      handleCloseMap && handleCloseMap()
    } catch (error) {
      setLoading(false)
      console.log('Не удалось изменить город', error)
    }
    setLoading(false)
  }

  return (
    <>
      {isOpenErrorModal && <UncorrectFormat
        text='Выберите нужный город'
        style={{ textAlign: 'center' }}
        onClose={() => setIsOpenErrorModal(false)} />}
      {isOpenModalFlag && <>
        <OverLay />
        <div className={styles.modal}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '20px', fontWeight: '600' }}>ГОРОД</span>
            <CloseButton
              style={{ width: 30, height: 30, borderRadius: '50%' }} onClick={handleCloseMap} />
          </div>
          <div>
            <div style={{
              display: 'flex'
            }}>
              <input
                onBlur={handleBlur}
                onFocus={() => setIsHidden(true)}
                onChange={handleChange}
                value={value}
                disabled={isGeoLocation}
                name='searchCity'
                type="text"
                placeholder='     Населенный пункт'
                style={{
                  backgroundImage: !value && !isHidden ? `url(${glass_img}) ` : '',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '3% 50%',
                }}
              />
              <ToggleButton
                label='Геолокация'
                onChange={state => setIsGeoLocation(state)}
                style={{
                  marginTop: '8px',
                  marginLeft: '10px',
                }}
                labelStyle={{
                  marginTop: '9px'
                }}
              />
            </div>

            {isGeoLocation ? <UserLocationMap
              onCitiesChange={handleCityChange}
              isOpenSearchOrderMap={isOpenMap} /> : <UserLocationCity setValue={setValue} />}
          </div>
          <button onClick={handleConfirm}>{loading ? <Loader color='white' /> : 'Подтвердить'}</button>
        </div>
      </>}
    </>
  )
}

export default UserLocation

/*
<div 
                style={{display:'flex ',flexDirection:'row',paddingTop:'16px',paddingBottom:'32px'}}>
                  <input type='radio' name='radioCurrentCity'/>
                  <label htmlFor='radioCurrentCity'></label>
              </div>
*/
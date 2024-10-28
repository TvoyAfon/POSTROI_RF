import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCityCoords } from '../../../../store/slices/CurrentCitySlice'
import { RootState } from '../../../../store/store'
import styles from './UserLocationCity.module.scss'

interface IUserLocationCity {
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const UserLocationCity: React.FC<IUserLocationCity> = ({ setValue }) => {
  const cities = useSelector((state: RootState) => state.currentCity.cities)
  const dispatch = useDispatch()

  if (cities.length === 0) {
    return <span style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', paddingTop: '32px' }}>Город не найден</span>
  }

  const handleClick = (cityName: string) => {
    setValue(cityName)
    const coords = cities.find(city => city.name === cityName)?.coords
    dispatch(changeCityCoords(coords))
  }

  return (
    <div className={styles.cityList}>
      {
        cities.map((city, index) => <ul key={index} >
          <li
            onClick={() => handleClick(city.name)}
            style={{ paddingBottom: '16px', fontWeight: 500 }}>{city.name}</li>
        </ul>)
      }
    </div>
  )
}

export default UserLocationCity

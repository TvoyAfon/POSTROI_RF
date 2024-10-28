import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetAddressByCoords } from '../../../../hooks/yandex/useGetCoordsByAddress'
import { IUserLocationMap } from '../../../../interface/userLocationMap.props'
import { RootState } from '../../../../store/store'
import CheckboxButton from '../../../ui/CheckboxButton/CheckboxButton'
import Field from '../../../ui/Field/Field'
import YandexMap from '../../../ui/InputYandexMap/YandexMap'
import SearchRadiusMap from './SearchRadiusMap/SearchRadiusMap'
import styles from './UserLocationMap.module.scss'

const UserLocationMap: React.FC<IUserLocationMap> = ({ isOpenSearchOrderMap, height = '370px', onCitiesChange }) => {

  const [currentSearch, setCurrentSearch] = useState<string>('radius')
  const { cityCoords } = useSelector((state: RootState) => state.currentCity)
  const { dataByCoords } = useGetAddressByCoords([cityCoords.lon, cityCoords.lat])

  useEffect(() => {
    if (!dataByCoords?.city) return
    onCitiesChange(dataByCoords?.city)
  }, [dataByCoords])

  return (
    <div className={styles.map_container} style={{ height: isOpenSearchOrderMap ? '550px' : height }}>
      {isOpenSearchOrderMap && (
        <div className='flex-column gap-large'>
          <CheckboxButton label='Сначала в выбранном городе' />
          <section className={styles.map_container_section} style={{ display: 'flex', gap: 14 }}>
            <span style={{ fontWeight: currentSearch === 'radius' ? '700' : '' }} onClick={() => setCurrentSearch('radius')}>Радиус поиска</span>
            <span style={{ fontWeight: currentSearch === 'metro' ? '700' : '' }} onClick={() => setCurrentSearch('metro')}>Метро</span>
            <span style={{ fontWeight: currentSearch === 'street' ? '700' : '' }} onClick={() => setCurrentSearch('street')}>Районы</span>
          </section>
          <section style={{ paddingBottom: 16 }}>
            {currentSearch === 'radius' && <SearchRadiusMap />}
            {currentSearch === 'metro' && <Field style={{ width: '80%' }} placeholder='Станция Метро' />}
            {currentSearch === 'street' && <Field style={{ width: '80%' }} placeholder='Район' />}
          </section>
        </div>
      )}
      <div className={styles.map_container_map}>
        <YandexMap />
      </div>
    </div>
  )
}

export default UserLocationMap
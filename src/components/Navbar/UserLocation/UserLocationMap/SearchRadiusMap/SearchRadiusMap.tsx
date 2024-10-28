import React from 'react'
import { useDispatch } from 'react-redux'
import { changeSearchRadius } from '../../../../../store/slices/searchOrder/searchRadiusSlice'
import styles from '../UserLocationMap.module.scss'

const searchRadiusArr = [1, 2, 3, 5, 10, 15, 25, 50, 100, 150, 200]

const SearchRadiusMap: React.FC = () => {

  const dispatch = useDispatch()

  return (
    <section className={styles.map_container_searchRadius}>
      {searchRadiusArr.map((radius, index) => (
        <button onClick={() => dispatch(changeSearchRadius(radius))} key={index}>{radius}</button>
      ))}
    </section>
  )
}

export default SearchRadiusMap

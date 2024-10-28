import React from 'react'
import OverLay from '../Modal/OverLay'
import styles from './SearchInputPopup.module.scss'

const SearchInputPopup: React.FC = () => {
  return (<>
    <OverLay />
    <div className={styles.inputPopup_container}>

    </div>
  </>
  )
}

export default SearchInputPopup

import React from 'react'
import styles from './SearchInputPopup.module.scss'
import OverLay from './OverLay'

const SearchInputPopup:React.FC = () => {
  return ( <>
    <OverLay/>
    <div className={styles.inputPopup_container }>   
    </div>
    </>
  )
}

export default SearchInputPopup

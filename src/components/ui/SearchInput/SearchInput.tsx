import React, { useState } from 'react'
import glass_img from '../../../assets/images/mainpage_images/magnifying-glass-solid.png'
import styles from '../../MainPage/MainPage.module.scss'
import Button from '../Button/Button'
import SearchInputPopup from './SearchInputPopup'

const SearchInput: React.FC = () => {
  const [value, setValue] = useState('')
  const [isHidden, setIsHidden] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setPopup(true)
  }

  const [popup, setPopup] = useState(false)

  const handleBlur = () => {
    setIsHidden(false)
    setPopup(false)
  }

  return (
    <div>
      <div className={styles.searchInput} style={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
        <input onBlur={handleBlur} onFocus={() => setIsHidden(true)} onChange={handleChange} value={value} style={
          {
            backgroundImage: !value && !isHidden ? `url(${glass_img}) ` : '',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '3% 50%',
          }
        }
          className={styles.mainPage_input}
          type='text'
          placeholder='          Найти исполнителя или заказ' />
        <Button className={styles.mainPage_inputButton}>
          Поиск
        </Button>
      </div>
      {popup && <SearchInputPopup />}
    </div>

  )
}

export default SearchInput

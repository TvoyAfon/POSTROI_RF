import React, { useEffect, useRef, useState } from 'react'
import glass_img from '../../../assets/images/mainpage_images/magnifying-glass-solid.png'
import { ISearchInput } from '../../../interface/searchInput.props'
import Button from '../../ui/Button/Button'
import SearchInputPopup from '../../ui/SearchInputPopup'
import styles from '../MainPage.module.scss'

const SearchInput: React.FC<ISearchInput> = ({ inputRef, placeholder }) => {
  const [value, setValue] = useState('')
  const [popupVisible, setPopupVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (value) {
      document.body.classList.add('stop-scrolling')
    }

    if (e.target.value) {
      setPopupVisible(true)
    } else {
      setPopupVisible(false)
    }
  }

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && buttonRef.current) {
      buttonRef.current.click()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEnter)
    return () => {
      window.removeEventListener('keydown', handleEnter)
    }
  }, [])

  const handleSearch = () => {
    console.log('Search triggered for:', value)
  }

  const handleBlur = () => {
    setPopupVisible(false)
    document.body.classList.remove('stop-scrolling')
  }



  return (
    <div>
      <div className={styles.searchInput} style={{ display: 'flex', justifyContent: 'center', paddingTop: 30 }}>
        <input
          ref={inputRef}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          style={{
            backgroundImage: !value ? `url(${glass_img})` : '',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '3% 50%',
          }}
          className={styles.mainPage_input}
          type='text'
          placeholder={placeholder}
        />
        <Button
          ref={buttonRef}
          onClick={handleSearch}
          className={styles['mainPage_inputButton']} style={{ zIndex: popupVisible ? '11' : '0' }}>
          Поиск
        </Button>
      </div>
      {popupVisible && <SearchInputPopup />}
    </div>
  )
}

export default SearchInput
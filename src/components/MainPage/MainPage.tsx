import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import banner_svg from '../../assets/images/mainpage_images/main_banner.svg'
import { useClearAllCategoryData } from '../../hooks/clearCategoryData/useClearAllCategoryData'
import { useResetAllCategorySteps } from '../../hooks/resetAllCategorySteps/useResetAllCategorySteps'
import { clearDateRange } from '../../store/slices/CalendarSlice/CalendarSlice.ts'
import Cookie from '../Cookie/Cookie'
import Footer from '../Footer/Footer.tsx'
import Categories from '../MainPage/Categories/Categories.tsx'
import AdvertApp from './AdvertApp/AdvertApp'
import ArrowToTop from './ArrowToTop/ArrowToTop'
import Banner from './Banner/Banner'
import styles from './MainPage.module.scss'
import SearchInput from './SearchInput/SearchInput'
import StageCommun from './StageCommun/StageCommun'

const MainPage: React.FC = () => {

  const [showForm, setShowForm] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearDateRange())
  }, [])




  useEffect(() => {
    setTimeout(() => {
      setShowForm(true)
    }, 3500)
  }, [setShowForm])

  const resetAllCategoriesSteps = useResetAllCategorySteps()
  const resetAllCategoryData = useClearAllCategoryData()

  useEffect(() => {
    resetAllCategoriesSteps()
    resetAllCategoryData()
  }, [])

  useEffect(() => {
    const hasShownPopup = localStorage.getItem('hasShownCookie')
    if (!hasShownPopup) {
      setIsVisible(true)

    }
  }, [])


  const closeCookie = () => {
    setIsVisible(false)
    localStorage.setItem('hasShownCookie', 'true')
    setShowForm(false)
  }

  const handleSearchInput = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'

    })
    setTimeout(() => {
      inputRef.current?.focus()
    }, 600)
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }} className={styles.mainPage}>
        <SearchInput placeholder='              Найти исполнителя или заказ' inputRef={inputRef} />
        <Banner />
        <Categories />
        <img src={banner_svg} alt="banner" />
        <div className={styles.mainPage_motivation}>
          <span style={{ color: 'white' }}>ПОСТРОЙ.
            <span style={{ color: '#FF8B63' }}>РФ</span>
          </span>
          <span style={{ color: 'white' }}>ВАШ ЛУЧШИЙ ПОМОЩНИК</span>
          <button onClick={handleSearchInput}>Поиск</button>
        </div>
        <StageCommun />
        <AdvertApp />
        <ArrowToTop />
        {showForm && isVisible && <Cookie closeCookie={closeCookie} />}
      </div>
      <Footer />
    </div>

  )
}

export default MainPage

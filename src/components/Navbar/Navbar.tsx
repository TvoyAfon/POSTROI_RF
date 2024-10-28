import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import burger2 from '../../assets/images/navbar/Burger_2.svg'
import { useClearAllCategoryData } from '../../hooks/clearCategoryData/useClearAllCategoryData'
import { ROUTES_NAVBAR, ROUTES_NAVBAR_LIST, ROUTES_PATH } from '../../routes/routes'
import { changeCategoryName } from '../../store/slices/CreateOrderCategoriesSlice'
import { setCitiesByDefault } from '../../store/slices/CurrentCitySlice'
import { isLogoClickFlag, openConfirmModalSearch, openConfirmModalSigns } from '../../store/slices/ModalConfirmSlice/modalConfirmSlice'
import { setColorNav } from '../../store/slices/SetNavColorSlice'
import { RootState } from '../../store/store'
import BusinessButton from './Buttons/BusinessButton'
import LogInButton from './Buttons/LogInButton'
import styles from './Navbar.module.scss'
import NavbarLogo from './NavbarLogo/NavbarLogo'
import NavbarMenu from './NavbarMenu'
import NavbarMenuPopup from './NavbarMenuPopup'
import NavbarNavigation from './NavbarNavigation'
import NavbarPopUp from './NavbarPopUp/NavbarPopUp'
import UserCorner from './UserCorner/UserCorner'
import UserLocation from './UserLocation/UserLocation'

const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const [activeItem, setActiveItem] = useState<string>('')
  const navigate = useNavigate()
  const clearAllData = useClearAllCategoryData()
  const { navContainer } = useSelector((state: RootState) => state.resetColorNav)
  const { isOpenNavbarPopup } = useSelector((state: RootState) => state.openNavbarPopupSlice)

  const handleToogleOpen = () => {
    setIsOpenMenu(!isOpenMenu)
  }


  useEffect(() => {
    const item = location.pathname
    if (!ROUTES_NAVBAR_LIST.includes(item)) {
      return setActiveItem('')
    }
    setActiveItem(item)
  }, [location])
  const handleNavClick = () => {
    /* при условии если  последняя форма */
    dispatch(isLogoClickFlag(true))
    if (location.pathname !== `${ROUTES_NAVBAR.createOrder}`
      && location.pathname !== `${ROUTES_NAVBAR.createSigns}`) {
      navigate(ROUTES_PATH.main)
      clearAllData()
      dispatch(changeCategoryName(''))
    }

    /* ПОФИКСИТЬ БАГ С ОБНУЛЕНИЕМ */
    dispatch(openConfirmModalSearch(true))
    dispatch(openConfirmModalSigns(true))
    setIsOpenMenu(false)
    handleOpenMap()
  }

  const handleOpenMap = () => {
    setIsOpenMap(true)
    dispatch(setCitiesByDefault())
  }

  const handleCloseMap = () => {
    setIsOpenMap(false)
    dispatch(setColorNav(''))
  }

  const handleClosePopUp = () =>
    setIsOpenMenu(false)

  return (
    <>

      <div
        className={styles.navbar_overlay}
        style={{ width: '100%', height: '80px', backgroundColor: 'white', position: 'fixed', zIndex: !isOpenNavbarPopup ? '10' : '12', boxShadow: !isOpenNavbarPopup ? '' : 'rgba(0, 0, 0, 0.2) 0px 10px 14px 0px, rgba(0, 0, 0, 0.1) 0px 2px 2px 0px, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px' }}>
        <nav className={styles.navbar}>

          <div className={styles.logoAndBurger} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <NavbarLogo handleNavClick={handleNavClick} />
            {!isOpenMenu ? <NavbarMenu handleToogleOpen={handleToogleOpen} /> : <img
              src={burger2}
              onClick={handleToogleOpen}
              className={styles.navbarPopup_button} />}
          </div>
          <ul className={styles.navbar_navigation}>
            <NavbarNavigation
              activeItem={activeItem}
              handleCloseMap={handleCloseMap}
              isOpenMap={isOpenMap}
              handleNavClick={handleNavClick} />
          </ul>
          {
            !user
              ?
              <div className={styles.navbar_buttons}>
                <LogInButton />
                <BusinessButton />
              </div>
              : <UserCorner />
          }

        </nav>
        {navContainer === 'map' && <UserLocation handleCloseMap={handleCloseMap} />}
      </div>
      {isOpenMenu && <NavbarMenuPopup handleClosePopUp={handleClosePopUp} isOpenMenu={isOpenMenu} />}
      {isOpenNavbarPopup && <NavbarPopUp />}
    </>
  )
}

export default Navbar
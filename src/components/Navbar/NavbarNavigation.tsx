import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import caret_png from '../../assets/images/navbar/Vector.svg'

import { INavigationProps } from '../../interface/navmenu.props'
import { ROUTES_NAVBAR } from '../../routes/routes'
import { addCurrentCity, addLinkRef } from '../../store/slices/CurrentCitySlice'
import { toggleNavbarPopup } from '../../store/slices/other/openNavbarPopup'
import { setColorNav } from '../../store/slices/SetNavColorSlice'
import { RootState } from '../../store/store'
import ModalCurrentCity from '../ModalCurrentCity/ModalCurrentCity'
import AuthedNavbar from './AuthedNavbar'
import styles from './Navbar.module.scss'



const NavbarNavigation: React.FC<INavigationProps> = ({ activeItem }) => {
  const location = useLocation()
  const { city } = useSelector((state: RootState) => state.currentCity)
  const user = useSelector((state: RootState) => state.auth.user)
  const navRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const { navContainer } = useSelector((state: RootState) => state.resetColorNav)
  const [isOpenModalCity, setIsOpenModalCity] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const [closeUserLocation, setCloseUserLocation] = useState(false)

  const cityByIp = localStorage.getItem('currentCity')

  useEffect(() => {
    if (!user?.city_name && cityByIp) {
      dispatch(addCurrentCity(cityByIp))
    }
  }, [cityByIp])


  const navs = [
    {
      itemName: 'createorder',
      name: 'Создать заказ',
    },
    {
      url: ROUTES_NAVBAR.searchOrder,
      itemName: 'searchorder',
      name: "Найти заказ"
    }
  ]

  const handleOpenNav = () => {
    dispatch(toggleNavbarPopup())

  }

  useEffect(() => {
    setTimeout(() => {
      setIsOpenModalCity(true)
      dispatch(setColorNav(''))
    }, 1000)
  }, [])


  // Проверяем, сохранялось ли значение в sessionStorage
  useEffect(() => {
    const hasShownPopup = localStorage.getItem('hasShownPopup')
    if (!hasShownPopup) {
      setIsVisible(true)
    }
  }, [])


  useEffect(() => {
    dispatch(addLinkRef(navRef))
  }, [navRef])

  useEffect(() => {
    dispatch(setColorNav(''))
  }, [closeUserLocation])


  const handleClickMap = () => {
    dispatch(setColorNav('map'))
  }

  const handleCloseModalCity = () => {
    setIsVisible(false)
    localStorage.setItem('hasShownPopup', 'true')

    setIsOpenModalCity(false)
    setCloseUserLocation(true)
  }


  const handleOpenModalCity = () => {
    setIsVisible(false)
    localStorage.setItem('hasShownPopup', 'true')
    setIsOpenModalCity(false)
  }



  return (<>
    <div className={styles.nav_navigate}>
      <div style={{ whiteSpace: 'break-word', cursor: 'pointer', marginTop: 3 }} ref={navRef}>
        <div style={{ fontSize: 14, fontWeight: 500 }}
          onClick={handleClickMap}>{user?.city_name || city}  <img src={caret_png} alt="caret" />
          {isOpenModalCity && isVisible &&
            location.pathname == '/' &&
            <ModalCurrentCity
              handleOpenMap={handleOpenModalCity}
              handleCloseModalCity={handleCloseModalCity} />}
        </div>
        <hr style={{ position: 'relative', bottom: '10px', border: navContainer === 'map' ? '1px solid rgb(255, 139, 99)' : '1px solid #749EF2' }} />
      </div>
      {
        !user
          ?
          <div style={{ display: 'flex', gap: 60 }}>
            {
              navs.map((nav, index) => (
                <div key={index}>
                  {nav.url ? (
                    <>
                      <Link
                        style={{ color: '#262626', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}
                        to={nav.url}>{nav.name}</Link>
                      <hr
                        style={{ position: 'relative', bottom: '10px', border: activeItem === nav.url ? '1px solid rgb(255, 139, 99) ' : '1px solid #749EF2' }} />
                    </>) :
                    <>
                      <span
                        onClick={handleOpenNav}
                        style={{ color: '#262626', textDecoration: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{nav.name}</span>
                      <hr
                        style={{ position: 'relative', bottom: '10px', border: location.pathname === '/createorder' ? '1px solid rgb(255, 139, 99) ' : '1px solid #749EF2' }} />
                    </>
                  }
                </div>
              ))
            }
          </div>
          : <AuthedNavbar activeItem={activeItem} />
      }

    </div>
  </>
  )
}

export default NavbarNavigation

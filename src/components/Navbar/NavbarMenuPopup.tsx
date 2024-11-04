import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import caret_png from '../../assets/images/mainpage_images/caret-up-solid 1.png'
import { useCurrentNavRoute } from '../../common/categories'
import { useOutsideClick } from '../../hooks/useOutside'
import { INavigationProps } from '../../interface/navmenu.props'
import { setColorNav } from '../../store/slices/SetNavColorSlice'
import { RootState } from '../../store/store'
import styles from './Navbar.module.scss'

const NavbarMenuPopup: React.FC<INavigationProps> = ({ handleClosePopUp }) => {
  const { navContainer } = useSelector((state: RootState) => state.resetColorNav)
  const { user } = useSelector((state: RootState) => state.auth)
  const { city } = useSelector((state: RootState) => state.currentCity)
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, handleClosePopUp!)

  const handleClickCat = (nav: string) => {
    dispatch(setColorNav(nav))
    handleClosePopUp && handleClosePopUp()
  }
  const navRouter = useCurrentNavRoute()

  return (
    <>
      <div
        ref={ref}
        style={{ position: 'fixed', top: '200px', left: '35%', zIndex: 11 }} className={styles.navbarmenu_popup}>
        <div className={styles.navbarmenu_overlay}>
          <div className={styles.navbarmenu}>
            <div style={{ position: 'relative' }}>
              <li style={{ cursor: 'pointer' }}
                onClick={() => handleClickCat('map')}>{user?.city_name ? user.city_name : city}
                <img src={caret_png} alt="caret" />
              </li>
              <hr
                style={{
                  border: navContainer === 'map' ? '1px solid rgb(255, 139, 99)' : '1px solid #749EF2',
                  position: 'absolute',
                  width: 250,
                  top: 11
                }} />
            </div>
            <div style={{ position: 'relative' }}>
              <Link
                onClick={() => handleClickCat('create')}
                style={{ color: '#262626', textDecoration: 'none' }} to={navRouter[0].route}>{navRouter[0].routeName}</Link>
              <hr
                style={{
                  border: navContainer === 'create' ? '1px solid rgb(255, 139, 99)' : '1px solid #749EF2',
                  position: 'absolute',
                  width: 250,
                  top: 11
                }} />
            </div>
            <div style={{ position: 'relative' }}>
              <Link
                onClick={() => handleClickCat('search')}
                style={{ color: '#262626', textDecoration: 'none' }}
                to={navRouter[1].route}>{navRouter[1].routeName}</Link>
              <hr
                style={{
                  border: navContainer === 'search' ?
                    '1px solid rgb(255, 139, 99)' : '1px solid #749EF2',
                  position: 'absolute',
                  width: 250,
                  top: 11
                }} />
            </div>
            <div style={{ position: 'relative' }}>
              <Link
                onClick={() => handleClickCat('expl')}
                style={{ color: '#262626', textDecoration: 'none' }}
                to={navRouter[2].route}>{navRouter[2].routeName}</Link>
              <hr
                style={{
                  border: navContainer === 'expl' ?
                    '1px solid rgb(255, 139, 99)' : '1px solid #749EF2',
                  position: 'absolute',
                  width: 250,
                  top: 11
                }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarMenuPopup

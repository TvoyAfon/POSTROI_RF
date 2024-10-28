import React from 'react'
import burger_svg from '../../assets/images/navbar/burger.svg'
import { INavMenu } from '../../interface/navmenu.props'
import styles from './Navbar.module.scss'


const NavbarMenu: React.FC<INavMenu> = ({ handleToogleOpen }) => {
  return (
    <img style={{cursor:'pointer'}} src={burger_svg} onClick={handleToogleOpen} className={styles.button_menu} />
  )
}

export default NavbarMenu

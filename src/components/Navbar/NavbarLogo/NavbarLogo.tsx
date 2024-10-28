import React from 'react'
import Logo_svg from '../../../assets/images/other/LOGO_MAIN.svg'

const NavbarLogo: React.FC<{ handleNavClick?: () => void }> = ({
	handleNavClick }) => {

	return (
		<div
			onClick={() => handleNavClick && handleNavClick()}
			style={{ textDecoration: 'none', cursor: 'pointer' }}
		>
			<img src={Logo_svg} alt="logo" />
		</div >
	)
}

export default NavbarLogo

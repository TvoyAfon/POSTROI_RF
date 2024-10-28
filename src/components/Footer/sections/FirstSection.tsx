import React from 'react'
import { useNavigate } from 'react-router-dom'
import vk_logo from '../../../assets/images/other/VK LogoType.svg'
import tg_logo from '../../../assets/images/other/Vk_logo.svg'
import { ROUTES_CATEGORY } from '../../../routes/routes'
import NavbarLogo from '../../Navbar/NavbarLogo/NavbarLogo'
import styles from '../Footer.module.scss'
import { firstSection } from './common/footerSections'

const FirstSection: React.FC = () => {
	const nav = useNavigate()
	return (
		<div className={styles['firstSection']}>
			<NavbarLogo />
			<header style={{ fontSize: 14, fontWeight: 600 }}>О компании</header>
			<section className={styles['firstSection_section']}>
				{firstSection.map((el, index) => (
					<span key={index}>{el.name}</span>
				))}
			</section>
			<div style={{ display: 'flex', gap: 24, paddingBottom: 16 }}>
				<img src={tg_logo} alt="vk_logo" />
				<img style={{ width: 48, height: 48 }} src={vk_logo} alt="vk_logo" />
			</div>
			<span onClick={() => nav(ROUTES_CATEGORY.projectMap)} style={{ fontWeight: 600 }}>Карта сайта</span>
		</div >
	)
}

export default FirstSection

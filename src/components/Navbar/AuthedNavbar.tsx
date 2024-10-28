import { FC } from 'react'
import walletIcon from '../../assets/images/navbar/wallet.svg'
import { INavigationProps } from '../../interface/navmenu.props'
import { ROUTES_AUTHED_NAVBAR } from '../../routes/routes'
import Badge from '../ui/Badge/Badge'
import NavLink from './ui/NavLink'

const { ordersAndProjects, ads, balance } = ROUTES_AUTHED_NAVBAR

const AuthedNavbar: FC<INavigationProps> = ({ activeItem }) => {


	return (
		<div style={{ display: 'flex', gap: 60, paddingBottom: 7 }}>
			<li style={{
				display: 'flex',
				gap: '5px',
			}}>
				<NavLink selectionColor=' 1px solid #FFB31D' isSelected={activeItem === ordersAndProjects} to={ordersAndProjects}>
					Заказы и проекты
				</NavLink>
				<Badge content='' style={{
					marginTop: '2px',
					width: '16px',
					height: '16px'
				}} contentStyle={{
					color: '#fff'
				}} />
			</li>
			<li style={{
				display: 'flex',
				gap: '5px'
			}}>
				<NavLink selectionColor=' 1px solid #FFB31D' isSelected={activeItem === ads} to={ads}>Объявления</NavLink>
			</li>
			<li style={{
				display: 'flex',
				gap: '8px'
			}}>

				<NavLink selectionColor=' 1px solid #FFB31D' isSelected={activeItem === balance} to={balance} style={{
					marginBottom: '7px',
					display: 'flex',
					gap: '5px',
					alignItems: 'center'
				}}>
					<img style={{ width: 20, height: 20, paddingBottom: 2 }} src={walletIcon} alt="" />
					<span style={{ fontSize: 14, fontWeight: 500 }}>Баланс</span>
					<span style={{ fontSize: 14, fontWeight: 500 }}>0 ₽</span>
				</NavLink>
			</li>
		</div>
	)
}

export default AuthedNavbar
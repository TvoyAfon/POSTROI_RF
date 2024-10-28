import { MouseEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import caretUp from '../../../assets/images/mainpage_images/caret-up-solid 1.png'
import addCircleFilled from '../../../assets/images/profile/add-circle-filled.svg'
import { ROUTES_AUTHED_NAVBAR } from '../../../routes/routes'
import { changeUser } from '../../../store/slices/AuthSlice/AuthSlice'
import { RootState } from '../../../store/store'
import { logOut } from '../../Auth/utils/utils'
import Avatar from '../../ui/Avatar/Avatar'
import IconButton from '../../ui/IconButton/IconButton'
import PopupMenu from '../../ui/PopupMenu/PopupMenu'
import Divider from './Divider'
import Link from './Link'

const UserPopup = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const isOpen = Boolean(anchorEl)
	const dispatch = useDispatch()
	const triggerClassName = 'user-popup-trigger'
	const { user } = useSelector((state: RootState) => state.auth)
	const { chatClient } = useSelector((state: RootState) => state.chat)

	const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
		if (isOpen) return setAnchorEl(null)

		if (e.target instanceof HTMLElement) {
			setAnchorEl(e.target)
		}
	}

	const nav = useNavigate()

	const links = [
		{
			name: "Платные услуги",
			url: "#",
			color: '#7099ED'
		},
		{
			divider: true
		},
		{
			name: "Мои объявления",
			url: "#",
			color: '#7099ED'
		},
		{
			name: "Мои заказы",
			url: `${ROUTES_AUTHED_NAVBAR.ordersAndProjects}`,
			color: '#7099ED'
		},
		{
			name: "Мои отзывы",
			url: "#",
			color: '#7099ED'
		},
		{
			name: "Избранное",
			url: "#",
			color: '#7099ED'
		},
		{
			divider: true
		},
		{
			name: "Сообщения",
			url: "#",
			color: '#7099ED'
		},
		{
			name: "Уведомления",
			url: "#",
			color: '#7099ED'
		},
		{
			divider: true
		},
		{
			name: "Управление профилем",
			url: "#",
			color: '#7099ED'
		},
		{
			name: "Настройки",
			url: "#",
			color: '#7099ED'
		},
		{
			divider: true
		},
		{
			name: "Выйти",
			url: "#",
			color: '#262626',
			onClick: () => {
				logOut(chatClient, dispatch)
				dispatch(changeUser(null))
				nav('/')
			}
		},
	]

	return (
		<>
			<IconButton imgClassName={triggerClassName} className={triggerClassName} icon={caretUp} onClick={handleToggle} />
			<PopupMenu triggerClassName={triggerClassName} onClose={() => setAnchorEl(null)} style={{
				gap: '8px',
				display: 'flex',
				flexDirection: 'column',
				overflowY: 'scroll',
				scrollbarWidth: 'none',
				height: '600px',
				zIndex: 999
			}}
				anchorEl={anchorEl}
				isOpen={isOpen}
			>
				<span style={{ fontWeight: 600 }}>Мои профили</span>
				<div style={{
					display: 'flex',
					gap: '8px',
					marginTop: '8px'
				}}>
					<Avatar src={user?.profile_photo as string} />
					<Avatar src={addCircleFilled} style={{
						cursor: 'pointer'
					}} />
				</div>
				<Divider />
				<Link style={{
					display: 'flex',
					justifyContent: 'space-between',

				}}
					onClick={() => nav(ROUTES_AUTHED_NAVBAR.balance)}
				>
					<span style={{
						color: '#7099ED'
					}}>Баланс</span>
					<span>0 Р</span>
				</Link>
				{
					links.map((link, index) => (
						link.divider
							? <Divider key={index} />
							:
							<Link key={link.name} onClick={link.onClick} style={{
								color: link.color
							}}>
								{link.name}
							</Link>
					))
				}
			</PopupMenu>
		</>

	)
}

export default UserPopup
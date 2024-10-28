import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import chatIcon from '../../../assets/images/navbar/chat.svg'
import notificationsIcon from '../../../assets/images/navbar/notifications.svg'
import { openChat } from '../../../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../../../store/store'
import Avatar from '../../ui/Avatar/Avatar'
import Badge from '../../ui/Badge/Badge'
import IconButton from '../../ui/IconButton/IconButton'
import UserCornerNotification from './Modal/UserCornerNotification'
import UserPopup from './UserPopup'

const UserCorner = () => {
	const nav = useNavigate()
	const [openModalNotific, setOpenModalNotificat] = useState(false)
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state.auth)
	const { chatList } = useSelector((state: RootState) => state.chat)

	const handleOpenNotif = () => {
		setOpenModalNotificat(!openModalNotific)
	}

	const handleCloseNotif = () => {
		setOpenModalNotificat(!openModalNotific)
	}

	const handleOpenChat = () => dispatch(openChat(true))

	const hasNotifications = useMemo(() => Boolean(chatList.filter(chat => chat.unread_count && !chat.is_notifications_disabled).length), [chatList])

	return (
		<div style={{
			display: 'flex',
			gap: '8px'
		}}>
			<div style={{
				display: 'flex',
				position: 'relative'
			}}>
				<IconButton onClick={handleOpenNotif} icon={notificationsIcon} />
				<IconButton icon={chatIcon} onClick={handleOpenChat} />
				{
					hasNotifications
					&&
					<Badge
						title='Есть непрочитанные сообщения'
						content=''
						style={{
							marginTop: '2px',
							width: '10px',
							height: '12px',
							marginLeft: '-5px'
						}} />
				}
				{openModalNotific && <UserCornerNotification
					onClose={handleCloseNotif}
					stateValue={openModalNotific} />}
			</div>
			<div onClick={() => nav('/me')} style={{
				display: 'flex',
				gap: '11px',
				cursor: 'pointer'
			}}>
				<Avatar
					src={user?.profile_photo && user.profile_photo as string} style={{
						marginTop: '3px'
					}} />
				<div style={{
					display: 'flex',
					flexDirection: 'column'
				}}>
					<span>{user?.first_name}</span>
					<i style={{
						fontWeight: '300',
						color: 'gray',
					}}>{user?.category_person === 'Индивидуальный предприниматель' ? 'Индивид. предпр.' : user?.category_person}</i>
				</div>
			</div>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				marginTop: '8px'
			}}>
				<UserPopup />
			</div>
		</div>
	)
}

export default UserCorner
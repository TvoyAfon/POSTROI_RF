import { FC, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import notificationsOffIcon from '../../../../assets/images/chat_images/notification-off-01.svg'
import notificationsOffIconWhite from '../../../../assets/images/chat_images/notifications-off-white.svg'
import { setSelectedChatId } from '../../../../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../../../../store/store'
import { getDate } from '../../../../utils/date'
import NoAvatar from '../../../Profile/ui/NoAvatar'
import Badge from '../../../ui/Badge/Badge'
import { getReadIcon, textOverflow } from '../../utils/utils'
import GroupAvatar from '../Conversation/ui/GroupAvatar'
import OnlineStatus from '../Conversation/ui/OnlineStatus'
import { IChatListItem } from './chat-list-item.props'
import styles from './ChatList.module.scss'
import { userCategories } from './types'

const ChatListItem: FC<IChatListItem> = ({
	id,
	avatar,
	name,
	onClick,
	category,
	lastMessage,
	noLastMessageText = 'Нет сообщений',
	unreadCount,
	isOnline = undefined,
	rightComponent,
	style = {},
	isClickable = true,
	selected = false,
	isGroup = false,
	isNotificationsDisabled = false,
	chatColor,
	hasSelection = true,
	avatarStyle = {}
}) => {
	const { selectedChatId } = useSelector((state: RootState) => state.chat)
	const dispatch = useDispatch()
	const isSelected = (id === selectedChatId) || selected

	const categoryData = useMemo(() => category && userCategories[category], [category])
	const msgTextOverflow = useMemo(() => textOverflow(lastMessage?.message_text || '', 21), [lastMessage])
	const msgDate = useMemo(() => lastMessage?.sent_time ? getDate(lastMessage.sent_time, true) : null, [lastMessage])
	const readIcon = useMemo(() => getReadIcon(lastMessage?.is_read, isSelected), [lastMessage, isSelected])

	const handleClick = () => {
		if (!isClickable) return onClick && onClick()
		if (isGroup && id) {
			return void dispatch(setSelectedChatId(null))
		}

		id && dispatch(setSelectedChatId(id))
	}

	return (
		<div onClick={handleClick} className={`${styles['chat-list__item']} ${isSelected && hasSelection ? styles['chat-list__item-selected'] : ''}`} style={{
			cursor: isClickable ? 'pointer' : 'default',
			...style
		}}>
			{
				category
				&&
				<div className={styles['chat-list__item-category']} style={{
					background: categoryData?.color
				}}></div>
			}
			{
				isOnline === undefined || isOnline === null
					?
					avatar
						?
						<NoAvatar photoURL={avatar} name={name || ''} style={{
							marginTop: '7px',
							...avatarStyle
						}} />
						:
						<GroupAvatar
							style={{
								marginTop: '4px'
							}}
							color={chatColor || '#000'}
						/>
					:
					<OnlineStatus isOnline={Boolean(isOnline)} style={isSelected && hasSelection ? {
						background: '#fff'
					} : {}}>
						<NoAvatar photoURL={avatar} name={name || ''} style={{
							marginTop: '7px',
							...avatarStyle
						}} />
					</OnlineStatus>
			}
			<div style={{
				display: 'flex', flexDirection: 'column',
				gap: '8px', marginTop: '5px'
			}}>
				<b title={name} style={{
					marginRight: 'auto'
				}}>{name ? textOverflow(name || '', isNotificationsDisabled ? 16 : 18) : <i>Удалённый аккаунт</i>}</b>
				<span style={{
					color: isSelected && hasSelection ? '#fff' : '#8E8E93',
					marginRight: 'auto'
				}}>{
						msgTextOverflow
							?
							msgTextOverflow
							:
							(!msgTextOverflow && lastMessage?.docs_url)
								?
								<i>Файл</i>
								:
								noLastMessageText
					}</span>
			</div>
			<div style={{
				position: 'absolute',
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
				top: '13px',
				right: '16px'
			}}>
				<div style={{
					display: 'flex',
					gap: '8px'
				}}>
					{
						isNotificationsDisabled
						&&
						<img
							title='Уведомления в этом чате отключены'
							src={isSelected ? notificationsOffIconWhite : notificationsOffIcon}
							alt=""
							width='16'
							height='16'
						/>
					}
					{
						readIcon !== null
						&& <img src={readIcon} alt='' style={{
							marginTop: lastMessage?.is_read ? '-1px' : '1px',
							width: lastMessage?.is_read ? '20px' : '14px',
							height: lastMessage?.is_read ? '20px' : '14px'
						}} />
					}
					<small style={{
						color: isSelected && hasSelection ? '#fff' : '#8E8E93'
					}}>{msgDate || ''}</small>
				</div>
				{
					unreadCount
						?
						<Badge
							contentStyle={{
								color: isSelected && hasSelection ? '#000' : '#fff'
							}}
							isDisabled={isNotificationsDisabled}
							className={styles['chat-list__item-badge']}
							content={`${unreadCount > 99 ? '99+' : unreadCount}`}
						/>
						: <></>
				}
				{rightComponent}
			</div>
		</div>
	)
}

export default ChatListItem
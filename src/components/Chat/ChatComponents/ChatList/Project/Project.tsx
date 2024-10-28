import { FC, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import arrowUp from '../../../../../assets/images/chat_images/caret-up-white.svg'
import arrowDown from '../../../../../assets/images/mainpage_images/caret-up-solid 1.png'
import pattern from '../../../../../assets/images/other/patterns 4.svg'
import { RootState } from '../../../../../store/store'
import { IProjectCard } from '../../../../OrdersAndProjectsPage/OrderProject/types/projectTypes'
import IconButton from '../../../../ui/IconButton/IconButton'
import ChatListItem from '../ChatListItem'
import CreateGroup from '../CreateGroup'

const Project: FC<IProjectCard> = ({
	project_id,
	name,
	preview_image
}) => {
	const [isGroupsOpen, setIsGroupsOpen] = useState<boolean>(false)
	const { chatList } = useSelector((state: RootState) => state.chat)

	const handleToggle = () => setIsGroupsOpen(!isGroupsOpen)

	const groupChats = useMemo(() =>
		chatList.filter(chat => chat.project_id === project_id),
		[chatList]
	)

	const totalUnreadCount = useMemo(
		() =>
			groupChats.map(chat => chat.unread_count)
				.reduce((x, y) => x + y, 0)
		,
		[groupChats]
	)

	return (
		<div>
			<ChatListItem
				onClick={handleToggle}
				selected={isGroupsOpen}
				isClickable={false}
				name={name}
				noLastMessageText='1 участник'
				unreadCount={totalUnreadCount}
				avatar={preview_image || pattern}
				style={{
					height: '76px',
					cursor: 'pointer'
				}}
				avatarStyle={{
					width: '71px',
					height: '71px',
					borderRadius: '8px',
					marginTop: '-5px',
					marginLeft: '-7px'
				}}
				rightComponent={
					<IconButton
						icon={isGroupsOpen ? arrowUp : arrowDown}
						imgStyle={{
							marginLeft: '-7px',
						}}
						style={{
							marginLeft: '7px',
							width: '20px',
							height: '20px',
							marginTop: totalUnreadCount ? '0px' : '8px'
						}}
					/>
				}
			/>
			{
				isGroupsOpen
				&&
				<div style={{
					marginLeft: '20px',
					marginTop: '2px',
					display: 'flex',
					flexDirection: 'column',
					gap: '4px'
				}}>
					{
						groupChats.map(group => (
							<ChatListItem
								key={group.chat_id}
								id={group.chat_id}
								lastMessage={group.last_message}
								name={group.group_name || ''}
								isNotificationsDisabled={group.is_notifications_disabled}
								unreadCount={group.unread_count}
								chatColor={group.chat_color}
							/>
						))
					}
					<CreateGroup
						projectId={project_id}
						style={{ width: '100%', marginTop: '4px' }}
					/>
				</div>
			}
		</div>
	)
}

export default Project

/*
<IconButton
						icon={isGroupsOpen ? arrowUp : arrowDown}
						imgStyle={{
							marginLeft: '-7px',
						}}
						style={{
							marginLeft: '7px',
							width: '20px',
							height: '20px',
							marginTop: '0px'
						}}
					/>
*/
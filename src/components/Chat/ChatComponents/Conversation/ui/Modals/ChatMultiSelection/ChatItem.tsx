import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ChatItem } from '../../../../../../../services/chat/common/types'
import { RootState } from '../../../../../../../store/store'
import { getChatApponentFromData } from '../../../../../utils/chat'
import { getPersonalChatTitle } from '../../../../../utils/utils'
import ChatListItem from '../../../../ChatList/ChatListItem'

interface IChatItemProps extends ChatItem {
	onChange: (chatId: number) => void
}

const ChatItemElement: FC<IChatItemProps> = ({
	onChange,
	chat_id,
	chat_color,
	is_online,
	last_message,
	unread_count,
	user_owner,
	user_member,
	group_name,
	project_id,
	chat_type
}) => {
	const { user } = useSelector((state: RootState) => state.auth)
	const { projects } = useSelector((state: RootState) => state.projects)

	const projectData = useMemo(() =>
		projects.find(project => project.project_id === project_id),
		[projects]
	)

	const chatName = useMemo(() =>
		chat_type === 'personal'
			?
			getPersonalChatTitle(user?.id, user_owner, user_member)
			:
			projectData ? `${projectData.name} > ${group_name}` : group_name,
		[])

	return (
		<>
			<ChatListItem
				style={{
					cursor: 'pointer'
				}}
				onClick={() => onChange(chat_id)}
				hasSelection={false}
				chatColor={chat_color}
				key={chat_id}
				id={chat_id}
				isOnline={is_online}
				isClickable={false}
				selected={false}
				lastMessage={last_message}
				unreadCount={unread_count}
				name={chatName || ''}
				avatar={getChatApponentFromData(user_owner, Number(user?.id), user_member)?.profile_photo}
			/>
		</>
	)
}

export default ChatItemElement
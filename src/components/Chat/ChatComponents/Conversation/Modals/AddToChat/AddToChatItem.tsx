import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ChatItem } from '../../../../../../services/chat/common/types'
import { RootState } from '../../../../../../store/store'
import { getProjectGroupName } from '../../../../utils/chat'
import ChatListItem from '../../../ChatList/ChatListItem'

interface IAddToChatItem extends ChatItem {
	handleSelect: (chatId: number) => void
}

const AddToChatItem: FC<IAddToChatItem> = ({
	chat_id,
	group_name,
	last_message,
	chat_color,
	project_id,
	handleSelect
}) => {
	const { projects } = useSelector((state: RootState) => state.projects)

	const projectData = useMemo(() => projects.find(project => project.project_id === project_id), [projects])

	const chatName = useMemo(() => projectData ? getProjectGroupName(projectData.name, group_name || '') : group_name, [projectData])

	return (
		<ChatListItem
			isClickable={false}
			key={chat_id}
			name={chatName || ''}
			lastMessage={last_message}
			id={chat_id}
			chatColor={chat_color}
			unreadCount={0}
			style={{ cursor: 'pointer' }}
			onClick={() => handleSelect(chat_id)}
		/>
	)
}

export default AddToChatItem
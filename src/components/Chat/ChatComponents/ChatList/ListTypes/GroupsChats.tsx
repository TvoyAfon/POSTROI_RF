import { useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../store/store"
import ChatListItem from "../ChatListItem"
import CreateGroup from "../CreateGroup"

const GroupsChats = () => {
    const { chatList } = useSelector((state: RootState) => state.chat)

    const groupsChats = useMemo(() =>
        chatList.filter(
            chat => chat.chat_type === 'group' && chat.status_link !== 'archive' && !chat.project_id
        ),
        [chatList]
    )

    return (
        <>
            {
                groupsChats.map(group => (
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
            <CreateGroup />
        </>
    )
}

export default GroupsChats
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../store/store"
import { getChatApponentFromData } from "../../../utils/chat"
import { getPersonalChatTitle } from "../../../utils/utils"
import ChatListItem from "../ChatListItem"
import NoContacts from "../ui/NoContacts"

const ArchiveChats = () => {
    const { chatList } = useSelector((state: RootState) => state.chat)
    const { user } = useSelector((state: RootState) => state.auth)

    const archiveChats = useMemo(() => chatList.filter(chat => chat.status_link === 'archive'), [chatList])

    return (
        <>
            {
                !archiveChats.length
                    ?
                    <NoContacts defaultText='У вас пока нет чатов в архиве.' />
                    :
                    archiveChats.map(chat => (
                        <ChatListItem
                            key={chat.chat_id}
                            id={chat.chat_id}
                            isOnline={chat.is_online}
                            isNotificationsDisabled={chat.is_notifications_disabled}
                            unreadCount={chat.unread_count}
                            chatColor={chat.chat_color || '#000'}
                            avatar={getChatApponentFromData(chat.user_owner, user?.id || 0, chat?.user_member)?.profile_photo}
                            name={
                                chat.chat_type === 'group'
                                    ? chat.group_name || ''
                                    : getPersonalChatTitle(user?.id, chat.user_owner, chat.user_member)
                            }
                            lastMessage={chat.last_message}
                        />
                    ))
            }
        </>
    )
}

export default ArchiveChats
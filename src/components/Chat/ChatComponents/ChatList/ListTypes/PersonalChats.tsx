import { useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../store/store"
import { getChatApponentFromData } from "../../../utils/chat"
import { getPersonalChatTitle } from "../../../utils/utils"
import ChatListItem from "../ChatListItem"
import NoContacts from "../ui/NoContacts"

const PersonalChats = () => {
    const {
        chatList,
        isChatsSearchFailed,
        selectedChatsFilter,
        chatsSearchBuffer
    } = useSelector((state: RootState) => state.chat);
    const { user } = useSelector((state: RootState) => state.auth);

    const personalChatsList = useMemo(() =>
        chatList.filter(chat => chat.chat_type === 'personal' && chat.status_link !== 'archive'),
        [chatList]
    );
    const chatsBuffer = chatsSearchBuffer.length ? chatsSearchBuffer : personalChatsList

    return (
        <>
            {
                !personalChatsList.length
                    ?
                    <NoContacts />
                    :
                    isChatsSearchFailed && selectedChatsFilter === 'allContacts'
                        ?
                        <NoContacts defaultText='Нет результатов по поиску' />
                        :
                        selectedChatsFilter === 'allContacts'
                            ?
                            chatsBuffer.map((chat) => (
                                <ChatListItem
                                    key={chat.chat_id}
                                    isNotificationsDisabled={chat.is_notifications_disabled}
                                    avatar={getChatApponentFromData(chat.user_owner, user?.id || 0, chat?.user_member)?.profile_photo}
                                    isOnline={chat?.is_online}
                                    id={chat.chat_id}
                                    lastMessage={chat.last_message}
                                    name={getPersonalChatTitle(Number(user?.id), chat?.user_owner, chat?.user_member) || chat?.group_name || ''}
                                    unreadCount={chat.unread_count}
                                />
                            ))
                            : <></>
            }
        </>
    )
}

export default PersonalChats
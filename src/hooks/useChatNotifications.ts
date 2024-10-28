import { useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

export const useChatNotifications = () => {
    const { chatList } = useSelector((state: RootState) => state.chat)

    const notifications = useMemo(() => {
        return {
            hasChatsNotification: Boolean(
                chatList.filter(chat => chat.unread_count && chat.chat_type === 'personal' && !chat.is_notifications_disabled && chat.status_link !== 'archive').length
            ),
            hasGroupNotification: Boolean(
                chatList.filter(chat => chat.unread_count && chat.chat_type === 'group' && !chat.is_notifications_disabled && chat.status_link !== 'archive').length
            ),
            hasArchiveNotification: Boolean(
                chatList.filter(chat => chat.status_link === 'archive' && chat.unread_count).length
            ),
            hasProjectNotification: Boolean(
                chatList.filter(chat => chat.project_id && chat.unread_count).length
            )
        }
    }, [chatList])

    return notifications
}
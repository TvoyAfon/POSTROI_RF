import { useSelector } from "react-redux"
import { useChatControllers } from '../../controllers/chat-controllers/useChatControllers'
import { RootState } from "../../store/store"

export const useNotificationsStatus = () => {
    const { lastUpdate } = useSelector((state: RootState) => state.chat)
    const { chatsListController } = useChatControllers()

    return () => {
        if (!lastUpdate || lastUpdate['@status'] !== 200) {
            return
        }

        const { chat_id, is_notifications_disabled } = lastUpdate
        chatsListController.notificationsStatus(chat_id, is_notifications_disabled)
    }
}
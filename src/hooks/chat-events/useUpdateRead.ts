import { useSelector } from "react-redux"
import { cacheController } from '../../controllers/chat-controllers/cache.controller'
import { useChatControllers } from '../../controllers/chat-controllers/useChatControllers'
import { RootState } from "../../store/store"

export const useUpdateRead = () => {
    const { lastUpdate, selectedChatId } = useSelector((state: RootState) => state.chat)
    const { chatsListController, messagesController } = useChatControllers()

    return () => {
        if (!lastUpdate) {
            return
        }
        const { message_id, is_read, read_time, chat_id } = lastUpdate

        if (selectedChatId === lastUpdate.chat_id) {
            messagesController.setMessageRead(
                message_id,
                read_time,
                is_read
            )
        }

        cacheController.setMessageRead(
            message_id,
            is_read,
            read_time
        )
        chatsListController.setChatLastMessageRead(
            chat_id,
            read_time,
            is_read
        )
    }
}
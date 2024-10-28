import { useSelector } from "react-redux"
import { useChatControllers } from '../../controllers/chat-controllers/useChatControllers'
import { RootState } from "../../store/store"

export const useChangeGroupColor = () => {
    const { lastUpdate } = useSelector((state: RootState) => state.chat)
    const { chatsListController } = useChatControllers()

    return () => {
        if (!lastUpdate) {
            return
        }

        const { chat_id, chat_color } = lastUpdate
        chatsListController.setChatColor(chat_id, chat_color)
    }
}
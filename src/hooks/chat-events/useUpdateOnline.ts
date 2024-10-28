import { useSelector } from "react-redux"
import { useChatControllers } from '../../controllers/chat-controllers/useChatControllers'
import { RootState } from "../../store/store"

export const useUpdateOnline = () => {
    const { lastUpdate } = useSelector((state: RootState) => state.chat)
    const { chatsListController } = useChatControllers()

    return () => {
        if (!lastUpdate) return
        const { user_id, is_online } = lastUpdate

        chatsListController.setUserOnline(user_id, is_online)
    }
}
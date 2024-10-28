import { useDispatch, useSelector } from "react-redux"
import { cacheController } from '../../controllers/chat-controllers/cache.controller'
import { useChatControllers } from '../../controllers/chat-controllers/useChatControllers'
import { setSelectedChatId } from "../../store/slices/ChatSlice/ChatSlice"
import { RootState } from "../../store/store"

export const useDeleteChat = () => {
    const { lastUpdate, selectedChatId } = useSelector((state: RootState) => state.chat)
    const { chatsListController } = useChatControllers()
    const dispatch = useDispatch()

    return () => {
        if (!lastUpdate || lastUpdate['@status'] !== 200) {
            return
        }
        const { chat_id } = lastUpdate

        if (selectedChatId === chat_id) {
            dispatch(setSelectedChatId(null))
        }

        cacheController.deleteChatMessages(chat_id)
        chatsListController.deleteChat(chat_id)
    }
}
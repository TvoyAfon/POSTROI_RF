import { useDispatch, useSelector } from "react-redux"
import { useChatControllers } from '../../controllers/chat-controllers/useChatControllers'
import { setSelectedChatId } from "../../store/slices/ChatSlice/ChatSlice"
import { RootState } from "../../store/store"

export const useUserLeave = () => {
    const { lastUpdate, selectedChatId } = useSelector((state: RootState) => state.chat)
    const { user } = useSelector((state: RootState) => state.auth)
    const { chatsListController } = useChatControllers()
    const dispatch = useDispatch()

    return () => {
        if (!lastUpdate || lastUpdate['@status'] !== 200) {
            return
        }

        const { chat_id, user_id } = lastUpdate
        const isMe = user_id === user?.id

        if (selectedChatId === chat_id && isMe) {
            dispatch(setSelectedChatId(null))
        }

        if (isMe) {
            return chatsListController.deleteChat(chat_id)
        }

        chatsListController.deleteGroupMember(chat_id, user_id)
    }
}
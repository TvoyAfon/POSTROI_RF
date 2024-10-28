import { useSelector } from "react-redux"
import { useChatControllers } from '../../controllers/chat-controllers/useChatControllers'
import { userService } from "../../services/user/user"
import { RootState } from "../../store/store"

export const useAddUser = () => {
    const { lastUpdate } = useSelector((state: RootState) => state.chat)
    const { chatsListController } = useChatControllers()

    return async () => {
        if (!lastUpdate) return

        const { chat_id, user_id } = lastUpdate
        const userInfo = await userService.getInfo(user_id)
        if (!userInfo) return

        chatsListController.addGroupMember(chat_id, user_id, userInfo)
    }
}
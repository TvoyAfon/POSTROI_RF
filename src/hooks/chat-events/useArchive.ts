import { useSelector } from "react-redux"
import { useChatControllers } from '../../controllers/chat-controllers/useChatControllers'
import { RootState } from "../../store/store"

export const useArchive = () => {
    const { lastUpdate } = useSelector((state: RootState) => state.chat)
    const { chatsListController } = useChatControllers()

    return () => {
        if (!lastUpdate || lastUpdate['@status'] !== 200) {
            return
        }

        const { chat_id, action } = lastUpdate

        const isExtract = action === 'extract'

        chatsListController.archive(chat_id, isExtract)
    }
}
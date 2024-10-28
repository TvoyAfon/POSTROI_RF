import { useSelector } from "react-redux"
import { cacheController } from '../../controllers/chat-controllers/cache.controller'
import { useChatControllers } from '../../controllers/chat-controllers/useChatControllers'
import { messageService } from '../../services/chat/message'
import { RootState } from "../../store/store"

export const useDeleteMessage = () => {
	const { lastUpdate, selectedChatId } = useSelector((state: RootState) => state.chat)
	const { chatsListController, messagesController } = useChatControllers()

	return async () => {
		if (!lastUpdate || lastUpdate['@status'] !== 200) {
			return
		}

		const { chat_id, message_id } = lastUpdate
		const isChatOpen = selectedChatId === chat_id

		if (isChatOpen) {
			messagesController.deleteMessage(message_id)
		}

		if (!isChatOpen && !cacheController.getChatMessages(chat_id).length) {
			const response = await messageService.getMessages({
				chat_id
			})
			if (response) {
				const messages = response.messages
				for (let i = 0; i < messages.length; i++) {
					cacheController.saveMessage(messages[i])
				}
			}
		} else {
			cacheController.deleteMessage(message_id)
		}

		chatsListController.setChatLastMessage(
			chat_id,
			cacheController.getLastMessage(chat_id),
			false
		)
	}
}
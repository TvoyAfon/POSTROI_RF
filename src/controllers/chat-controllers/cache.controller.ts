import { IMessage } from '../../components/Chat/ChatComponents/Conversation/Messages/types'

const STORE_NAME = 'messages'

class CacheController {
	getAllMessages(): IMessage[] {
		return JSON.parse(localStorage.getItem(STORE_NAME) || '[]')
	}

	getChatMessages(chatId: number) {
		return this.getAllMessages()
			.filter(msg => msg.chat_id === chatId)
	}

	saveMessage(message: IMessage) {
		if (this.getMessageById(message.message_id)) {
			this.deleteMessage(message.message_id)
		}

		const all = this.getAllMessages()

		localStorage.setItem(STORE_NAME, JSON.stringify([
			...all,
			message
		]))
	}

	private setMessages(messages: IMessage[]) {
		localStorage.setItem(STORE_NAME, JSON.stringify(messages))
	}

	getMessageById(messageId: number) {
		return this.getAllMessages()
			.find(msg => msg.message_id === messageId)
	}

	deleteMessage(messageId: number) {
		this.setMessages(
			this.getAllMessages()
				.filter(msg => msg.message_id !== messageId)
		)
	}

	deleteChatMessages(chatId: number) {
		this.setMessages(
			this.getAllMessages()
				.filter(msg => msg.chat_id !== chatId)
		)
	}

	setChatMessages(chatId: number, messagesList: IMessage[]) {
		const previosMessages = this.getChatMessages(chatId)
		const merged = [...messagesList, ...previosMessages]

		for (const message of previosMessages) {
			this.deleteMessage(message.message_id)
		}

		const allMessages = this.getAllMessages()
		this.setMessages([
			...allMessages,
			...merged
		])
	}

	setMessageRead(messageId: number, isRead: boolean, readTime: string) {
		this.setMessages(
			this.getAllMessages()
				.map(message => {
					if (message.message_id !== messageId) {
						return message
					}

					return {
						...message,
						is_read: isRead,
						read_time: readTime
					}
				})
		)
	}

	getLastMessage(chatId: number) {
		const messages = this.getChatMessages(chatId)
		return messages[messages.length - 1] || null
	}

	clearCache() {
		localStorage.removeItem(STORE_NAME)
	}
}

export const cacheController = new CacheController()
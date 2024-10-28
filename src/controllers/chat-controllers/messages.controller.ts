import { Dispatch } from '@reduxjs/toolkit'
import { addMessages } from '../../store/slices/ChatSlice/ChatSlice'
import { IChat } from '../../store/slices/ChatSlice/types'

class MessagesController {
	dispatch: Dispatch
	chatState: IChat

	constructor(dispatch: Dispatch, chatState: IChat) {
		this.dispatch = dispatch
		this.chatState = chatState
	}

	deleteMessage(messageId: number) {
		this.dispatch(addMessages(
			this.chatState.messages.filter(message => message.message_id !== messageId)
		))
	}

	setMessageRead(messageId: number, readTime: string, isRead: boolean) {
		this.dispatch(addMessages(
			this.chatState.messages.map((message) => {
				if (messageId !== message.message_id) {
					return message
				}

				return {
					...message,
					is_read: isRead,
					read_time: readTime
				}
			})
		))
	}
}

export default MessagesController
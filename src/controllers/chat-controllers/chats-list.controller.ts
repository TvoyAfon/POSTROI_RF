import { Dispatch } from '@reduxjs/toolkit'
import { IMessage } from '../../components/Chat/ChatComponents/Conversation/Messages/types'
import { ChatItem } from '../../services/chat/common/types'
import { IGetInfoUser } from '../../services/user/common/types'
import { addChatList, addChatsLoading } from '../../store/slices/ChatSlice/ChatSlice'
import { IChat } from '../../store/slices/ChatSlice/types'

class ChatsListController {
	dispatch: Dispatch
	chatState: IChat

	constructor(dispatch: Dispatch, chatState: IChat) {
		this.dispatch = dispatch
		this.chatState = chatState
	}

	setChatsList(list: ChatItem[]) {
		this.dispatch(addChatList(list))
	}

	setChatsListLoadingStatus(isLoading: boolean) {
		this.dispatch(addChatsLoading(isLoading))
	}

	readAll(chatId: number) {
		this.dispatch(addChatList(
			this.chatState.chatList.map(chat => {
				if (chat.chat_id !== chatId) {
					return chat
				}

				return {
					...chat,
					unread_count: 0
				}
			})
		))
	}

	archive(chatId: number, isExtract: boolean) {
		this.dispatch(addChatList(
			this.chatState.chatList.map(chat => {
				if (chat.chat_id !== chatId) {
					return chat
				}

				return {
					...chat,
					status_link: isExtract ? 'active' : 'archive'
				}
			})
		))
	}

	notificationsStatus(chatId: number, isDisabled: boolean) {
		this.dispatch(addChatList(
			this.chatState.chatList.map(chat => {
				if (chat.chat_id !== chatId) {
					return chat
				}

				return {
					...chat,
					is_notifications_disabled: isDisabled
				}
			})
		))
	}

	addGroupMember(chatId: number, userId: number, userInfo: IGetInfoUser) {
		this.dispatch(addChatList(
			this.chatState.chatList.map(chat => {
				if (chat.chat_id !== chatId) {
					return chat
				}

				return {
					...chat,
					members: [
						...(chat.members || []),
						{
							...userInfo,
							id: userId
						}
					]
				}
			})
		))
	}

	setChatColor(chatId: number, color: string) {
		this.dispatch(addChatList(
			this.chatState.chatList.map(chat => {
				if (chat.chat_id !== chatId) {
					return chat
				}

				return {
					...chat,
					chat_color: color
				}
			})
		))
	}

	deleteChat(chatId: number) {
		this.dispatch(addChatList(
			this.chatState.chatList.filter(chat => chat.chat_id !== chatId)
		))
	}

	deleteLastMessage(chatId: number, messageId: number) {
		this.dispatch(addChatList(
			this.chatState.chatList.map(chat => {
				if (chat.chat_id !== chatId || chat.last_message?.message_id !== messageId) {
					return chat
				}

				return {
					...chat,
					last_message: null
				}
			})
		))
	}

	setUserOnline(userId: number, isOnline: boolean) {
		this.dispatch(addChatList(
			this.chatState.chatList.map(chat => {
				if (chat.user_member?.id !== userId && chat.user_owner.id !== userId) {
					return chat
				}

				return {
					...chat,
					is_online: isOnline
				}
			})
		))
	}

	setChatLastMessage(chatId: number, lastMessage: IMessage | null, hasIncrement: boolean) {
		this.dispatch(addChatList(
			this.chatState.chatList.map(chat => {
				if (chat.chat_id !== chatId) {
					return chat
				}

				return {
					...chat,
					last_message: lastMessage,
					unread_count: hasIncrement ? chat.unread_count + 1 : chat.unread_count
				}
			})
		))
	}

	setChatLastMessageRead(chatId: number, readTime: string, isRead: boolean) {
		this.dispatch(addChatList(
			this.chatState.chatList.map(chat => {
				if (chat.chat_id !== chatId) {
					return chat
				}

				return {
					...chat,
					last_message: chat.last_message ? {
						...chat.last_message,
						read_time: readTime,
						is_read: isRead
					} : null
				}
			})
		))
	}

	deleteGroupMember(chatId: number, memberId: number) {
		this.dispatch(addChatList(
			this.chatState.chatList.map(chat => {
				if (chat.chat_id !== chatId) {
					return chat
				}

				return {
					...chat,
					members: chat.members?.filter(member => member.id !== memberId),
					chat_members: chat.chat_members.filter(memberId => memberId !== memberId)
				}
			})
		))
	}
}

export default ChatsListController
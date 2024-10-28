import { RefObject } from 'react'
import { UserCategoryFilter } from '../../../components/Chat/ChatComponents/ChatList/types'
import { IMessage } from '../../../components/Chat/ChatComponents/Conversation/Messages/types'
import { IUserWithoutPassword } from '../../../services/auth/common/types'
import { ChatItem } from '../../../services/chat/common/types'
import { WebSocketChatClient } from '../../../services/chat/websocket/chat-client'
import { IWebSocketEvent } from '../../../services/chat/websocket/types'

export interface IMessageRef {
	messageId: number
	ref: RefObject<HTMLDivElement>
}

export interface IPendingMessage {
	messageId: number
	hasError?: boolean
}

export type MessagesRefsMap = IMessageRef[]

export interface IChat {
	isOpen: boolean
	isFullScreen: boolean
	selectedChatsFilter: ChatsFilter
	selectedChatId: number | null
	selectedGroupId: number | null
	usersFilter: UserCategoryFilter
	groupSection: string
	chatClient: WebSocketChatClient | null
	lastUpdate: IWebSocketEvent | null
	chatList: ChatItem[]
	messages: IMessage[]
	lastActionBody: IWebSocketEvent | null
	isChatsLoading: boolean
	pendingMessages: IPendingMessage[]
	messagesSearchBuffer: IMessage[]
	chatsSearchBuffer: ChatItemData[]
	isChatsSearchFailed: boolean
	isMessagesSearchFailed: boolean
	isUserTyping: boolean
	replyId: number | null
	messagesRefsMap: MessagesRefsMap
}

export type ChatsFilter = 'allContacts' | 'groups' | 'projects'

export type ChatItemWithoutUsers = Omit<ChatItem, 'member_owner_id' | 'member_id'>

export interface ChatItemData extends Omit<ChatItemWithoutUsers, 'last_message_id'> {
	user_owner: IUserWithoutPassword
	user_member?: IUserWithoutPassword
}
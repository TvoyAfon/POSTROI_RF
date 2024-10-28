import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserCategoryFilter } from '../../../components/Chat/ChatComponents/ChatList/types'
import { IMessage } from '../../../components/Chat/ChatComponents/Conversation/Messages/types'
import { ChatItem } from '../../../services/chat/common/types'
import { WebSocketChatClient } from '../../../services/chat/websocket/chat-client'
import { IWebSocketEvent } from '../../../services/chat/websocket/types'
import { initialState } from './initial.state'
import { ChatItemData, ChatsFilter, IMessageRef, IPendingMessage } from './types'

const ChatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		openChat(state, action: PayloadAction<boolean>) {
			state.isOpen = action.payload
		},

		toggleFullScreen(state) {
			state.isFullScreen = !state.isFullScreen
		},

		switchChatsFilter(state, action: PayloadAction<ChatsFilter>) {
			state.selectedChatsFilter = action.payload
		},

		setSelectedChatId(state, action: PayloadAction<number | null>) {
			state.selectedChatId = action.payload
		},

		setSelectedGroupId(state, action: PayloadAction<number | null>) {
			state.selectedGroupId = action.payload
		},

		setUsersFilter(state, action: PayloadAction<UserCategoryFilter>) {
			state.usersFilter = action.payload
		},

		setGroupSection(state, action: PayloadAction<string>) {
			state.groupSection = action.payload
		},

		closeChat(state) {
			state.selectedChatId = null
			state.selectedGroupId = null
			state.groupSection = 'chat'
		},

		addChatClient(state, action: PayloadAction<WebSocketChatClient | null>) {
			state.chatClient = action.payload
		},

		addLastUpdate(state, action: PayloadAction<IWebSocketEvent | null>) {
			state.lastUpdate = action.payload
		},

		addChatList(state, action: PayloadAction<ChatItem[]>) {
			state.chatList = action.payload
		},

		addMessages(state, action: PayloadAction<IMessage[]>) {
			state.messages = action.payload
		},

		addLastActionBody(state, action: PayloadAction<IWebSocketEvent | null>) {
			state.lastActionBody = action.payload
		},

		addChatsLoading(state, action: PayloadAction<boolean>) {
			state.isChatsLoading = action.payload
		},

		addPendingMessages(state, action: PayloadAction<IPendingMessage[]>) {
			state.pendingMessages = action.payload
		},

		addMessagesSearchBuffer(state, action: PayloadAction<IMessage[]>) {
			state.messagesSearchBuffer = action.payload
		},

		addChatsSearchBuffer(state, action: PayloadAction<ChatItemData[]>) {
			state.chatsSearchBuffer = action.payload
		},

		addIsChatsSearchFailed(state, action: PayloadAction<boolean>) {
			state.isChatsSearchFailed = action.payload
		},

		addIsMessagesSearchFailed(state, action: PayloadAction<boolean>) {
			state.isMessagesSearchFailed = action.payload
		},

		addIsUserTyping(state, action: PayloadAction<boolean>) {
			state.isUserTyping = action.payload
		},

		addReplyId(state, action: PayloadAction<number | null>) {
			state.replyId = action.payload
		},

		addMessageRef(state, action: PayloadAction<IMessageRef>) {
			state.messagesRefsMap = [
				...state.messagesRefsMap,
				action.payload as any
			]
		},

		resetMessagesRefsMap(state) {
			state.messagesRefsMap = []
		}
	}
})

export const {
	openChat, toggleFullScreen,
	switchChatsFilter, setSelectedChatId, setUsersFilter,
	setSelectedGroupId, setGroupSection, closeChat,
	addChatClient, addLastUpdate, addChatList,
	addMessages, addLastActionBody, addChatsLoading,
	addPendingMessages, addMessagesSearchBuffer,
	addChatsSearchBuffer, addIsChatsSearchFailed,
	addIsMessagesSearchFailed, resetMessagesRefsMap,
	addIsUserTyping, addReplyId, addMessageRef
} = ChatSlice.actions
export default ChatSlice.reducer
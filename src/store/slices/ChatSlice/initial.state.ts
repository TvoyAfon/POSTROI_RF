import { IChat } from "./types"

export const initialState: IChat = {
    isOpen: false,
    isFullScreen: false,
    selectedChatsFilter: 'allContacts',
    selectedChatId: null,
    selectedGroupId: null,
    usersFilter: 'all',
    groupSection: 'chat',
    chatClient: null,
    lastUpdate: null,
    chatList: [],
    messages: [],
    lastActionBody: null,
    isChatsLoading: false,
    pendingMessages: [],
    messagesSearchBuffer: [],
    chatsSearchBuffer: [],
    isChatsSearchFailed: false,
    isMessagesSearchFailed: false,
    isUserTyping: false,
    replyId: null,
    messagesRefsMap: []
}
import { useDispatch, useSelector } from "react-redux"
import { IMessage } from '../../components/Chat/ChatComponents/Conversation/Messages/types'
import { playNotificationSound } from "../../components/Chat/utils/utils"
import { cacheController } from '../../controllers/chat-controllers/cache.controller'
import { useChatControllers } from '../../controllers/chat-controllers/useChatControllers'
import { messageService } from '../../services/chat/message'
import { addMessages, addPendingMessages } from "../../store/slices/ChatSlice/ChatSlice"
import { RootState } from "../../store/store"

export const useSendMessage = () => {
    const { lastUpdate, selectedChatId, messages, chatList, pendingMessages } = useSelector((state: RootState) => state.chat)
    const { user } = useSelector((state: RootState) => state.auth)
    const { chatsListController } = useChatControllers()
    const dispatch = useDispatch()

    return async () => {
        if (!lastUpdate || lastUpdate['@status'] !== 200) {
            return
        }

        const { chat_id, client_message_pending_id, message } = lastUpdate
        const isChatOpen = chat_id === selectedChatId

        if (isChatOpen) {
            const messagePendingId = client_message_pending_id

            const result =
                [...messages, message]
                    .filter(message => message.message_id !== messagePendingId)

            dispatch(addMessages(result))
            dispatch(addPendingMessages(pendingMessages.filter(msg => msg.messageId !== messagePendingId)))
        }

        let forCache: IMessage[] = [message]

        if (!isChatOpen && !cacheController.getChatMessages(chat_id).length) {
            const response = await messageService.getMessages({
                chat_id
            })
            if (response) {
                forCache = response.messages
            }
        }

        for (let i = 0; i < forCache.length; i++) {
            cacheController.saveMessage(forCache[i])
        }

        const isMessageSender = user?.id === message.sender_id
        const isNotificationsDisabled = chatList.find(chat => chat.chat_id === chat_id)?.is_notifications_disabled

        if (!isMessageSender && !isNotificationsDisabled) {
            playNotificationSound()
        }

        const hasIncrement = (!isMessageSender && !isChatOpen)

        chatsListController.setChatLastMessage(
            chat_id,
            message,
            hasIncrement
        )
    }
}
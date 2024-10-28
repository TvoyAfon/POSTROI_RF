import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useChatControllers } from '../../controllers/chat-controllers/useChatControllers'
import { useAddUser } from '../../hooks/chat-events/useAddUser'
import { useArchive } from '../../hooks/chat-events/useArchive'
import { useAuthentication } from '../../hooks/chat-events/useAuthentication'
import { useChangeGroupColor } from '../../hooks/chat-events/useChangeGroupColor'
import { useDeleteChat } from '../../hooks/chat-events/useDeleteChat'
import { useDeleteMessage } from '../../hooks/chat-events/useDeleteMessage'
import { useNewChat } from '../../hooks/chat-events/useNewChat'
import { useNotificationsStatus } from '../../hooks/chat-events/useNotificationsStatus'
import { useSendMessage } from '../../hooks/chat-events/useSendMessage'
import { useSetTypingStatus } from '../../hooks/chat-events/useSetTypingStatus'
import { useUpdateOnline } from '../../hooks/chat-events/useUpdateOnline'
import { useUpdateRead } from '../../hooks/chat-events/useUpdateRead'
import { useUserLeave } from '../../hooks/chat-events/useUserLeave'
import { useWebSocket } from '../../hooks/useWebSocket'
import { Events } from '../../shared/types'
import { RootState } from '../../store/store'
import BaseModal from '../ui/Modal/BaseModal'
import Chat from './Chat'
import { getChats } from './utils/chat'

const ChatContainer = () => {
	const { isFullScreen, isOpen, lastUpdate, chatList } = useSelector((state: RootState) => state.chat)
	const { isAuthed } = useSelector((state: RootState) => state.auth)
	const { chatsListController } = useChatControllers()
	const [page, setPage] = useState<number>(0)
	const [fetchInProgress, setIsFetchInProgress] = useState<boolean>(false)
	const connect = useWebSocket()

	const sendMessage = useSendMessage()
	const updateRead = useUpdateRead()
	const updateOnline = useUpdateOnline()
	const authentication = useAuthentication()
	const newChat = useNewChat()
	const deleteChat = useDeleteChat()
	const userLeave = useUserLeave()
	const addUser = useAddUser()
	const setTypingStatus = useSetTypingStatus()
	const changeGroupColor = useChangeGroupColor()
	const archive = useArchive()
	const deleteMessage = useDeleteMessage()
	const notificationsStatus = useNotificationsStatus()

	useEffect(() => {
		if (!isAuthed) return
		connect()
	}, [isAuthed])

	useEffect(() => {
		if (!lastUpdate) return

		const eventType = lastUpdate?.['@type']
		const event = {
			[Events.SEND_MESSAGE]: sendMessage,
			[Events.UPDATE_READ]: updateRead,
			[Events.UPDATE_ONLINE]: updateOnline,
			[Events.AUTHENTICATION]: authentication,
			[Events.NEW_CHAT]: newChat,
			[Events.DELETE_CHAT]: deleteChat,
			[Events.USER_LEAVE]: userLeave,
			[Events.ADD_USER]: addUser,
			[Events.SET_TYPING_STATUS]: setTypingStatus,
			[Events.CHANGE_GROUP_COLOR]: changeGroupColor,
			[Events.ARCHIVE]: archive,
			[Events.NOTIFICATIONS]: notificationsStatus,
			[Events.DELETE_MESSAGE]: deleteMessage
		}[eventType]

		event && event()
	}, [lastUpdate])

	useEffect(() => {
		if (!isAuthed || fetchInProgress) return;

		(async () => {
			if (!page) {
				chatsListController.setChatsListLoadingStatus(true)
			} else {
				setIsFetchInProgress(true)
			}

			const result = await getChats({
				limit: 100,
				page
			})

			chatsListController.setChatsListLoadingStatus(false)
			setIsFetchInProgress(false)
			if (!result) return

			chatsListController.setChatsList(
				!page
					? result
					: [...chatList, ...result]
			)
		})()
	}, [isAuthed, page])

	const handleChatListFullBottomScroll = () => {
		if (fetchInProgress) return
		setPage(prevPage => prevPage + 1)
	}

	return (
		<>
			{
				isFullScreen
					?
					<BaseModal isOpen={isOpen} style={{
						height: '100%',
						width: '100%',
						borderRadius: '0px'
					}}>
						<Chat
							onChatListFullBottomScroll={handleChatListFullBottomScroll}
						/>
					</BaseModal>
					: <Chat
						onChatListFullBottomScroll={handleChatListFullBottomScroll}
					/>
			}
		</>
	)
}

export default ChatContainer
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cacheController } from '../../../../../controllers/chat-controllers/cache.controller'
import { messageService } from '../../../../../services/chat/message'
import { addMessages, resetMessagesRefsMap } from '../../../../../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../../../../../store/store'
import Loader from '../../../../ui/Loader/Loader'
import { useBottomScroll } from '../../ChatList/hooks/useBottomScroll'
import { useTopScroll } from '../../ChatList/hooks/useTopScroll'
import NoContacts from '../../ChatList/ui/NoContacts'
import Message from './Message'
import { IMessage } from './types'

const Messages = () => {
	const {
		messages,
		messagesSearchBuffer,
		selectedChatId,
		isMessagesSearchFailed,
		isFullScreen,
		replyId,
	} = useSelector((state: RootState) => state.chat)
	const dispath = useDispatch()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const messagesRef = useRef<HTMLDivElement>(null)
	const isFullTopScroll = useTopScroll(messagesRef)
	const isFullBottomScroll = useBottomScroll(messagesRef)
	const [page, setPage] = useState<number>(0)
	const [isFetchInProgress, setIsFetchInProgress] = useState<boolean>(false)
	const [lastScrollMessageId, setLastScrollMessageId] = useState<number | null>(null)

	const handleScroll_Y_To = (yPos: number) => {
		if (!messagesRef?.current) return
		messagesRef.current.scroll({ top: yPos })
	}

	useEffect(() => {
		if (!selectedChatId || isFetchInProgress) {
			return
		}

		(async () => {
			try {
				let chatMessages: IMessage[] = []

				if (!page) {
					setIsLoading(true)
					chatMessages = cacheController.getChatMessages(selectedChatId)
				} else {
					setIsFetchInProgress(true)
				}

				if (!chatMessages.length) {
					const response = await messageService.getMessages({
						chat_id: selectedChatId,
						limit: 100,
						page
					})

					if (!response) {
						return
					}

					chatMessages = response.messages

					if (!page) {
						for (const message of chatMessages) {
							cacheController.saveMessage(message)
						}
					} else {
						cacheController.setChatMessages(selectedChatId, chatMessages)
						chatMessages = [...chatMessages, ...messages]
					}
				}

				dispath(addMessages(chatMessages))
			}
			catch (error) { }
			finally {
				setIsFetchInProgress(false)
				setIsLoading(false)
			}
		})()
	}, [selectedChatId, page])

	useEffect(() => {
		return () => {
			dispath(resetMessagesRefsMap())
		}
	}, [])

	useEffect(() => {
		if (!messagesRef?.current) {
			return
		}

		handleScroll_Y_To(messagesRef.current.scrollHeight)
		/*if (!page) {
			return handleScroll_Y_To(messagesRef.current.scrollHeight)
		}

		const msgRef = messagesRefsMap.find(_ref => _ref.messageId === lastScrollMessageId)

		if (!msgRef) return
		
		handleScroll_Y_To(getElementY(msgRef.ref, messagesRef) || 0)
		*/
	}, [messages, lastScrollMessageId, page])

	useEffect(() => {
		if (!isFullTopScroll || isFetchInProgress) return
		setPage(prevPage => prevPage + 1)

		if (!messagesRef.current) {
			return
		}

		setLastScrollMessageId(messages[0]?.message_id || null)
	}, [isFullTopScroll, messages])

	const handleBottomScroll = () => {
		if ((!isFullBottomScroll && page) || !messagesRef?.current) return
		handleScroll_Y_To(messagesRef.current.scrollHeight)
	}

	const messagesBuffer = messagesSearchBuffer.length ? messagesSearchBuffer : messages

	return (
		<div ref={messagesRef} style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '24px',
			overflowY: 'scroll',
			height: replyId ? isFullScreen ? '90%' : '80%' : '95%'
		}}>
			{
				isLoading
					?
					<Loader text='Загрузка сообщений...' style={{
						display: 'flex',
						justifyContent: 'center'
					}} />
					:
					!messages.length
						?
						<NoContacts
							spanStyle={{
								width: isFullScreen ? '100%' : '220px'
							}}
							defaultText='В этом чате пока нет сообщений'
						/>
						:
						isMessagesSearchFailed
							?
							<NoContacts defaultText='Нет результатов по поиску' />
							:
							messagesBuffer.map(message => (
								<Message
									key={message.message_id}
									handleBottomScroll={handleBottomScroll}
									{...message}
								/>
							))
			}
		</div>
	)
}

export default Messages
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import attachmentIcon from '../../../../assets/images/chat_images/attachment-01.png'
import sentIcon from '../../../../assets/images/chat_images/sent.svg'
import { FILES_FORMATS_ACCEPT, MAX_FILES_LENGTH } from '../../../../config/config'
import { Events } from '../../../../shared/types'
import { RootState } from '../../../../store/store'
import Button from '../../../ui/Button/Button'
import { getDestinationId } from '../../utils/utils'
import { useSendMessage } from '../ChatList/hooks/useSendMessage'
import styles from './Conversation.module.scss'
import EmojiButton from './ui/EmojiButton'
import EmojiPopup from './ui/EmojiPopup'
import SendFilePanel from './ui/Modals/SendFilePanel/SendFilePanel'
import ReplyPanel from './ui/ReplyPanel/ReplyPanel'

const ConversationFooter = () => {
	const {
		groupSection, selectedChatId,
		chatClient, chatList,
		replyId
	} = useSelector((state: RootState) => state.chat)
	const { user } = useSelector((state: RootState) => state.auth)
	const [messageText, setMessageText] = useState<string>('')
	const [files, setFiles] = useState<File[]>([])
	const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false)
	const [isTyping, setIsTyping] = useState<boolean>(false)
	const [typingTimeout, setTypingTimeout] = useState<number | null>(null)
	const filesInputRef = useRef<HTMLInputElement>(null)
	const send = useSendMessage()

	const chatData = useMemo(() => chatList.find(item => item.chat_id === selectedChatId), [selectedChatId])
	const destinationId = useMemo(() => getDestinationId(Number(user?.id), chatData?.user_owner, chatData?.user_member), [user, chatData])

	const handleSend = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!messageText.trim() || !user?.id || !selectedChatId) return

		await send({
			chat_id: selectedChatId,
			destination_id: destinationId || undefined,
			message_text: messageText,
		}, true, () => setMessageText(''))
	}

	const handleChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
		let files = Array.from(e.target.files || [])
		if (!files.length) return

		if (files.length > MAX_FILES_LENGTH) {
			const different = files.length - MAX_FILES_LENGTH
			files = files.slice(0, files.length - different) // обрезаем массив с файлами так, чтобы было максимум 10 обьектов
		}

		setFiles(files)
	}

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessageText(event.target.value)

		if (!isTyping) {
			setIsTyping(true)
		}

		if (typingTimeout) {
			clearTimeout(typingTimeout)
		}

		const timeout = setTimeout(() => {
			setIsTyping(false)
		}, 1000)

		setTypingTimeout(timeout)
	}

	useEffect(() => {
		return () => {
			if (typingTimeout) {
				clearTimeout(typingTimeout)
			}
		}
	}, [typingTimeout])

	useEffect(() => {
		if (!user) return

		chatClient?.send({
			'@type': Events.SET_TYPING_STATUS,
			'chat_id': selectedChatId,
			'is_typing': isTyping
		})
	}, [isTyping, user])

	const autoResizeTextArea = (e: FormEvent<HTMLTextAreaElement>) => {
		if (e.target instanceof HTMLElement) {
			const scrollHeight = e.target.scrollHeight
			if (scrollHeight > 70) {
				return
			}

			e.target.style.height = 'auto'
			e.target.style.height = `${scrollHeight}px`
		}
	}

	const handleTextareaKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.target instanceof HTMLElement) {
			if (e.keyCode === 13 && e.shiftKey) {
				return
			} else if (e.keyCode === 13) {
				e.preventDefault()
				handleSend(e as unknown as FormEvent<HTMLFormElement>)
			}
		}
	}

	return (
		<>
			{
				groupSection === 'chat'
				&&
				<div style={{
					position: 'relative'
				}}>
					{
						replyId
						&&
						<ReplyPanel />
					}
					<div>
						<div style={{

							display: 'flex',
							justifyContent: 'center',
							position: 'relative'
						}}>
							{
								isEmojiOpen && <EmojiPopup setMessageText={setMessageText} onClose={() => setIsEmojiOpen(false)} />
							}
						</div>
						<form onSubmit={handleSend} className={styles['conversation__footer']}>
							<Button
								onClick={() => filesInputRef.current?.click()} type='button'
								style={{
									width: '40px',
									height: '40px',
									marginTop: '7px'
								}}
								variant='pale'
								icon={attachmentIcon}
							>
							</Button>
							<SendFilePanel isOpen={Boolean(files.length)} files={files} setFiles={setFiles} onClose={() => setFiles([])} />
							<input accept={FILES_FORMATS_ACCEPT} ref={filesInputRef} type="file" onChange={handleChangeFiles} style={{ display: "none" }} multiple />
							<div style={{ width: '100%', position: 'relative' }}>
								<textarea
									placeholder='Чат'
									style={{
										width: '100%',
										minHeight: '30px',
										maxHeight: '150px',
										background: 'transparent',
										border: '1px solid #8E8E93',
										fontSize: '16px',
										resize: 'none',
										paddingRight: '40px',
										paddingTop: '8px',
										boxSizing: 'border-box',
										outline: 'none',
									}}
									value={messageText}
									onChange={handleChange}
									onKeyUp={handleTextareaKeyUp}
									rows={1}
									onInput={autoResizeTextArea}
								/>
								<EmojiButton setIsEmojiOpen={setIsEmojiOpen} isEmojiOpen={isEmojiOpen} style={{ position: 'absolute', right: '10px', top: '10px' }} />
							</div>
							<Button icon={sentIcon}
								style={{
									width: '40px',
									height: '40px',
									marginTop: '7px'
								}}></Button>
						</form>
					</div>
				</div>

			}
		</>
	)
}

export default ConversationFooter
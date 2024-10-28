import { Markup } from 'interweave'
import { FC, useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import pendingClockBlackIcon from '../../../../../assets/images/chat_images/pending-clock-blue.svg'
import sendMessageErrorIcon from '../../../../../assets/images/other/cancel-01.svg'
import { Events } from '../../../../../shared/types'
import { addMessageRef } from '../../../../../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../../../../../store/store'
import { getDate } from '../../../../../utils/date'
import NoAvatar from '../../../../Profile/ui/NoAvatar'
import { convertLinksToAnchors, getReadIcon } from '../../../utils/utils'
import styles from '../Conversation.module.scss'
import Actions from './Actions/Actions'
import Files from './Files/Files'
import { IMessage } from './types'
import MessageReply from './ui/MessageReply/MessageReply'

export interface IMessageProps extends IMessage {
	handleBottomScroll?: () => void
}

const Message: FC<IMessageProps> = ({
	chat_id,
	message_id,
	sender_id,
	message_text,
	docs_url,
	sent_time,
	is_read,
	reply_id,
	forward_message,
	handleBottomScroll
}) => {
	const {
		isFullScreen,
		chatClient,
		pendingMessages,
		messages,
		chatList
	} = useSelector((state: RootState) => state.chat)
	const dispatch = useDispatch()

	const divRef = useRef<HTMLDivElement>(null)
	const { user } = useSelector((state: RootState) => state.auth)

	const isMyMessage = useMemo(() => Number(user?.id) === Number(sender_id), [sender_id, user?.id])
	const date = useMemo(() => getDate(sent_time), [sent_time])

	const readIcon = useMemo(() => getReadIcon(is_read), [is_read])

	const chatData = useMemo(() => chatList.find(c => c.chat_id === chat_id), [chatList, chat_id])

	const senderGroupInfo = useMemo(() => chatData?.members?.find(m => m.id === sender_id), [chatData, sender_id])

	const parsedMessage = useMemo(() => convertLinksToAnchors(message_text), [message_text])

	const replyMessage = useMemo(() => {
		const found = messages.find(m => m.message_id === reply_id)
		const sender = chatData?.members?.find(m => m.id === found?.sender_id)

		if (!found) {
			return null
		}

		return {
			sender_user: sender,
			...found
		}

	}, [messages, reply_id, chatData])

	const pendingStatus = useMemo(() => {
		const filtered = pendingMessages.filter(msg => msg.messageId === message_id)
		const found = filtered.find(msg => msg.hasError)

		return found ? found : filtered[0]
	}, [message_id, pendingMessages])

	useEffect(() => {
		dispatch(addMessageRef({
			messageId: message_id,
			ref: { ...divRef }
		}))
		handleBottomScroll && handleBottomScroll()

		if (is_read || sender_id === user?.id) {
			return
		}

		chatClient?.send({
			'@type': Events.READ_MESSAGE,
			'message_id': message_id
		})
	}, [])

	return (
		<div ref={divRef} className={styles['conversation__message-item']}>
			<div style={{
				display: 'flex',
				gap: '30px',
				marginRight: !isMyMessage ? 'auto' : '',
				marginLeft: isMyMessage ? 'auto' : ''
			}}>
				{
					isMyMessage
					&&
					<Actions
						messageId={message_id}
						isMessageOwner={isMyMessage}
						style={{
							marginTop: '9px'
						}}
					/>
				}
				<div style={{
					display: 'flex',
					gap: '16px'
				}}>
					{
						senderGroupInfo && !isMyMessage
						&&
						<NoAvatar
							name={senderGroupInfo.first_name}
							photoURL={senderGroupInfo.profile_photo}
						/>
					}
					<div style={{
						display: 'flex',
						flexDirection: 'column'
					}}>
						{
							chatData?.chat_type === 'group' && !isMyMessage
							&& <span>{senderGroupInfo?.first_name || <i>Удалённый</i>}</span>
						}
						<small style={{
							color: '#8E8E93',
							marginTop: senderGroupInfo && !isMyMessage ? '5px' : '12px'
						}}>{date}</small>
					</div>
					{
						readIcon !== null && user?.id === sender_id
						&&
						<img
							src={readIcon}
							alt=""
							title={is_read ? "Сообщение прочитано" : "Сообщение не прочитано"}
							style={{
								marginTop: is_read ? '10px' : '12px',
								width: is_read ? ' 20px' : '14px',
								height: is_read ? '20px' : '14px'
							}}
						/>
					}
					{
						pendingStatus
						&&
						<img
							title={
								pendingStatus.hasError
									? "Не удалось отправить сообщение"
									: 'Сообщение в процессе отправки'
							}
							src={
								pendingStatus.hasError
									?
									sendMessageErrorIcon
									:
									pendingClockBlackIcon
							}
							style={{
								width: '16px',
								height: '16px',
								marginTop: '12px'
							}}
							alt=""
						/>
					}
					{
						isMyMessage
						&&
						<NoAvatar
							style={{
								width: '40px',
								height: '40px'
							}}
							name={user?.first_name || ''}
							photoURL={typeof user?.profile_photo !== 'string' ? undefined : user.profile_photo}
						/>
					}
				</div>
				{
					!isMyMessage
					&&
					<Actions
						messageId={message_id}
						isMessageOwner={isMyMessage}
						style={{
							marginTop: '9px'
						}}
					/>
				}
			</div>
			<div className={styles['conversation__message-item__content']} style={{
				maxWidth: !isFullScreen ? '256px' : '90%',
				borderRadius: !isMyMessage ? '0px 24px 24px 24px' : '24px 24px 0px 24px',
				marginRight: !isMyMessage ? 'auto' : '',
				marginLeft: isMyMessage ? 'auto' : ''
			}}>
				{
					replyMessage
					&&
					<MessageReply messageData={replyMessage} />
				}
				{
					forward_message
					&&
					<MessageReply isForward messageData={forward_message} />
				}
				<span style={{
					hyphens: 'auto'
				}}>
					<Markup content={parsedMessage} />
				</span>
				{
					docs_url
					&&
					<Files filesLinks={docs_url.split('|')} />
				}
			</div>
		</div>
	)
}

export default Message
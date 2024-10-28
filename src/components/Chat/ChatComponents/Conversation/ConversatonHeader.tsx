import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import closeIcon from '../../../../assets/images/auth_images/cancel-01.png'
import arrowExpandIcon from '../../../../assets/images/chat_images/arrow-expand.svg'
import notificationsOffIcon from '../../../../assets/images/chat_images/notification-off-01.svg'
import searchIcon from '../../../../assets/images/mainpage_images/magnifying-glass-solid.png'
import arrowLeft from '../../../../assets/images/profile/arrow-left.svg'
import { useChatControllers } from '../../../../controllers/chat-controllers/useChatControllers'
import { useChatNotifications } from '../../../../hooks/useChatNotifications'
import useDebounce from '../../../../hooks/useDebounce'
import { useModal } from '../../../../hooks/useModal'
import { AddToChatScheme } from '../../../../services/chat/common/types'
import { groupService } from '../../../../services/chat/group'
import { addIsMessagesSearchFailed, addMessagesSearchBuffer, closeChat, toggleFullScreen } from '../../../../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../../../../store/store'
import NoAvatar from '../../../Profile/ui/NoAvatar'
import Badge from '../../../ui/Badge/Badge'
import Button from '../../../ui/Button/Button'
import IconButton from '../../../ui/IconButton/IconButton'
import { getProjectGroupName } from '../../utils/chat'
import { getPersonalChatTitle, textOverflow } from '../../utils/utils'
import styles from './Conversation.module.scss'
import GroupTabs from './GroupTabs/GroupTabs'
import AddToChat from './Modals/AddToChat/AddToChat'
import Report from './Modals/Report/Report'
import GroupAvatar from './ui/GroupAvatar'
import OnlineStatus from './ui/OnlineStatus'
import PopupGeneral from './ui/PopupGeneral/PopupGeneral'
import SearchField from './ui/SearchField'
import Typing from './ui/typing/Typing'

const ConversatonHeader = () => {
	const dispatch = useDispatch()
	const {
		isFullScreen, selectedChatId,
		groupSection, chatList,
		messages, isUserTyping
	} = useSelector((state: RootState) => state.chat)
	const { chatsListController } = useChatControllers()
	const { user } = useSelector((state: RootState) => state.auth)
	const { projects } = useSelector((state: RootState) => state.projects)

	const reportModal = useModal()
	const addToChatModal = useModal()

	const chatData = useMemo(() => chatList.find(item => item.chat_id === selectedChatId), [selectedChatId, chatList])

	const projectData = useMemo(() => projects.find(project => project.project_id === chatData?.project_id), [chatData])

	const chatTitle = useMemo(() => getPersonalChatTitle(Number(user?.id), chatData?.user_owner, chatData?.user_member), [selectedChatId, user?.id])

	const chatName = useMemo(() => {
		console.log(chatTitle, chatData, projectData)
		return textOverflow(
			chatData?.chat_type === 'personal'
				?
				chatTitle || 'Удалённый аккаунт'
				:
				projectData
					?
					getProjectGroupName(projectData.name, chatData?.group_name || '')
					:
					chatData?.group_name || '',
			isFullScreen ? 30 : 13
		)
	}, [chatData, chatTitle, projectData])

	const notifications = useChatNotifications()

	const [searchQuery, setSearchQuery] = useState<string>('')
	const debounceValue = useDebounce(searchQuery, 200)

	const handleLeave = () => dispatch(closeChat())

	const onAddToChat = async (scheme: AddToChatScheme) => {
		try {
			await groupService.addToChat(scheme)
		} catch (error) { }
	}

	const hasNotifications = notifications.hasChatsNotification || notifications.hasGroupNotification

	useEffect(() => {
		if (!chatData) return

		chatsListController.readAll(chatData.chat_id)
	}, [])

	useEffect(() => {
		if (!debounceValue?.trim()) {
			dispatch(addIsMessagesSearchFailed(false))
			return void dispatch(addMessagesSearchBuffer([]))
		}

		const val = debounceValue.toLocaleLowerCase()

		const result = messages.filter(
			message => message.message_text.toLowerCase().includes(val)
		)

		if (!result.length) {
			dispatch(addIsMessagesSearchFailed(true))
		}

		dispatch(addMessagesSearchBuffer(result))
	}, [debounceValue])

	return (
		<div style={{
			display: 'flex', flexDirection: 'column',
			gap: '16px'
		}}>
			<AddToChat onSelect={onAddToChat} isOpen={addToChatModal.isOpen} onClose={addToChatModal.handleClose} />
			<Report isOpen={reportModal.isOpen} onClose={reportModal.handleClose} />
			<header className={styles['conversation__header']} style={{
				width: isFullScreen ? '100%' : '',
				justifyContent: isFullScreen ? 'space-between' : ''
			}}>
				{
					!isFullScreen
					&&
					<div style={{
						display: 'flex',
						position: 'relative',
						marginTop: '3px'
					}}>
						<IconButton icon={arrowLeft} onClick={handleLeave} style={{
							marginTop: '10px'
						}} />
						{
							hasNotifications
							&&
							<Badge
								title='Есть непрочитанные сообщения'
								content=''
								style={{
									position: 'absolute',
									left: '23px',
									top: '5px',
									width: '10px',
									height: '12px'
								}}
							/>
						}
					</div>

				}
				<div style={{
					display: 'flex',
					gap: '16px'
				}}>
					{
						chatData?.chat_type === 'group'
							?
							<GroupAvatar
								style={{
									marginTop: '-2px'
								}}
								color={chatData.chat_color || '#000'}
							/>
							:
							<OnlineStatus isOnline={Boolean(chatData?.is_online)} style={{
								bottom: '-20px'
							}}>
								<NoAvatar
									name={chatTitle}
									photoURL={chatData?.user_owner.id === user?.id ? chatData?.user_member?.profile_photo : chatData?.user_owner.profile_photo}
									style={!chatTitle ? { marginTop: '2px' } : {}}
								/>
							</OnlineStatus>
					}

					<div style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '4px',
						width: isFullScreen ? '' : '140px',
					}}>
						<div style={{
							display: 'flex',
							gap: '8px'
						}}>
							<b title={chatName} style={{
								width: '50px',
								whiteSpace: 'nowrap',
								fontWeight: 700
							}}>
								{chatName}
							</b>
							{
								chatData?.is_notifications_disabled && isFullScreen
								&&
								<img
									src={notificationsOffIcon}
									width='16'
									height='16'
									style={{
										marginLeft: 'auto',
										marginRight: '-30px',
										marginTop: '2px'
									}}
									alt=""
								/>
							}
						</div>

						{
							isUserTyping
								?
								<Typing />
								:
								<span style={{
									color: chatData?.is_online ? '#7099ED' : '#8E8E93',
									whiteSpace: 'nowrap'
								}}>
									{
										chatData?.chat_type === 'personal'
											?
											chatData.is_online ? 'В сети' : 'Был недавно'
											: `${chatData?.members?.length} участников`
									}
								</span>
						}
						{
							chatData?.chat_type === 'group'
							&&
							<div style={{ marginTop: '12px', marginLeft: !isFullScreen ? '-100px' : '0' }}>
								<GroupTabs />
							</div>
						}
					</div>
					{
						isFullScreen && chatData?.chat_type !== 'group'
						&&
						<div style={{
							display: 'flex',
							gap: '8px',
							marginLeft: '65px'
						}}>
							<Button onClick={addToChatModal.handleOpen} style={{
								fontSize: '14px'
							}}>Добавить в чат</Button>
							<Button onClick={reportModal.handleOpen} style={{
								fontSize: '14px'
							}} variant='pale'>Пожаловаться</Button>
						</div>
					}
				</div>
				<div style={{
					display: 'flex', gap: '16px',
					marginTop: '10px'
				}}>
					{
						!isFullScreen
						&& <IconButton icon={arrowExpandIcon} onClick={() => dispatch(toggleFullScreen())} />
					}
					{
						isFullScreen && <IconButton icon={searchIcon} />
					}
					<PopupGeneral />
					<IconButton onClick={handleLeave} icon={closeIcon} style={{
						marginLeft: '-10px'
					}} />
				</div>
			</header>
			{isFullScreen && <div style={{ border: '1px solid #8E8E93', marginTop: chatData?.chat_type === 'group' ? '32px' : '0' }}></div>}
			{
				!isFullScreen && (!['photos', 'members'].includes(groupSection))
				&&
				<SearchField
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					style={{
						width: '370px'
					}}
				/>
			}
		</div>
	)
}

export default ConversatonHeader
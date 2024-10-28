import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moreVertIcon from '../../../../../../assets/images/chat_images/more-vertical.svg'
import { usePopup } from '../../../../../../hooks/usePopup'
import { chatSettingsService } from '../../../../../../services/chat/chat-settings'
import { groupService } from '../../../../../../services/chat/group'
import { RootState } from '../../../../../../store/store'
import IconButton from '../../../../../ui/IconButton/IconButton'
import MenuItem from '../../../../../ui/PopupMenu/MenuItem'
import PopupMenu from '../../../../../ui/PopupMenu/PopupMenu'
import { getContact } from '../../../../utils/utils'
import ColorSelector from '../ColorSelector'
import { usePopupGeneralModals } from './usePopupGeneralModals'

const PopupGeneral = () => {
	const { isOpen, anchorEl, handleToggle, setAnchorEl, triggerClassName } = usePopup()
	const { selectedChatId, chatList } = useSelector((state: RootState) => state.chat)
	const {
		modals,
		addToChatModal,
		archiveModal,
		reportModal,
		exportHistoryModal,
		deleteContactModal
	} = usePopupGeneralModals()
	const { user } = useSelector((state: RootState) => state.auth)

	const chatData = useMemo(() => chatList.find(chat => chat.chat_id === selectedChatId), [selectedChatId, chatList])
	const contact = useMemo(() => chatData?.chat_type === 'personal' && user && getContact(chatData, user.id), [chatData, user])

	const isOwner = chatData?.member_owner_id === user?.id
	const nav = useNavigate()

	const handleClick = (callback: () => void) => {
		callback()
		setAnchorEl(null)
	}

	const handleToggleNotifications = async () => {
		if (!selectedChatId) {
			return
		}

		try {
			const status = !chatData?.is_notifications_disabled

			await chatSettingsService.changeNotificationsSettings(
				selectedChatId,
				status
			)
		} catch (error) { }
	}

	const items = useMemo(() => {
		const items = [
			{
				name: chatData?.is_notifications_disabled
					? "Включить уведомления"
					: "Отключить уведомления",
				onClick: () => handleClick(handleToggleNotifications)
			},
			{
				name: "Экспорт истории",
				onClick: () => handleClick(exportHistoryModal.handleOpen)
			},
			{
				name: "Пожаловаться",
				onClick: () => handleClick(reportModal.handleOpen)
			},

		]

		if (!chatData?.project_id) {
			items.push({
				name: chatData?.status_link === 'archive' ? "Вернуть из архива" : "В архив",
				onClick: () => handleClick(archiveModal.handleOpen)
			})
		}

		if (contact) {
			const contactActions = [
				{
					name: "Профиль",
					onClick: () => handleClick(() => nav(`/profile/${user?.id}`))
				},
				{
					name: "Добавить в чат",
					onClick: () => handleClick(addToChatModal.handleOpen)
				}
			]

			if (isOwner) {
				items.push({
					name: "Удалить контакт",
					onClick: () => handleClick(deleteContactModal.handleOpen)
				})
			}

			items.push(...contactActions)
		}

		if (chatData?.chat_type === 'group') {
			items.push({
				name: isOwner ? 'Удалить группу' : 'Покинуть группу',
				onClick: () => handleClick(deleteContactModal.handleOpen)
			})
		}

		return items
	}, [contact, chatData])

	const handleChangeColor = async (color: string) => {
		if (!selectedChatId) return

		try {
			await groupService.changeGroupColor(
				selectedChatId, color
			)
		} catch (error) {

		} finally {
			setAnchorEl(null)
		}
	}

	return (
		<div>
			{
				modals.map((modal, index) => (
					<modal.component
						key={index}
						isOpen={modal.state.isOpen}
						onClose={modal.state.handleClose} />
				))
			}
			<IconButton
				icon={moreVertIcon}
				onClick={handleToggle}
				className={triggerClassName}
				imgClassName={triggerClassName}
			/>
			<PopupMenu
				useOutsideClose={false}
				isOpen={isOpen}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				triggerClassName={triggerClassName}
				style={{
					width: '261px',
					borderRadius: '8px',
					padding: '16px',
					flexDirection: 'column',
					gap: '8px',
					display: 'flex'
				}}
				left={240}
			>
				{
					items.map((item, index) => (
						<MenuItem key={index} onClick={item.onClick}>
							{item.name}
						</MenuItem>
					))
				}
				{
					chatData?.chat_type === 'group' && chatData.member_owner_id === user?.id
					&&
					<ColorSelector
						selectedColor={chatData.chat_color || '#00000'}
						changeColor={handleChangeColor}
					/>
				}
			</PopupMenu>
		</div>
	)
}

export default PopupGeneral
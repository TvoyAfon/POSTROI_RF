import { FC, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { chatService } from '../../../../../../services/chat/chat'
import { RootState } from '../../../../../../store/store'
import NoAvatar from '../../../../../Profile/ui/NoAvatar'
import Button from '../../../../../ui/Button/Button'
import Loader from '../../../../../ui/Loader/Loader'
import BaseModal from '../../../../../ui/Modal/BaseModal'
import { getContact } from '../../../../utils/utils'
import { IModalProps } from '../../Modals/props'
import GroupAvatar from '../GroupAvatar'

const DeleteContact: FC<IModalProps> = ({ isOpen, onClose }) => {
	const { selectedChatId, chatList } = useSelector((state: RootState) => state.chat)
	const { user } = useSelector((state: RootState) => state.auth)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const chatData = useMemo(() => chatList.find(chat => chat.chat_id === selectedChatId), [chatList, selectedChatId])
	const contact = useMemo(() => chatData && user && getContact(chatData, user.id), [chatData, user])

	const isOwner = chatData?.member_owner_id === user?.id

	const handleDelete = async () => {
		if (!chatData) return

		try {
			setIsLoading(true)

			await chatService.deleteChat(chatData.chat_id)
			onClose && onClose()
		} catch (error) {
		}
		finally {
			setIsLoading(false)
		}
	}

	return (
		<BaseModal isOpen={isOpen}>
			<div style={{
				display: 'flex',
				flexDirection: 'column', gap: '32px',
				width: '436px',
				textAlign: 'center'
			}}>
				<div style={{
					display: 'flex',
					gap: '16px'
				}}>
					{
						chatData?.chat_type === 'group'
							?
							<GroupAvatar
								color={chatData.chat_color || '#000'}
							/>
							:
							<NoAvatar
								name={contact?.first_name || chatData?.group_name || ''}
								photoURL={contact?.profile_photo}
							/>
					}
					<span style={{
						fontSize: '16px',
						fontWeight: 800,
						marginTop: '11px'
					}}>{contact?.first_name || chatData?.group_name}</span>
				</div>
				<span style={{
					fontWeight: 600,
					fontSize: '20px',
					textTransform: 'uppercase'
				}}>{contact ? 'Удалить контакт?' : isOwner ? 'Удалить группу?' : 'Покинуть группу?'}</span>
				<div style={{
					display: 'flex',
					gap: '32px',
					justifyContent: 'center'
				}}>
					<Button onClick={onClose} variant='orange' style={{
						width: '170px',
						fontSize: '14px',
						fontWeight: 400
					}}>
						Отмена
					</Button>
					<Button onClick={handleDelete} style={{
						width: '170px',
						fontSize: '14px',
						fontWeight: 400
					}}>
						{
							isLoading
								?
								<Loader color='#fff' />
								:
								(contact || isOwner) ? 'Удалить' : 'Покинуть'
						}
					</Button>
				</div>
			</div>
		</BaseModal>
	)
}

export default DeleteContact
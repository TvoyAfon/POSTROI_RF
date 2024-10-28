import { FC, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import closeIcon from '../../../../../../assets/images/auth_images/cancel-01.png'
import moreVertIcon from '../../../../../../assets/images/chat_images/more-vertical.svg'
import useDebounce from '../../../../../../hooks/useDebounce'
import { AddToChatScheme, ChatItem } from '../../../../../../services/chat/common/types'
import { RootState } from '../../../../../../store/store'
import Field from '../../../../../ui/Field/Field'
import IconButton from '../../../../../ui/IconButton/IconButton'
import BaseModal from '../../../../../ui/Modal/BaseModal'
import { getContact } from '../../../../utils/utils'
import NoContacts from '../../../ChatList/ui/NoContacts'
import { IModalProps } from '../props'
import AddToChatItem from './AddToChatItem'

interface IAddToChat extends IModalProps {
	onSelect?: (scheme: AddToChatScheme) => void
}

const AddToChat: FC<IAddToChat> = ({ onSelect, isOpen, onClose }) => {
	const { selectedChatId, chatList } = useSelector((state: RootState) => state.chat)
	const { user } = useSelector((state: RootState) => state.auth)
	const [query, setQuery] = useState<string>('')
	const [chatSearchBuffer, setChatSearchBuffer] = useState<ChatItem[]>([])
	const [isNoResults, setIsNoResults] = useState<boolean>(false)
	const debounceValue = useDebounce(query, 200)

	const chatData = useMemo(() => chatList.find(c => c.chat_id === selectedChatId), [selectedChatId, chatList])
	const contact = useMemo(() => chatData && user && getContact(chatData, user?.id), [chatData, user])

	const filteredChats = useMemo(() =>
		chatList.filter(chat => contact && chat.chat_type === 'group' && !chat?.chat_members?.includes(contact.id)),
		[chatList, contact]
	)

	const handleSelect = (chatId: number) => {
		if (!contact) return

		onSelect && onSelect({
			chat_id: chatId,
			contact_ids: [contact.id]
		})

		onClose && onClose()
	}

	useEffect(() => {
		if (!debounceValue?.trim()) {
			setIsNoResults(false)
			return setChatSearchBuffer([])
		}

		const result = filteredChats.filter(chat => chat.group_name?.toLowerCase().includes(debounceValue.toLowerCase()))
		if (!result.length) {
			setIsNoResults(true)
		}

		setChatSearchBuffer(result)
	}, [debounceValue])

	const buffer = chatSearchBuffer.length ? chatSearchBuffer : filteredChats

	return (
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
			style={{
				flexDirection: 'column',
				gap: '8px',
				width: '400px'
			}}
		>
			<header style={{
				display: 'flex',
				justifyContent: 'space-between'
			}}>
				<span style={{
					fontWeight: 600,
					fontSize: '20px',
					color: '#262626'
				}}>Добавить в чат</span>
				<div style={{
					display: 'flex', gap: '16px',
					marginTop: '2px'
				}}>
					<IconButton icon={moreVertIcon} />
					<IconButton icon={closeIcon} onClick={onClose} />
				</div>
			</header>
			<Field
				value={query}
				onChange={e => setQuery(e.target.value)}
				style={{
					width: '336px'
				}}
			/>
			{
				!filteredChats.length
					?
					<NoContacts
						defaultText='У вас пока нет активных групп'
					/>
					:
					isNoResults
						?
						<NoContacts
							defaultText='Нет результатов по поиску'
						/>
						:
						buffer.map(chat => (
							<AddToChatItem
								key={chat.chat_id}
								{...chat}
								handleSelect={handleSelect}
							/>
						))
			}
		</BaseModal>
	)
}

export default AddToChat
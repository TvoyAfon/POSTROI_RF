import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import closeIcon from '../../../assets/images/auth_images/cancel-01.png'
import arrowExpandIcon from '../../../assets/images/chat_images/arrow-expand.svg'
import arrowShrink from '../../../assets/images/chat_images/arrow-shrink.svg'
import moreVerticalIcon from '../../../assets/images/chat_images/more-vertical.svg'
import useDebounce from '../../../hooks/useDebounce'
import { addChatsSearchBuffer, addIsChatsSearchFailed, openChat, switchChatsFilter, toggleFullScreen } from '../../../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../../../store/store'
import IconButton from '../../ui/IconButton/IconButton'
import styles from '../Chat.module.scss'
import { getPersonalChatTitle } from '../utils/utils'
import SearchField from './Conversation/ui/SearchField'

const Header = () => {
	const dispatch = useDispatch()
	const { isFullScreen, chatList, selectedChatsFilter } = useSelector((state: RootState) => state.chat)
	const [searchQuery, setSearchQuery] = useState<string>('')
	const { user } = useSelector((state: RootState) => state.auth)

	const debounceValue = useDebounce(searchQuery, 200)

	useEffect(() => {
		if (!debounceValue?.trim()) {
			dispatch(addIsChatsSearchFailed(false))
			return void dispatch(addChatsSearchBuffer([]))
		}

		if (selectedChatsFilter !== 'allContacts') {
			dispatch(switchChatsFilter('allContacts'))
		}

		const val = debounceValue.toLowerCase()

		const result = chatList.filter(item => {
			const title = getPersonalChatTitle(user?.id, item.user_owner, item.user_member)

			return (
				title.toLowerCase().includes(val) ||
				item.group_name?.toLowerCase().includes(val)
			)
		})

		if (!result.length) {
			dispatch(addIsChatsSearchFailed(true))
		}

		dispatch(addChatsSearchBuffer(result as any))
	}, [debounceValue])

	return (
		<header className={styles['chat__header']}>
			<span style={{
				fontWeight: 600,
				fontSize: '20px',
				textTransform: 'uppercase',
				marginTop: '8px'
			}}>чат</span>
			{
				!isFullScreen
				&&
				<IconButton onClick={() => dispatch(toggleFullScreen())} icon={arrowExpandIcon} style={{
					marginTop: '-7px'
				}} />
			}
			<SearchField
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
				style={{
					width: '184px',
					fontSize: '15px'
				}}
			/>
			{
				isFullScreen && <IconButton icon={arrowShrink} onClick={() => dispatch(toggleFullScreen())} style={{
					marginTop: '-7px'
				}} />
			}
			<IconButton icon={moreVerticalIcon} style={{
				marginTop: '-6px',
			}} />
			{
				!isFullScreen
				&&
				<IconButton onClick={() => dispatch(openChat(false))} icon={closeIcon} style={{
					marginRight: '10px',
					marginTop: '-6px'
				}} />
			}
		</header>
	)
}

export default Header
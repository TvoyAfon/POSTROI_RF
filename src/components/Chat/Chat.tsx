import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import styles from './Chat.module.scss'
import ChatList from './ChatComponents/ChatList/ChatList'
import Conversation from './ChatComponents/Conversation/Conversation'
import Filters from './ChatComponents/Filters/Filters.tsx'
import Header from './ChatComponents/Header'

interface IChatProps {
	onChatListFullBottomScroll?: () => void
}

const Chat: FC<IChatProps> = ({ onChatListFullBottomScroll }) => {
	const { isOpen, isFullScreen, selectedChatId, selectedGroupId } = useSelector((state: RootState) => state.chat)

	return (
		<div className={`${styles.chat} ${isOpen ? styles['chat__open'] : styles['chat__close']} ${isFullScreen ? styles['chat__full-screen'] : ''}`} style={{
			height: isFullScreen ? '100%' : '560px',
			width: isFullScreen ? '100%' : '420px'
		}}>
			{
				!isFullScreen && (selectedChatId || selectedGroupId)
					? <Conversation />
					: <div style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '8px',
						width: isFullScreen ? '360px' : '349px',
						borderRight: isFullScreen ? '1px solid #8E8E93' : ''
					}}>
						<Header />
						<Filters />
						<ChatList onFullBottomScroll={onChatListFullBottomScroll} />
					</div>
			}
			{
				isFullScreen && (selectedChatId || selectedGroupId)
				&& <Conversation />
			}
		</div>
	)
}

export default Chat
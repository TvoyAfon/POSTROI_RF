import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetMessagesRefsMap } from '../../../../store/slices/ChatSlice/ChatSlice.ts'
import { RootState } from '../../../../store/store'
import styles from './Conversation.module.scss'
import ConversationFooter from './ConversationFooter'
import ConversatonHeader from './ConversatonHeader'
import Files from './GroupTabs/Sections/Files/Files'
import Members from './GroupTabs/Sections/Members/Members.tsx'
import Photos from './GroupTabs/Sections/Photos/Photos'
import Messages from './Messages/Messages'

const Conversation = () => {
	const { isFullScreen, groupSection } = useSelector((state: RootState) => state.chat)
	const dispatch = useDispatch()

	const tabComponent = useMemo(() => {
		return {
			chat: <Messages />,
			members: <Members />,
			photos: <Photos />,
			files: <Files />
		}[groupSection]
	}, [groupSection])

	useEffect(() => {
		return () => {
			dispatch(resetMessagesRefsMap())
		}
	}, [])

	return (
		<div className={styles.conversation} style={{
			paddingLeft: isFullScreen ? '32px' : '0'
		}}>
			<ConversatonHeader />
			<div style={{
				height: !isFullScreen && groupSection === 'chat' ? '65%' : '85%',
				marginTop: isFullScreen ? '24px' : '20px'
			}}>
				{tabComponent}
			</div>
			<ConversationFooter />
		</div>
	)
}

export default Conversation
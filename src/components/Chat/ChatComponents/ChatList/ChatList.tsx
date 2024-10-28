import { FC, useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import Loader from '../../../ui/Loader/Loader'
import { FiltersTypes } from '../Filters/filters.enum'
import styles from './ChatList.module.scss'
import ArchiveChats from './ListTypes/ArchiveChats'
import GroupsChats from './ListTypes/GroupsChats'
import PersonalChats from './ListTypes/PersonalChats'
import ProjectsChats from './ListTypes/ProjectsChats'
import { useBottomScroll } from './hooks/useBottomScroll'

interface IChatListProps {
	onFullBottomScroll?: () => void
}

const ChatList: FC<IChatListProps> = ({ onFullBottomScroll }) => {
	const {
		selectedChatsFilter,
		isChatsLoading
	} = useSelector((state: RootState) => state.chat)
	const listRef = useRef<HTMLDivElement>(null)
	const isFullScroll = useBottomScroll(listRef)

	const listComponent = useMemo(() => {
		return {
			[FiltersTypes.ALL_CONTACTS]: <PersonalChats />,
			[FiltersTypes.GROUPS]: <GroupsChats />,
			[FiltersTypes.PROJECTS]: <ProjectsChats />,
			[FiltersTypes.ARCHIVES]: <ArchiveChats />
		}[selectedChatsFilter]
	}, [selectedChatsFilter])

	useEffect(() => {
		if (!isFullScroll || !onFullBottomScroll) return
		onFullBottomScroll()
	}, [isFullScroll])

	return (
		<div className={styles['chat-list']} ref={listRef}>
			{
				isChatsLoading
					?
					<Loader
						style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}
						text='Загрузка чатов...'
					/>
					: listComponent
			}
		</div>
	)
}

export default ChatList
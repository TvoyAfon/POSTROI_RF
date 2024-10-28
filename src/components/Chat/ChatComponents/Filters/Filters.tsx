import { useDispatch, useSelector } from 'react-redux'
import { useChatNotifications } from '../../../../hooks/useChatNotifications'
import { switchChatsFilter } from '../../../../store/slices/ChatSlice/ChatSlice'
import { ChatsFilter } from '../../../../store/slices/ChatSlice/types'
import { RootState } from '../../../../store/store'
import Tab from '../../../Profile/ui/Tabs/Tab'
import Tabs from '../../../Profile/ui/Tabs/Tabs'
import Badge from '../../../ui/Badge/Badge'
import styles from '../../Chat.module.scss'
import { userCategories } from '../ChatList/types'
import { filters } from './filters'

const Filters = () => {
	const dispatch = useDispatch()
	const { selectedChatsFilter, usersFilter, isFullScreen } = useSelector((state: RootState) => state.chat)
	const notifications = useChatNotifications()

	return (
		<div className={styles['chat__filters']} style={{
			marginRight: isFullScreen ? '10px' : '0px'
		}}>
			<Tabs style={{
				gap: '16px'
			}}>
				{
					filters.map(filter => (
						<Tab
							isSelected={selectedChatsFilter === filter.key}
							variant='underlined'
							key={filter.key}
							onClick={() => dispatch(switchChatsFilter(filter.key as ChatsFilter))}
						>
							<div style={{
								display: 'flex',
								gap: '8px',
								whiteSpace: 'nowrap'
							}}>
								<span>{filter.key === 'allContacts' ? userCategories[usersFilter].full : filter.name}</span>
								{filter.rightComponent && <filter.rightComponent />}
								{
									{ ...notifications }[filter.notificationKey]
									&&
									<Badge
										title='Есть непрочитанные сообщения'
										content=''
										style={{
											marginTop: '-4px',
											marginLeft: '-5px',
											width: '10px',
											height: '12px'
										}}
									/>
								}
							</div>
						</Tab>
					))
				}
			</Tabs>
		</div>
	)
}

export default Filters
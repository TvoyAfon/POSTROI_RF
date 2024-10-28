import { useDispatch, useSelector } from 'react-redux'
import { setGroupSection } from '../../../../../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../../../../../store/store'
import Tab from '../../../../Profile/ui/Tabs/Tab'
import Tabs from '../../../../Profile/ui/Tabs/Tabs'
import { data } from './data'
import { useEffect } from 'react'

const GroupTabs = () => {
	const { groupSection } = useSelector((state: RootState) => state.chat)
	const dispatch = useDispatch()

	useEffect(() => {
		return () => {
			dispatch(setGroupSection('chat'))
		}
	}, []);

	return (
		<Tabs style={{
			gap: '16px'
		}}>
			{
				data.map(item => (
					<Tab onClick={() => dispatch(setGroupSection(item.key))} key={item.key} isSelected={groupSection === item.key} variant='underlined'>
						{item.name}
					</Tab>
				))
			}
		</Tabs>
	)
}

export default GroupTabs
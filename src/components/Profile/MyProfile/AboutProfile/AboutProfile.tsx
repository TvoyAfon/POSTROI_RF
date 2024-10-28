import { FC, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTab } from '../../../../store/slices/other/currentTabInProfile'
import { RootState } from '../../../../store/store'
import Tab from '../../ui/Tabs/Tab'
import Tabs from '../../ui/Tabs/Tabs'
import profileStyles from '../MyProfile.module.scss'
import styles from './AboutProfile.module.scss'
import { tabs } from './tabs'

const AboutProfile: FC = () => {
	const [isFirstTab, setIsFirstTab] = useState<boolean>(true)
	const dispatch = useDispatch()
	const { currentTab } = useSelector((state: RootState) => state.currentTabInProfile)


	const tab = useMemo(() => {
		setIsFirstTab(currentTab === 'about')
		return tabs.find(tab => tab.key === currentTab)
	}, [currentTab])

	return (
		<div className={styles.about}>
			<Tabs>
				{
					tabs.map(tab => (
						<Tab onClick={() => dispatch(setCurrentTab(tab.key))} isSelected={currentTab === tab.key} key={tab.key}>
							<span style={{ fontSize: 20, fontWeight: 600 }} className={styles.tab_name}   >{tab.name}</span>
							{tab.rightComponent && <tab.rightComponent currentTab={currentTab} />}
						</Tab>
					))
				}
			</Tabs>
			<div className={profileStyles.profile} style={{
				borderRadius: isFirstTab ? '0px 32px 32px 32px' : '32px',
				flexDirection: 'column',
				gap: '32px',
				marginBottom: '30px'
			}}>
				{tab && <tab.component />}
			</div>
		</div>
	)
}

export default AboutProfile
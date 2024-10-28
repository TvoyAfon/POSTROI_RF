import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { getBlockByHash } from '../../utils/utils'
import EmailNotifications from './Categories/EmailNotifications'
import MessengerNotifications from './Categories/MessengerNotifications'
import ProfileDelete from './Categories/ProfileDelete'
import ProfileProtection from './Categories/ProfileProtection'
import PushNotifications from './Categories/PushNotifications'
import styles from './Settings.module.scss'
import SettingsHeader from './SettingsHeader'
import SettingsNavigation from './SettingsNavigation/SettingsNavigation'

const Settings = () => {
	const profileProtection = useRef<HTMLDivElement>(null)
	const emailNotifications = useRef<HTMLDivElement>(null)
	const messengerNotifications = useRef<HTMLDivElement>(null)
	const pushNotifications = useRef<HTMLDivElement>(null)
	const refs = { 'profile-protection': profileProtection, 'email-notifications': emailNotifications, 'messenger-notifications': messengerNotifications, 'push-notifications': pushNotifications }
	const location = useLocation()
	const scrollableContainer = useRef<HTMLDivElement>(null)

	const blocks = [
		{
			element: <ProfileProtection />,
			ref: profileProtection
		},
		{
			element: <EmailNotifications />,
			ref: emailNotifications
		},
		{
			element: <MessengerNotifications />,
			ref: messengerNotifications
		},
		{
			element: <PushNotifications />,
			ref: pushNotifications
		},
		{
			element: <ProfileDelete />,
			ref: null
		}
	]

	useEffect(() => {
		const block = getBlockByHash(location.hash, refs)
    
		if (!block || !block.current) return

		scrollableContainer.current?.scroll({
			behavior: 'smooth',
			top: block.current.offsetTop - 250
		})
	}, [location])

	return (
		<div className={styles.settings}>
			<div className={styles['settings__container']}>
				<SettingsNavigation />
				<div className={styles['settings__settings']}>
					<SettingsHeader />
					<div ref={scrollableContainer} style={{
						overflowY: 'scroll',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: '32px',
					}}>
						{
							blocks.map((block,index) => (
								<div key={index} style={{fontWeight:600}} ref={block.ref}>
									{block.element}
								</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings
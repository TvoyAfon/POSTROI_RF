import Button from '../../../ui/Button/Button'
import styles from '../UserProfile.module.scss'
import { navs } from './navs'

const ProfileNavigation = () => {

	const handleScroll = () => {
		window.scrollTo({
			behavior: 'smooth',
			top: 100
		})
	}

	return (
		<div className={styles['profile_navigation']} style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '8px',
			width: '282px',
			position: 'fixed',
		}}>
			{
				navs.map(nav => (
					<Button variant='white' onClick={handleScroll} key={nav.url} style={{
						fontSize: '14px',
					}}>
						{nav.name}
					</Button>
				))
			}
		</div>
	)
}

export default ProfileNavigation
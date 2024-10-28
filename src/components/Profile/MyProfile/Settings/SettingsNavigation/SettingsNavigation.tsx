import { useNavigate } from 'react-router-dom'
import Button from '../../../../ui/Button/Button'
import styles from '../Settings.module.scss'
import { navs } from './navs'

const SettingsNavigation = () => {
	const navigate = useNavigate()

	return (
		<div className={styles['settings__navigation']}>
			{
				navs.map(nav => (
					<Button onClick={() => navigate(nav.url)} variant='white' style={{
						fontSize: '14px'
					}}>
						{nav.name}
					</Button>
				))
			}
		</div>
	)
}

export default SettingsNavigation
import { useNavigate } from 'react-router-dom'
import arrowLeftIcon from '../../../../assets/images/profile/arrow-left.svg'
import IconButton from '../../../ui/IconButton/IconButton'
import styles from './Settings.module.scss'

const SettingsHeader = () => {
	const nav = useNavigate()

	return (
		<header className={styles['settings__header']}>
			<IconButton onClick={() => nav('/me')} icon={arrowLeftIcon} />
			<span style={{
				fontSize: '20px',
				fontWeight: 600,
				textTransform: 'uppercase'
			}}>Настройки</span>
		</header>
	)
}

export default SettingsHeader
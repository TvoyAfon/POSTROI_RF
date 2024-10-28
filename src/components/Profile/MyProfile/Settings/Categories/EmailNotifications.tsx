import ToggleButton from '../../../../ui/ToggleButton/ToggleButton'
import SettingsCategory from '../SettingsCategory'
import SettingsSubCategory from '../SettingsSubCategory'

const EmailNotifications = () => {
	return (
		<SettingsCategory categoryName='Настройки Email уведомлений'>
			<SettingsSubCategory name='Сообщение' linkName={
				<div style={{
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<span>Уведомление о новых сообщениях в мессенджере</span>
					<ToggleButton />
				</div>
			} />
			<SettingsSubCategory name='Отзывы' linkName={
				<div style={{
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<span>Новые отзывы о вас, предложения оценить других пользователей и решения об обжалованиях</span>
					<ToggleButton />
				</div>
			} />
		</SettingsCategory>
	)
}

export default EmailNotifications
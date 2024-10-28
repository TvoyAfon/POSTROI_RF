import ToggleButton from '../../../../ui/ToggleButton/ToggleButton'
import SettingsCategory from '../SettingsCategory'
import SettingsSubCategory from '../SettingsSubCategory'

const MessengerNotifications = () => {
	return (
		<SettingsCategory categoryName='Уведомления в мессенджере'>
			<SettingsSubCategory name='Отзывы' linkName={
				<div style={{
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<span>Новые отзывы о вас, предложения оценить других пользователей и решения об обжалованиях</span>
					<ToggleButton />
				</div>
			} />
			<SettingsSubCategory name='Заказы' linkName={
				<div style={{
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<span>Вопросы о том, договорились ли вы с исполнителем</span>
					<ToggleButton />
				</div>
			} />
			<SettingsSubCategory name='Отклики' linkName={
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					color: '#262626'
				}}>
					<span>Отклики на ваши заказы</span>
					<ToggleButton />
				</div>
			} />
		</SettingsCategory>
	)
}

export default MessengerNotifications
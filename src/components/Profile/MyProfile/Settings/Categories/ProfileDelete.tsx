import Button from '../../../../ui/Button/Button'
import SettingsSubCategory from '../SettingsSubCategory'

const ProfileDelete = () => {
	return (
		<SettingsSubCategory name='Удаление профиля' linkName={
			<div style={{
				display: 'flex',
				justifyContent: 'space-between'
			}}>
				<span style={{
					width: '80%'
				}}>Восстановить профиль будет возможно в течении 30 дней, после чего он будет удалён окончательно. Все ваши активные объявления, статусы и рейтинг в этом профиле будут потеряны</span>
				<Button variant='pale'>Удалить</Button>
			</div>
		} />
	)
}

export default ProfileDelete
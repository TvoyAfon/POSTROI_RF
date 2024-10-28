import Button from '../../../../ui/Button/Button'
import Field from '../../../../ui/Field/Field'
import ToggleButton from '../../../../ui/ToggleButton/ToggleButton'
import SettingsCategory from '../SettingsCategory'
import SettingsSubCategory from '../SettingsSubCategory'

const ProfileProtection = () => {
	return (
		<SettingsCategory categoryName='Защита профиля'>
			<SettingsSubCategory name='Вход' linkName='Безопасный вход'>
				<div style={{
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<span style={{
						fontSize: '14px',
						color: '#262626',
						width: '550px',
						fontWeight:600
					}}>Присылать смс или пуш-уведомление с кодом доступа.Проверка понадобится только при входе с нового устройства. После подключения вы выйдете из профиля на всех устройствах, кроме этого.</span>
					<ToggleButton />
				</div>
			</SettingsSubCategory>
			<SettingsSubCategory name='Устройства' linkStyle={{
				width: '550px',
		
			}} linkName='Посмотрите, где вы сейчас авторизованы. Если одно из устройств выглядит подозрительно,нажмите ••• → «Это не я, сменить пароль».'>
				<div style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontSize: '14px',
					color: '#262626',
				}}>
					<span>Ростов-на-Дону, 16 мая в 17:36 Windows, браузер Yandex Browser, вход по номеру телефона</span>
					<span>Это устройство</span>
				</div>
			</SettingsSubCategory>
			<SettingsSubCategory name='Смена пароля' linkStyle={{
				width: '550px'
			}} linkName='После смены пароля нужно заново войти в профиль на всех устройствах'>
				<form style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '32px',
					marginTop: '32px'
				}}>
					<Field placeholder='Текущий' />
					<Field placeholder='Новый' />
					<Field placeholder='Подтвердить пароль' />
					<Button variant='pale' style={{
						marginRight: 'auto'
					}}>Сохранить</Button>
				</form>
			</SettingsSubCategory>
		</SettingsCategory>
	)
}

export default ProfileProtection
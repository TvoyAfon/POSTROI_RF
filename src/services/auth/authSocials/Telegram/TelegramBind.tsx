
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import telegramLogo_img from '../../../../assets/images/other/TG LOGO.svg'
import UncorrectFormat from '../../../../components/ui/Modal/UncorrectFormat'
import { TELEGRAM_BOT_AUTH } from '../../../../config/config'
import { useModal } from '../../../../hooks/useModal'
import { ROUTES_PATH } from '../../../../routes/routes'
import { RootState } from '../../../../store/store'
import { bindSocialsService } from '../../bindSocials.service'
import { ITelegramUser } from '../typesSoicals'

const TelegramBind: React.FC = () => {

	const { user } = useSelector((state: RootState) => state.auth)
	const nav = useNavigate()
	const { handleClose, handleOpen, isOpen } = useModal()
	const [error, setError] = useState('')

	useEffect(() => {
		const telegramButton = document.getElementById('telegram-button')
		if (telegramButton) {
			telegramButton.style.width = '25px'
		}

		// Функция для обработки авторизации
		const onTelegramAuth = async (userTelegram: ITelegramUser) => {
			try {
				if (user?.id) {
					console.log('Зашел в тг бинд')
					await bindSocialsService.bindTelegram({
						client_id: user?.id,
						...userTelegram,
					})
					nav(ROUTES_PATH.myProfile)
					window.location.reload()
				}
			} catch (error: any) {
				console.error('Не удалось привязать аккаунт:', error)
				handleOpen()
				setError(error)
			}
		}

		window.onTelegramAuth = onTelegramAuth
		const script = document.createElement('script')
		script.src = "https://telegram.org/js/telegram-widget.js?22"
		script.setAttribute("data-telegram-login", `${TELEGRAM_BOT_AUTH}`)
		script.setAttribute("data-size", "small")
		script.setAttribute("data-userpic", "false")
		script.setAttribute("data-onauth", "onTelegramAuth(user)")
		script.setAttribute("data-request-access", "write")
		script.async = true
		document.getElementById('telegram-button')?.appendChild(script)

	}, [])

	return (
		<>
			{isOpen && <UncorrectFormat
				onClose={handleClose}
				text={`Произошла ошибка: ${error}`} />}
			<div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
				<img src={telegramLogo_img} alt="tg_auth" />
				<span style={{ fontSize: 14, color: '#7099ED' }}>Привязать</span>
				<div style={{ position: 'absolute', opacity: 0, bottom: 0, zIndex: 3 }} id="telegram-button">
				</div>
			</div>
		</>
	)
}

export default TelegramBind;


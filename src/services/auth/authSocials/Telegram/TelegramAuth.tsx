import jscookie from 'js-cookie'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import telegramLogo_img from '../../../../assets/images/other/TG LOGO.svg'
import { writeTokensToCookie } from '../../../../components/Auth/utils/utils'
import { TELEGRAM_BOT_AUTH } from '../../../../config/config'
import { useAuth } from '../../../../hooks/auth/useAuth'
import { addTelegramData } from '../../../../store/slices/AuthSlice/authTelegram/AuthTelegramSlice'
import { setExternalHash } from '../../../../store/slices/other/setExternalHash'
import { loginService } from '../../login.service'
import { ITelegramUser } from '../typesSoicals'
import { useNavigate } from 'react-router-dom'

const TelegramButton: React.FC = () => {
  const dispatch = useDispatch()
  const auth = useAuth()
  const nav = useNavigate()

  useEffect(() => {
    const telegramButton = document.getElementById('telegram-button')
    if (telegramButton) {
      telegramButton.style.width = '25px'
    }

    // Функция для обработки авторизации
    const onTelegramAuth = async (userTelegram: ITelegramUser) => {
      try {
        const response = await loginService.loginTelegram({
          ...userTelegram,
          id: String(userTelegram.id)
        })
        if (response.access_token && response.refresh_token) {
          writeTokensToCookie({
            access_token: response.access_token,
            refresh_token: response.refresh_token
          })
          dispatch(addTelegramData(userTelegram))
          auth()
          window.location.reload()
        }
        else if (response.external_hash) {
          jscookie.set('external_hash', response.external_hash)
          dispatch(setExternalHash(response.external_hash))
          nav('/')
          console.log(response.external_hash)
        }
      } catch (error) {
        console.error('Что-то пошло не так.Попробуйте еще раз:', error)
        console.log(error)
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
    return () => {
      document.getElementById('telegram-button')?.removeChild(script)
    }
  }, [])

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
      <img src={telegramLogo_img} alt="tg_auth" />
      <div style={{ position: 'absolute', opacity: 0, bottom: 0, zIndex: 3 }} id="telegram-button">
      </div>
    </div>
  )
}

export default TelegramButton;


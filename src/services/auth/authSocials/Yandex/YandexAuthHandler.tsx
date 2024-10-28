import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { YANDEX_ORIGINAL_URL } from '../../../../config/config'


const YandexAuthHandler: React.FC = () => {
	const nav = useNavigate()

	useEffect(() => {
		// Создаем элемент скрипта
		const script = document.createElement('script')
		script.src = "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js"
		script.async = true
		const windLocation = new URL(window.location.href)
		const access_token = windLocation.searchParams.get('access_token')
		console.log(access_token)

		const handleScriptLoad = () => {
			try {
				window.YaSendSuggestToken(YANDEX_ORIGINAL_URL, { flag: true })

			} catch (error) {
				console.log('Ошибка авторизации', error)
			}
		}

		script.onload = handleScriptLoad
		document.body.appendChild(script)

		// Функция очистки для удаления скрипта, когда компонент размонтируется
		return () => {
			document.body.removeChild(script)
		}
	}, [nav])

	return null
}

export default YandexAuthHandler
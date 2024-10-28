import { YANDEX_API_KEY } from '../config/config'

export const yandexInit = () => {

	const yandexApiKey = YANDEX_API_KEY

	const script = document.createElement("script")
	script.src = `https://api-maps.yandex.ru/v3/?apikey=${yandexApiKey}&lang=ru_RU`
	document.head.appendChild(script)

}
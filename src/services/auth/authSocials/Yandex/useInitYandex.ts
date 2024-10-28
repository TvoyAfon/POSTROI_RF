import React, { SetStateAction, useEffect } from 'react'
import { YANDEX_CLIENT_ID, YANDEX_URL_REDIRECT } from '../../../../config/config'

export const useInitYandex = (setToken: React.Dispatch<SetStateAction<any>>) => {


	const oauthQueryParams = {
		client_id: YANDEX_CLIENT_ID,
		response_type: 'token',
		redirect_uri: YANDEX_URL_REDIRECT
	}

	useEffect(() => {
		const initYandex = async () => {
			// Проверяем наличие контейнера, прежде чем выполнять инициализацию
			const checkContainerExists = () => {
				return document.getElementById("buttonContainerId") !== null
			}

			const interval = setInterval(() => {
				if (checkContainerExists()) {
					clearInterval(interval) // Остановка проверки
					if (window.YaAuthSuggest) {
						console.log('ВЫЗВАЛСЯ ИНИТ ЯНДЕКС')
						window.YaAuthSuggest.init(oauthQueryParams, YANDEX_URL_REDIRECT, {
							view: "button",
							parentId: "buttonContainerId",
							buttonSize: 'xs',
							buttonView: 'iconBg',
							buttonTheme: 'light',
							buttonBorderRadius: "18",
							buttonIcon: 'ya',
							customBgColor: 'rgba(0, 0, 0, 0)',
							customBgHoveredColor: 'rgba(0, 0, 0, 0)',
							customBorderColor: 'rgba(0, 0, 0, 0)',
							customBorderHoveredColor: 'rgba(0, 0, 0, 0)',
							customBorderWidth: '0',
						})
							.then(({ handler }) => handler())
							.then(responseData => {
								setToken(responseData.access_token)
							})
							.catch(error => console.log('Обработка ошибки', error))
					} else {
						console.error('YaAuthSuggest не загружен')
					}
				}
			}, 100) // Проверка каждые 100 миллисекунд
		}

		initYandex()
	}, [])
}
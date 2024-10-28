import jscookie from 'js-cookie'
import React, { CSSProperties, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { writeTokensToCookie } from '../../../../components/Auth/utils/utils'
import UncorrectFormat from '../../../../components/ui/Modal/UncorrectFormat'
import { useAuth } from '../../../../hooks/auth/useAuth'
import { useModal } from '../../../../hooks/useModal'
import { ROUTES_PATH } from '../../../../routes/routes'
import { setExternalHash } from '../../../../store/slices/other/setExternalHash'
import { RootState } from '../../../../store/store'
import { bindSocialsService } from '../../bindSocials.service'
import { loginService } from '../../login.service'
import { useInitYandex } from './useInitYandex'

const YandexAuth: React.FC<{ style?: CSSProperties, isBindYandex?: boolean }> = ({ style, isBindYandex = false }) => {
		const [token, setToken] = useState<any>(null) // Устанавливаем начальное значение как null 

	const auth = useAuth()
	const { user } = useSelector((state: RootState) => state.auth)
	const nav = useNavigate()
	const { handleClose, handleOpen, isOpen } = useModal()
	const [error, setError] = useState('')
	const dispatch = useDispatch()
	

	useEffect(() => {
		if (!isBindYandex) return
		jscookie.set('user_id', String(user?.id))
	}, [isBindYandex])

	useInitYandex(setToken)
	useEffect(() => {

		if (token) { // Проверяем, что токен доступен

			const bindYandex = async () => {
				try {
					await bindSocialsService.bindYandex(Number(jscookie.get('user_id')), token)
					nav(ROUTES_PATH.myProfile)
					window.location.reload()
				} catch (error: any) {
					setError(error)
					handleOpen()
					console.log('Ошибка привязки яндекса', error)
				}
			}

			const authenticate = async () => {
				try {
					const response = await loginService.loginYandex(token)
					if (response.access_token && response.refresh_token) {
						writeTokensToCookie({
							access_token: response.access_token,
							refresh_token: response.refresh_token
						})
						auth()
						window.location.reload()
					} else if (response.external_hash) {
						jscookie.set('external_hash', response.external_hash)
						dispatch(setExternalHash(response.external_hash))
						console.log(response.external_hash)
					}

				} catch (error) {
					console.error('Ошибка отправки запроса на сервер', error)
				}
			}

			if (isBindYandex) {
				bindYandex()
			} else {
				authenticate()
			}
		} else {
			console.log('Ошибка получения токена')
		}
	}, [token]) // Зависимость от token

	return <>
		{isOpen && <UncorrectFormat
			onClose={handleClose}
			text={`Произошла ошибка: ${error}`} />}
		<div
			style={{ position: 'absolute', left: 192, width: 40, ...style }} id='buttonContainerId'>
		</div>
	</>
}

export default YandexAuth
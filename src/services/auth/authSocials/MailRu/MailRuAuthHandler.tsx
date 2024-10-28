import jscookie from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { writeTokensToCookie } from '../../../../components/Auth/utils/utils'
import UncorrectFormat from '../../../../components/ui/Modal/UncorrectFormat'
import { useAuth } from '../../../../hooks/auth/useAuth'
import { useModal } from '../../../../hooks/useModal'
import { ROUTES_PATH } from '../../../../routes/routes'
import { openModal } from '../../../../store/slices/FormSlice/FormSlice'
import { setExternalHash } from '../../../../store/slices/other/setExternalHash'
import { bindSocialsService } from '../../bindSocials.service'
import { loginService } from '../../login.service'


const MailRuAuthHandler: React.FC = () => {
	const auth = useAuth()
	const nav = useNavigate()
	const windLocation = new URL(window.location.href)
	const code = windLocation.searchParams.get('code')
	const isBindMailRU = jscookie.get('isBindMailRu')
	const userID = jscookie.get('user_id')
	const dispatch = useDispatch()
	const { handleClose, handleOpen, isOpen } = useModal()
	const [error, setError] = useState('')


	useEffect(() => {
		if (!code) return

		try {
			if (isBindMailRU === 'true') {
				bindMailRu(code)
			}
			else if (isBindMailRU === 'false') {
				sendCode(code)
			}
		} catch (error) {
			console.log('Ошибка отправки кода на сервер', error)
		}
	}, [code])

	const bindMailRu = async (code: string) => {

		try {
			await bindSocialsService.bindMailRu(Number(userID), code)
			nav(ROUTES_PATH.myProfile)
			window.location.reload()
		} catch (error: any) {
			handleOpen()
			setError(error)
			console.log('Не удалось сделать привязку', error)
		}
	}

	const sendCode = async (code: string) => {
		try {
			const response = await loginService.loginMailRu(code)
			if (response.access_token && response.refresh_token) {
				writeTokensToCookie({ access_token: response.access_token, refresh_token: response.refresh_token })
				nav('/')
				await auth()
			}
			else if (response.external_hash) {
				jscookie.set('external_hash', response.external_hash)
				dispatch(setExternalHash(response.external_hash))
				nav('/')
				setTimeout(() => {
					dispatch(openModal('authModal'))
				}, 1000)
				console.log(response.external_hash)
				jscookie.set('external_hash', response.external_hash)
			}

		} catch (error) {
			console.error('Ошибка получения токенов:', error)
		}
		finally {
			nav('/')
		}
	}

	return isOpen ? <UncorrectFormat
		onClose={handleClose}
		text={`Произошла ошибка : ${error}`} /> : null
}

export default MailRuAuthHandler
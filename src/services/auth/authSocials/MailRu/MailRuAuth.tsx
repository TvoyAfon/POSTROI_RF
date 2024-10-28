import jscookie from 'js-cookie'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MAILRU_CLIENT_ID, MAILRU_REDIRECT_URL } from '../../../../config/config'
import { setStateFromMail } from '../../../../store/slices/other/getStatefromMail'
import { cryptoRandomGenerator } from './utils/CryptoRandomGenerator'
import { RootState } from '../../../../store/store'

const MailRuAuth: React.FC<{ children: React.ReactNode, isBind?: boolean }> = ({ children, isBind = false }) => {
	const dispatch = useDispatch()
  const {user} = useSelector((state:RootState) => state.auth)

	useEffect(() => {
		if (isBind){ 
			jscookie.set('isBindMailRu', 'true')
			jscookie.set('user_id',String(user?.id))
		}
	 else	jscookie.set('isBindMailRu', 'false')
	}, [isBind])

	const handleConnectToMail = () => {
		const newCryptoRandom = cryptoRandomGenerator()
		dispatch(setStateFromMail(newCryptoRandom))
		if (newCryptoRandom) {
			const MailUrl = `https://oauth.mail.ru/login?client_id=${MAILRU_CLIENT_ID}&response_type=code&scope=userinfo&redirect_uri=${MAILRU_REDIRECT_URL}&state=${newCryptoRandom}`
			setTimeout((window.location.href = MailUrl), 300)
		} else {
			console.log('Ошибка получения stateMailRu')
		}
	}

	return (
		<div onClick={handleConnectToMail}>
			{children}
		</div>
	)
}

export default MailRuAuth
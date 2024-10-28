
import jscookie from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import vkLogo_img from '../../../../assets/images/other/VK LogoType.svg'
import ErrorSignature from '../../../../components/Auth/ui/ErrorSignature'
import { VK_AUTH_URL, VK_CLIENT_ID_ORIGINAL, VK_REDIRECT, VK_STATE } from '../../../../config/config'
import { RootState } from '../../../../store/store'
import { generateCodeChallenge, generateCodeVerifier } from './utils/vkUtils'

const VkAuth: React.FC<{ isBindVk?: boolean }> = ({ isBindVk = false }) => {
	const [error, setError] = useState(false)
	const clientId = VK_CLIENT_ID_ORIGINAL
	const state = VK_STATE
	const { user } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		if (isBindVk) {
			jscookie.set('isBindVk', 'true')
			jscookie.set('user_id', String(user?.id))
		}
		else jscookie.set('isBindVk', 'false')
	}, [isBindVk])

	const handleLoginVk = async () => {

		const verifier = generateCodeVerifier()
		const encodeUrl = encodeURIComponent(VK_REDIRECT)
		try {
			const challenge = await generateCodeChallenge(verifier)
			localStorage.setItem('code_challenge', challenge)
			localStorage.setItem('code_verifier', verifier)

			const authUrl = `${VK_AUTH_URL}?response_type=code&client_id=${clientId}&scope=email%20phone&redirect_uri=${encodeUrl}&state=${state}&code_challenge=${challenge}&code_challenge_method=s256`
			window.location.assign(authUrl)

		} catch (error) {
			setError(true)
		}
	}

	return (
		<div style={{ position: 'relative' }}>
			{!isBindVk ? <>
				<img
					onClick={handleLoginVk}
					src={vkLogo_img}
					alt="vkLogo" />
				{error && <ErrorSignature
					style={{ position: 'absolute', bottom: -22, left: -80 }}>Что-то пошло не так.Повторите попытку еще раз.</ErrorSignature>}
			</> :
				<div
					style={{ display: 'flex', alignItems: 'center' }}
					onClick={handleLoginVk}>
					<img
						src={vkLogo_img}
						alt="vkLogo" />
					<span style={{ fontSize: 14, color: '#7099ED', cursor: 'pointer', paddingLeft: 8 }}>Привязать</span>
				</div>
			}
		</div>
	)
}

export default VkAuth

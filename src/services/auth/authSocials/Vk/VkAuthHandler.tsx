import axios from 'axios'
import jscookie from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { writeTokensToCookie } from '../../../../components/Auth/utils/utils'
import UncorrectFormat from '../../../../components/ui/Modal/UncorrectFormat'
import { VK_CLIENT_ID_ORIGINAL, VK_REDIRECT, VK_STATE, VK_URL } from '../../../../config/config'
import { useAuth } from '../../../../hooks/auth/useAuth'
import { useModal } from '../../../../hooks/useModal'
import { ROUTES_PATH } from '../../../../routes/routes'
import { openModal } from '../../../../store/slices/FormSlice/FormSlice'
import { setExternalHash } from '../../../../store/slices/other/setExternalHash'
import { bindSocialsService } from '../../bindSocials.service'
import { loginService } from '../../login.service'

const VkAuthHandler: React.FC = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const clientId = VK_CLIENT_ID_ORIGINAL
    const isBindVK = jscookie.get('isBindVk')
    const userId = jscookie.get('user_id')
    const { handleClose, handleOpen, isOpen } = useModal()
    const [error, setError] = useState('')
    const dispatch = useDispatch()


    useEffect(() => {
        const windLocation = new URL(window.location.href)
        const receivedCode = windLocation.searchParams.get('code')
        const device_id = windLocation.searchParams.get('device_id')
        /*  const stateFromResponse = windLocation.searchParams.get('state') */

        if (receivedCode) {
            const codeVerifier = localStorage.getItem('code_verifier') // здесь может быть ошибка; вам нужно сохранять verifier, а не challenge

            if (device_id) {
                fetchAccessToken(receivedCode, device_id, codeVerifier)

            } else {
                console.error('State does not match. Potential CSRF attack.')
            }
        } else {
            console.error('No code received from VK.')
        }
    }, [])

    const fetchAccessToken = async (code: string | null, device_id: string, codeVerifier: string | null) => {
        const url = VK_URL

        const dataUser = new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code_verifier: codeVerifier || '',
            device_id: device_id || '',
            code: code || '',
            redirect_uri: VK_REDIRECT,
            state: VK_STATE,
        })

        console.log(dataUser)

        try {
            const response = await axios.post(url, dataUser)
            const token = response.data.access_token
            if (isBindVK === 'true') {
                await bindSocialsService.bindVk(Number(userId), token)
                navigate(ROUTES_PATH.myProfile)
                window.location.reload()
            } else if (isBindVK === 'false') {
                const response = await loginService.loginVk(token)
                if (response.access_token && response.refresh_token) {
                    writeTokensToCookie({
                        access_token: response.access_token,
                        refresh_token: response.refresh_token
                    })
                    navigate('/')
                    await auth()
                }
                else if (response.external_hash) {
                    dispatch(setExternalHash(response.external_hash))
                    navigate('/')
                    setTimeout(() => {
                        dispatch(openModal('authModal'))
                    }, 1000)
                    console.log(response.external_hash)
                }
            }
        } catch (error: any) {
            handleOpen()
            setError(error)
            console.error('Failed to fetch access token:', error)
        }
    }

    return isOpen ?
        <UncorrectFormat
            onClose={handleClose}
            text={`Произошла ошибка: ${error}`} /> : null
}

export default VkAuthHandler
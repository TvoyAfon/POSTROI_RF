import { Dispatch } from '@reduxjs/toolkit'
import jsCookie from 'js-cookie'
import { ITokens } from "../../../services/auth/common/types"
import { WebSocketChatClient } from '../../../services/chat/websocket/chat-client'
import { openChat } from '../../../store/slices/ChatSlice/ChatSlice'

export function writeTokensToCookie(tokens: ITokens) {
    const { access_token, refresh_token } = tokens

    jsCookie.set('access_token', access_token, { expires: 2 })
    jsCookie.set('refresh_token', refresh_token, { expires: 10 })
}

export function getTokens(): ITokens {
    return {
        access_token: jsCookie.get('access_token') || '',
        refresh_token: jsCookie.get('refresh_token') || ''
    }
}

export function getUserIp(defaultVal: string = ''): string {
    return jsCookie.get('x-real-ip') || defaultVal
}

export function logOut(
    chatClient: WebSocketChatClient | null,
    dispatch: Dispatch
) {
    jsCookie.remove('access_token')
    jsCookie.remove('refresh_token')

    if (chatClient) {
        chatClient.disconnect()
    }

    dispatch(openChat(false))
}

export function getDeviceId() {
    return Number(jsCookie.get('device_id'))
}
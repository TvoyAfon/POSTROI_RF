import { useDispatch, useSelector } from 'react-redux'
import { CHAT_SERVICE_HOST, CHAT_SERVICE_PORT } from '../config/config'
import { WebSocketChatClient } from '../services/chat/websocket/chat-client'
import { IWebSocketEvent } from '../services/chat/websocket/types'
import { addChatClient, addLastUpdate } from '../store/slices/ChatSlice/ChatSlice'
import { RootState } from '../store/store'

export const useWebSocket = () => {
	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state.auth)

	const handleEvent = (event: IWebSocketEvent): void => {
		console.log('event', event)
		dispatch(addLastUpdate(event))
	}

	return () => {
		if (!user) return

		const clientDeviceId = localStorage.getItem('client_device_id')

		if (!clientDeviceId) {
			return console.error("[!] No client_device_id in localStorage.")
		}

		const client = new WebSocketChatClient({
			host: `${CHAT_SERVICE_HOST}:${CHAT_SERVICE_PORT}`,
			onEvent: handleEvent,
			deviceId: Number(clientDeviceId),
			clientId: Number(user.id),
			dispatch
		})
		dispatch(addChatClient(client))
	}
}
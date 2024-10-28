import { getTokens } from '../../../../../components/Auth/utils/utils'
import { Events } from '../../../../../shared/types'
import { IChatClientConfig, IWebSocketEvent } from './types'

export class WebSocketChatClient {
	config: IChatClientConfig
	ws: WebSocket | null

	constructor(config: IChatClientConfig) {
		this.config = config
		this.ws = null

		this.connect = this.connect.bind(this)
		this.handleClose = this.handleClose.bind(this)
		/*	this.handleError = this.handleError.bind(this)*/
		this.handleMessage = this.handleMessage.bind(this)
		this.handleOpen = this.handleOpen.bind(this)

		this.connect()
	}

	private connect() {
		/*	const { host } = this.config
	
			this.ws = new WebSocket(`${getWebSocketProtocol()}://${host}/chat/ws_api`)
	
			this.ws.onclose = this.handleClose
			this.ws.onmessage = this.handleMessage
			this.ws.onerror = this.handleError 
			this.ws.onopen = this.handleOpen */
	}

	private handleOpen() {
		this.send({
			'@type': Events.AUTHENTICATION
		})
	}

	/*	private handleError(event: Event) {
			console.log(event) 
		}  */

	private handleClose() {
		/*	console.log('closed')
	
			/*const handlerId = setInterval(() => {
				this.connect()
				console.log(this.ws?.readyState)
				if (this.ws?.readyState === this.ws?.OPEN) {
					clearInterval(handlerId)
					console.log('Connected')
				} else {
					console.log('Connection failed')
				}
			}, 2000)*/
	}

	private handleMessage(event: MessageEvent<any>) {
		try {
			const msg: IWebSocketEvent = JSON.parse(event.data)
			this.config.onEvent && this.config.onEvent(msg)
		} catch (error) {
			console.error('Invalid json in incomming server message.', event.data)
		}
	}

	disconnect() {
		this.ws?.close()
	}

	send(data: IWebSocketEvent) {
		const { clientId, deviceId } = this.config
		const accessToken = getTokens().access_token

		this.ws?.send(JSON.stringify({
			...data,
			client_id: clientId,
			device_id: deviceId,
			access_token: accessToken,
		}))
	}
}
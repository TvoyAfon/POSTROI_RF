export interface IWebSocketEvent {
	'@type': string
	'@status'?: number
	'@details'?: string
	[key: string]: any
}

export interface IChatClientConfig {
	onEvent?: (event: IWebSocketEvent) => void
	host: string
	clientId: number
	deviceId: number
}
import { CHAT_SERVICE_URL } from '../../config/config'
import { sendAsync } from '../send-async'
import { URLConstructor } from '../url'
import { IGetMessagesResponse, MessagesListSchema, SendMessageRequestOut, SendMessageSchema } from './common/types'

class MessageService {
	url = new URLConstructor(`${CHAT_SERVICE_URL}/message`)

	async deleteMessage(messageId: number): Promise<any> {
		return await sendAsync('delete', this.url.constructURL('message', { message_id: messageId }), {}, { useAuthorization: true })
	}

	async getMessages(schema: MessagesListSchema): Promise<IGetMessagesResponse | undefined> {
		return await sendAsync('get', this.url.constructURL('messages', schema), {}, { useAuthorization: true })
	}

	async sendMessage(schema: SendMessageSchema): Promise<SendMessageRequestOut | undefined> {
		const formData = new FormData()
		const { files, ...messageData } = schema

		formData.append('data', JSON.stringify(messageData))

		for (const file of (files || [])) {
			formData.append('files', file)
		}

		return await sendAsync('post', this.url.constructURL('send'), formData, { useAuthorization: true })
	}
}

export const messageService = new MessageService()
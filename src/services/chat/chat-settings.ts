import { CHAT_SERVICE_URL } from '../../config/config'
import { sendAsync } from '../send-async'
import { URLConstructor } from '../url'

class ChatSettingsService {
	url = new URLConstructor(`${CHAT_SERVICE_URL}/chat_settings`)

	async moveToArchive(chatId: number): Promise<any> {
		return await sendAsync('patch', this.url.constructURL('archive', { chat_id: chatId }), {}, { useAuthorization: true })
	}

	async changeNotificationsSettings(chatId: number, isDisabled: boolean): Promise<any> {
		return await sendAsync('patch', this.url.constructURL('notifications', { chat_id: chatId, is_disabled: isDisabled }), {}, { useAuthorization: true })
	}
}

export const chatSettingsService = new ChatSettingsService()
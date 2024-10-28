import { CHAT_SERVICE_URL } from '../../config/config'
import { sendAsync } from '../send-async'
import { URLConstructor } from '../url'
import { AddToChatScheme, CreateChatResponse, CreateGroupScheme } from './common/types'

class GroupService {
	url = new URLConstructor(`${CHAT_SERVICE_URL}/group`)

	async createGroup(scheme: CreateGroupScheme): Promise<CreateChatResponse | undefined> {
		return await sendAsync('post', this.url.constructURL('create_group'), scheme, { useAuthorization: true })
	}

	async addToChat(addToChatScheme: AddToChatScheme): Promise<CreateChatResponse | undefined> {
		console.log('test')
		return await sendAsync('post', this.url.constructURL('add_to_chat'), addToChatScheme, { useAuthorization: true })
	}

	async changeGroupColor(chatId: number, chatColor: string): Promise<any> {
		return await sendAsync('patch', this.url.constructURL('group_color', { chat_id: chatId, chat_color: chatColor }), {}, { useAuthorization: true })
	}
}

export const groupService = new GroupService()
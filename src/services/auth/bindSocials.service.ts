import { AUTH_SERVICE_URL } from '../../config/config'
import { sendAsync } from '../send-async'
import { URLConstructor } from '../url'
import { IBindTelegram } from './authSocials/typesSoicals'

class BindSocialsService {
	url = new URLConstructor(`${AUTH_SERVICE_URL}/bind`)

	async bindTelegram(schema: IBindTelegram) {
		return await sendAsync('post', this.url.constructURL('telegram'), schema)
	}

	async bindMailRu(client_id: number, code: string) {
		return await sendAsync('post', this.url.constructURL('mail'), { client_id, code })
	}

	async bindVk(client_id: number, access_token: string) {
		return await sendAsync('post', this.url.constructURL('vk'), { client_id, access_token })
	}

	async bindYandex(client_id: number, token: string) {
		return await sendAsync('post', this.url.constructURL('yandex'), { client_id, token })
	}
}

export const bindSocialsService = new BindSocialsService()

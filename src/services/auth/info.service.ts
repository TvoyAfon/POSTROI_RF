import { AUTH_SERVICE_URL } from '../../config/config'
import { sendAsync } from '../send-async'
import { URLConstructor } from '../url'
import { ICheckCodeSchema, IEditEmailSchema, IEditPhoneSchema } from './common/types'

class InfoService {
	url = new URLConstructor(`${AUTH_SERVICE_URL}/info`)

	async sendCodeEmail(email: string) {
		return await sendAsync('post', this.url.constructURL('send-code-email'), { email })
	}

	async sendCodeSms(phone: string) {
		return await sendAsync('post', this.url.constructURL('send-code-sms'), { phone })
	}

	async checkCode(schema: ICheckCodeSchema) {
		return await sendAsync('post', this.url.constructURL('check-code'), schema)
	}

	async editEmail(schema: IEditEmailSchema) {
		return await sendAsync('patch', this.url.constructURL('email'), schema, { useAuthorization: true })
	}

	async editPhone(schema: IEditPhoneSchema) {
		return await sendAsync('patch', this.url.constructURL('phone'), schema, { useAuthorization: true })
	}
}

export const infoService = new InfoService()
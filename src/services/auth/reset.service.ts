import { AUTH_SERVICE_URL } from '../../config/config'
import { sendAsync } from '../send-async'
import { URLConstructor } from '../url'
import { IResetCheckCode, IResetPasswordService } from './common/types'

class ResetService {
	url = new URLConstructor(`${AUTH_SERVICE_URL}/reset`)

	async resetPassword(data: IResetPasswordService) {
		return await sendAsync('post', this.url.constructURL('password'), data)
	}

	async resetCheckCode(data: IResetCheckCode) {
		return await sendAsync('post', this.url.constructURL('check-code'), data)
	}

	async resetSendCodeSms(phone: string) {
		return await sendAsync('post', this.url.constructURL('send-code-sms'), { phone })
	}

	async resetSendCodeEmail(email: string) {
		return await sendAsync('post', this.url.constructURL('send-code-email'), { email })
	}
}

export const resetService = new ResetService()

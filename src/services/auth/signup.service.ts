import { AUTH_SERVICE_URL } from "../../config/config"
import { sendAsync } from "../send-async"
import { URLConstructor } from "../url"
import { ICheckCodeSchema, IExistUser, ILoginReturn, IUserWithCodeAndWithoutId } from "./common/types"

class SignupSerice {
    url = new URLConstructor(`${AUTH_SERVICE_URL}/signup`)

    async sendCodeSms(phone: string) {
        return await sendAsync('post', this.url.constructURL('send-code-sms'), { phone })
    }

    async sendCodeEmail(email: string) {
        return await sendAsync('post', this.url.constructURL('send-code-email'), { email })
    }

    async createUser(user: IUserWithCodeAndWithoutId): Promise<ILoginReturn | undefined> {
        return await sendAsync('post', this.url.constructURL('create-user'), user)
    }

    async checkCode(schema: ICheckCodeSchema) {
        return await sendAsync('post', this.url.constructURL('check-code'), schema)
    }

    async existUser(schema: IExistUser) {
        return await sendAsync('post', this.url.constructURL('exist-user'), schema)
    }
}

export const signupService = new SignupSerice()
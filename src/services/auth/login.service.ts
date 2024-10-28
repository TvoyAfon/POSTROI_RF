import { AUTH_SERVICE_URL } from "../../config/config"
import { sendAsync } from "../send-async"
import { URLConstructor } from "../url"
import { ILoginReturn, ILoginSchema, ILoginTelegramSchema } from "./common/types"

class LoginService {
    url = new URLConstructor(`${AUTH_SERVICE_URL}/login`)

    async login(schema: ILoginSchema): Promise<ILoginReturn | undefined> {
        return await sendAsync('post', this.url.constructURL(''), schema);
    }

    async loginTelegram(schema: ILoginTelegramSchema) {
        return await sendAsync('post', this.url.constructURL('telegram'), schema);
    }

    async loginVk(access_token: string) {
        return await sendAsync('post', this.url.constructURL('vk'), { access_token });
    }

    async loginYandex(token: string) {
        return await sendAsync('post', this.url.constructURL('yandex'), { token });
    }

    async loginMailRu(code: string) {
        return await sendAsync('post', this.url.constructURL('mail'), { code });
    }
}

export const loginService = new LoginService()
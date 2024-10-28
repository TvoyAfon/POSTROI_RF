import axios from "axios"
import { getTokens, writeTokensToCookie } from "../../components/Auth/utils/utils"
import { AUTH_SERVICE_URL } from "../../config/config"
import { sendAsync } from "../send-async"
import { URLConstructor } from "../url"
import { IAuthReturn } from "./common/types"

class AuthService {
    url = new URLConstructor(`${AUTH_SERVICE_URL}/auth`)

    async auth(): Promise<undefined | IAuthReturn> {
        const { access_token } = getTokens()
        return await sendAsync('post', this.url.constructURL(''), { access_token }, { useAuthorization: true, refreshStatusCode: 403, isAuthorizationMethod: true })
    }

    async refresh() {
        try {
            const { refresh_token } = getTokens()

            const response = await axios.put(this.url.constructURL('refresh'), {
                refresh_token
            })

            writeTokensToCookie(response.data)
        } catch (error: any) {
            console.log(error)
            throw new Error(error)
        }
    }
}

export const authService = new AuthService()
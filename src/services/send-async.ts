import axios from "axios"
import { getTokens } from "../components/Auth/utils/utils"
import { authService } from "./auth/auth.service"

export interface IOptions {
    useAuthorization?: boolean
    refreshStatusCode?: number
    isAuthorizationMethod?: boolean
}

export async function sendAsync(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    data?: Record<string, any> | any[],
    options?: IOptions
) {
    const { access_token } = getTokens()

    const headers = options?.useAuthorization
        ?
        {
            Authorization: `Bearer ${access_token}`
        }
        : {}

    try {
        const response = await axios({
            method,
            url,
            headers,
            data
        })

        return response.data
    } catch (error: any) {
        if ([401, options?.refreshStatusCode].includes(error.response.status) && options?.useAuthorization) {
            try {
                await authService.refresh()
                if (!options.isAuthorizationMethod) {
                    return await sendAsync(method, url, data, options)
                }

                window.location.reload()
            } catch (error) {
                return
            }
        }

        throw new Error(error.response?.data?.detail || 'Unknown error occurred')
    }
}
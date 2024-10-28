import { USER_SERVICE_URL } from "../../config/config"
import { sendAsync } from "../send-async"
import { URLConstructor } from "../url"
import { FullUser, IGetInfoUser } from "./common/types"

class UserService {
    url = new URLConstructor(`${USER_SERVICE_URL}/user`)

    async getProfile(userId: number): Promise<FullUser | undefined> {
        return await sendAsync('get', this.url.constructURL('profile', { client_id: userId }), {}, { useAuthorization: true })
    }

    async getInfo(userId: number | undefined): Promise<IGetInfoUser | undefined> {
        return await sendAsync('get', this.url.constructURL('info', { client_id: userId }), {}, { useAuthorization: true })
    }

    async editAge(client_id: number, age: number) {
        return await sendAsync('patch', this.url.constructURL('age', { client_id, age }), {}, { useAuthorization: true })
    }

    async editAboutYourself(client_id: number, text: string) {
        return await sendAsync('patch', this.url.constructURL('about-yourself', { client_id, text }), {}, { useAuthorization: true })
    }

    async editFIO(client_id: number, first_name: string, last_name: string, patronymic: string) {
        return await sendAsync('patch', this.url.constructURL('fio', { client_id, first_name, last_name, patronymic }), {}, { useAuthorization: true })
    }

    async editclientType(client_id: number, client_type: string) {
        return await sendAsync('patch', this.url.constructURL('client-type', { client_id, client_type }), {}, { useAuthorization: true })
    }

    async editCity(client_id: number, city: string) {
        return await sendAsync('patch', this.url.constructURL('city', { client_id, city }), {}, { useAuthorization: true })
    }

    async editEducation(
        client_id: number,
        education_type: string | undefined,
        university: string,
        faculty: string,
        specialization: string,
        education_start: string,
        education_end: string,
        till_time: boolean
    ) {
        return await sendAsync('patch', this.url.constructURL('education', { client_id, education_type, university, faculty, specialization, education_start, education_end, till_time }), {}, { useAuthorization: true })
    }
}

export const userService = new UserService()
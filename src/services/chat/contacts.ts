import { CHAT_SERVICE_URL } from "../../config/config";
import { sendAsync } from "../send-async";
import { URLConstructor } from "../url";
import { GetMyContactsResponse } from "./common/types";

class ContactsService {
    url = new URLConstructor(`${CHAT_SERVICE_URL}/contacts`)

    async getMyContacts(): Promise<GetMyContactsResponse | undefined> {
        return await sendAsync('get', this.url.constructURL('get_my_contacts'), {}, { useAuthorization: true })
    }
}

export const contactsService = new ContactsService()
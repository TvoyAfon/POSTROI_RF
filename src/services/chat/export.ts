import { CHAT_SERVICE_URL } from "../../config/config";
import { downloadFile } from "../../utils/utils";
import { sendAsync } from "../send-async";
import { URLConstructor } from "../url";

class ExportService {
    url = new URLConstructor(`${CHAT_SERVICE_URL}/export`)

    async exportChatHistory(chatId: number) {
        try {
            const response = await sendAsync('get', this.url.constructURL('', { chat_id: chatId }), {}, { useAuthorization: true })

            const filename = `Export-${new Date().toDateString()}.zip`
            downloadFile('', filename, false, new Blob([response]))
        } catch (error: any) {
            console.error("Chat history export error")
        }
    }
}

export const exportService = new ExportService()
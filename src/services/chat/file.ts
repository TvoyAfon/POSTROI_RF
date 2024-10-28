import { CHAT_SERVICE_URL } from "../../config/config";
import { sendAsync } from "../send-async";
import { URLConstructor } from "../url";
import { UploadFileResponse } from "./common/types";

class FileService {
    url = new URLConstructor(`${CHAT_SERVICE_URL}/file`)

    async uploadFiles(files: File[]): Promise<UploadFileResponse | undefined> {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        return await sendAsync('post', this.url.constructURL('upload_file'), formData, { useAuthorization: true });
    }
}

export const fileService = new FileService();
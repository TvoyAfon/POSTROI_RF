import { IOrderFile } from '../../../../services/order/types/types'

export async function convertFileDataToFile(fileData: IOrderFile) {
	const { file, filename } = fileData

	const response = await fetch(file)
	const blob = await response.blob()

	const ext = filename.split('.').pop()

	const mediaType = {
		'docx': 'application/msword',
		'doc': 'application/msword',
		'xls': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'jpg': 'image/jpeg',
		'jpeg': 'image/jpeg',
		'png': 'image/png',
		'unknown': 'application/octet-stream'
	}[ext || 'unknown']

	return {
		url: file,
		blob: new File([blob], filename, { type: mediaType })
	}
}
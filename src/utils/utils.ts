import { IMAGE_REG_EXP, IS_PRODUCTION } from '../config/config'

export function getWebSocketProtocol() {
	return IS_PRODUCTION ? 'wss' : 'ws'
}

export async function downloadFile(
	url: string = '',
	filename: string,
	useFetch: boolean = true,
	blob?: Blob
) {
	if (IMAGE_REG_EXP.test(url)) {
		return void window.open(url, '_blank')
	}

	try {
		if (useFetch) {
			const response = await fetch(url)

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			blob = await response.blob()
		}

		if (!blob) return

		const link = document.createElement('a')
		const objectUrl = URL.createObjectURL(blob)

		link.href = objectUrl

		link.setAttribute('download', filename)
		document.body.appendChild(link)

		link.click()
		URL.revokeObjectURL(objectUrl)

		link.remove()
	} catch (error) {
		console.error('Error downloading file:', error)
	}
}
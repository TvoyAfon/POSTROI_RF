
export function getImageSource(file: File) {
	return new Promise<string>(resolve => {
		const reader = new FileReader()
		reader.onload = e => resolve(e.target?.result?.toString() || '')
		reader.readAsDataURL(file)
	})
}

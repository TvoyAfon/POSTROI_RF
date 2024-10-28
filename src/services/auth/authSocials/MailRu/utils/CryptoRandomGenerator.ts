

export const cryptoRandomGenerator = () => {

	const randomBytes = new Uint8Array(16)
	window.crypto.getRandomValues(randomBytes)
 
	// Преобразуем массив байт в строку в шестнадцатеричном формате
	const hexString = Array.from(randomBytes)
		.map(byte => byte.toString(16).padStart(2, '0'))
		.join('')

	return hexString
}
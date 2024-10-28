 export const generateCodeVerifier = () => {
	const array = new Uint8Array(32)
	window.crypto.getRandomValues(array)
	return Array.from(array, (dec) => ('0' + dec.toString(16)).slice(-2)).join('')
}

 export const generateCodeChallenge = (verifier: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const encoder = new TextEncoder()
		const data = encoder.encode(verifier)
		window.crypto.subtle.digest('SHA-256', data).then((buffer) => {
			const hashArray = Array.from(new Uint8Array(buffer))
			const base64url = btoa(String.fromCharCode(...hashArray))
				.replace(/\+/g, '-')
				.replace(/\//g, '_')
				.replace(/=+$/, '')
			resolve(base64url)
		}).catch(reject)
	})
}
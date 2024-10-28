export function isValidPhoneNumber(phoneNumber: string) {
	phoneNumber = phoneNumber.replace('+', '')
	const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
	return Boolean(!phoneNumber.match(regex)) && phoneNumber.length === 11
}

export function isValidEmailAddress(email: string) {
	const regex = /\S+@\S+\.\S+/
	return Boolean(email.match(regex))
}

export function isValidVerificationCode(code: string, fields: number) {
	return code.trim() && code.length === fields
}
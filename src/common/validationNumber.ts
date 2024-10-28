
export const validationNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
	let valuePhone = e.target.value.replace(/\D/g, '')

	if (valuePhone.length >= 1) { if (valuePhone.slice(0, 2) !== "+7") { valuePhone = "+7" + valuePhone.slice(1) } }

	return valuePhone
}

export const validationForRusNum = (valuePhone: string) => {
	if (valuePhone.length >= 1) { if (valuePhone.slice(0, 2) !== "+7") { valuePhone = "+7" + valuePhone.slice(1) } }    /* Доработать */
}
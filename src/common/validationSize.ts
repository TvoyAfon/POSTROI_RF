

export const validationValue = (e: React.ChangeEvent<HTMLInputElement>) => {
	const newVal = e.target.value.replace(/[^0-9]/g, '')

	return newVal
}
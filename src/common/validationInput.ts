import { useState } from 'react'

const [error, setError] = useState<boolean>(false)

export const validationInput = (value: string) => {
	if (value.length < 3) {
		setError(true)
	}
	else setError(false)

	return error
}

export const russianLettersRegex = /^[а-яё]+$/i
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const onlyNumberRegex = /^\d*$/


export const validationRusLetter = (e: React.ChangeEvent<HTMLInputElement>) => {
	return russianLettersRegex.test(e.target.value)
}

export const validateName = (value: string): boolean => {
	const regex = /^[А-Яа-яЁё\s]*$/; // Регулярное выражение для проверки
	return (value.length <= 50 || value.length === 0) && regex.test(value);
};

const time = new Date()
export const hours = time.getHours().toString().padStart(2, '0')
export const minutes = time.getMinutes().toString().padStart(2, '0')
export const days = time.getDay().toString().padStart(2, '0')
export const months = time.getMonth().toString().padStart(2, '0')

const currentDate = new Date()
const yesterdayDate = new Date()
yesterdayDate.setDate(yesterdayDate.getDate() - 1)

export const isToday = currentDate.toDateString() === currentDate.toDateString()
export const isYesterday = yesterdayDate.toDateString() === currentDate.toDateString()

export function getCurrentDateTime() {
	const time = new Date()
	const day = time.getDate().toString().padStart(2, '0')
	const month = (time.getMonth() + 1).toString().padStart(2, '0')
	const hours = time.getHours().toString().padStart(2, '0')
	const minutes = time.getMinutes().toString().padStart(2, '0')
	const years = time.getFullYear().toString().padStart(2, '0')

	return `${day}.${month}.${years}  ${hours}:${minutes}`
}

export function parseDate(dateString: string): Date {
	const [datePart, timePart] = dateString.split(' ')
	const [day, month, year] = datePart.split('.').map(Number)
	const [hours, minutes] = timePart.split(':').map(Number)
	// Создаем объект Date
	return new Date(year, month - 1, day, hours, minutes)
}

export function getHoursMin() {
	const time = new Date()
	const hours = time.getHours().toString().padStart(2, '0')
	const minutes = time.getMinutes().toString().padStart(2, '0')

	return `${hours}:${minutes}`
}

export function formatDateForOrder(dateString: string) {
	// Создаем объект даты из строки
	const date = new Date(dateString)

	// Опции для форматирования даты
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		weekday: 'long',
		day: 'numeric'
	}

	// Используем Intl.DateTimeFormat для форматирования даты
	const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date)

	// Заменяем запятые и пробелы для получения нужного формата
	const [weekday, dayMonthYear] = formattedDate.split(', ')
	const [day, monthYear] = dayMonthYear.split(' ')

	return `${day} ${monthYear} (${weekday})`
}

import { format, isThisWeek, isToday, isYesterday } from 'date-fns'
import { translateWeekDayToRussian } from '../components/ui/InputCalendar/utils'

export function getUserTimezone() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function getDate(utcDateString: string, isCompactFormat: boolean = false) {
	const normalDate = new Date(utcDateString.replace(' ', 'T') + 'Z')
	const localDateString = normalDate.toLocaleString()

	const dateParts = localDateString.split(/[., :]+/).map(Number)
	const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], dateParts[3], dateParts[4], dateParts[5])

	const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`

	if (isToday(date)) {
		return isCompactFormat ? time : `Сегодня в ${time}`
	}

	if (isYesterday(date)) {
		return isCompactFormat ? 'Вчера' : `Вчера в ${time}`
	}

	if (isThisWeek(date)) {
		const dayName = translateWeekDayToRussian(format(date, 'EEEE'))
		return isCompactFormat ? dayName : `${dayName} ${time}`
	}

	const formatted = format(date, 'dd.MM.yyyy')
	return isCompactFormat ? formatted : `${formatted} ${time}`
}

export function convertDate(dateString: string) {
	const date = new Date(dateString)

	const year = date.getUTCFullYear()
	const month = String(date.getUTCMonth() + 1).padStart(2, '0')
	const day = String(date.getUTCDate()).padStart(2, '0')
	const hours = String(date.getUTCHours()).padStart(2, '0')
	const minutes = String(date.getUTCMinutes()).padStart(2, '0')
	const seconds = String(date.getUTCSeconds()).padStart(2, '0')
	const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0')

	const outputDateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds.padEnd(6, '0')}`

	return outputDateStr
}

export function getMonthByNumber(monthNumber: string) {
	return {
		'01': 'Января',
		'02': 'Февраля',
		'03': 'Марта',
		'04': 'Апреля',
		'05': 'Мая',
		'06': 'Июня',
		'07': 'Июля',
		'08': 'Августа',
		'09': 'Сентября',
		'10': 'Октября',
		'11': 'Ноября',
		'12': 'Декабря'
	}[monthNumber]
}

export function getOrderDate(dateString: string) {
	const [year, month, day] = dateString.split('-')

	const monthName = getMonthByNumber(month)?.toLowerCase()
	const dayNumber = day.startsWith('0') ? day.replace('0', '') : day

	return `${dayNumber} ${monthName} ${year} года`
}
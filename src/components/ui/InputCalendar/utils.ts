export function translateDate(dateString: string): string {
	const months = {
		'July': "Июля",
		'June': 'Июня',
		'August': 'Августа',
		'September': 'Сентября',
		'October': 'Октября',
		'November': 'Ноября',
		'December': 'Декабря',
		'January': 'Января',
		'February': 'Февраля',
		'March': 'Марта',
		'April': 'Апреля',
		'May': 'Мая'
	}
	let newDateString = dateString

	for (let [en, ru] of Object.entries(months)) {
		if (dateString.includes(en)) {
			newDateString = dateString.replace(en, ru)
		}
	}

	return newDateString
}

export function translateWeekDayToRussian(weekDay: string): string {
	const days: Record<string, string> = {
		'Monday': 'Понедельник',
		'Tuesday': 'Вторник',
		'Wednesday': 'Среда',
		'Thursday': 'Четверг',
		'Friday': 'Пятница',
		'Saturday': 'Суббота',
		'Sunday': 'Воскресенье'
	}

	return days[weekDay] || weekDay
}
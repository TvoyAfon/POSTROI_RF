import { IS_PRODUCTION } from '../config/config'

export function getProtocol() {
  return IS_PRODUCTION ? 'https' : 'http'
}

export const orderFilters = ['Все', 'С откликами', 'В работе', 'Выполненные']

export const getAgeWord = (age: number) => {
  if (age < 0) return '' // Обработка некорректного значения
  if (age % 10 === 1 && age % 100 !== 11) {
    return 'год'
  }
  if ((age % 10 >= 2 && age % 10 <= 4) && (age % 100 < 10 || age % 100 >= 20)) {
    return 'года'
  }
  return 'лет'
}


export const handleEnterContinue = (e: React.KeyboardEvent, func: () => void) => {
  if (e.key === 'Enter') {
    func()
  }
}

export const differenceDays = (date: string) => {

  const givenDate: Date = new Date(date)

  // Текущая дата
  const currentDate: Date = new Date()

  // Получаем разницу в миллисекундах
  const differenceInMilliseconds: number = currentDate.getTime() - givenDate.getTime()
  // Конвертируем миллисекунды в дни
  const differenceInDays: number = differenceInMilliseconds / (1000 * 60 * 60 * 24)

  // Округляем до целого числа, если хотите получить целое количество дней
  const differenceInDaysRounded: number = Math.floor(differenceInDays)

  return differenceInDaysRounded
}

const getDaysWord = (count: number): string => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'дней' // 11, 12, 13, 14
  }

  if (lastDigit === 1) {
    return 'день' // 1
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'дня' // 2, 3, 4
  }

  return 'дней' // 0, 5-9, 11-19
}

export const displayDaysOnSite = (days: number) => {
  const daysWord = getDaysWord(days)
  return `${days} ${daysWord} на сайте`// Вывод на сайт или в консоль
}


export function formatDate(dateString: string) {
  // Разделяем строку даты на компоненты
  const [year, month, day] = dateString.split('-')
  // Форматируем и возвращаем новую строку даты
  return `${day}-${month}-${year}`
}

export function parseDimensions(data: string) {
  // Разделяем строку по амперсанду
  const dimensions = data.split('&')

  // Проверяем, что длина массива равна 4
  if (dimensions.length !== 4) {
    throw new Error('Некорректные данные: ожидается 4 значения.')
  }

  // Деструктурируем массив в 4 переменные
  const [length, width, height, volume] = dimensions.map(Number)

  return { length, width, height, volume }
}



export function convertDateRange(dateRange: string): string {
  // Массив месяцев
  const months: { [key: string]: string } = {
    'Января': '01',
    'Февраля': '02',
    'Марта': '03',
    'Апреля': '04',
    'Мая': '05',
    'Июня': '06',
    'Июля': '07',
    'Августа': '08',
    'Сентября': '09',
    'Октября': '10',
    'Ноября': '11',
    'Декабря': '12'
  }

  // Разделяем строку по ' - '
  const [start, end] = dateRange.split(' - ')

  // Функция для преобразования даты
  const formatDate = (date: string): string => {
    const parts = date.split(' ')
    const month = months[parts[0]]
    const day = parts[1].replace(',', '') // Убираем запятую
    const year = parts[2]
    return `${year}-${month}-${day.padStart(2, '0')}` // Форматируем как YYYY-MM-DD
  }

  // Форматируем каждую дату
  const formattedStart = formatDate(start)
  const formattedEnd = formatDate(end)

  return `${formattedStart} - ${formattedEnd}`
}



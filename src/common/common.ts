import searchorder_img from '../assets/images/other/patterns 1.png'
import { DocumentType } from '../components/CreateOrder/edit/ui/Files/DocumentCard'
import { IS_PRODUCTION } from '../config/config'
import { IOrderFile } from '../services/order/types/types'

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


export const checkPassport = (key: string) => {
  if (!key) return 'Статус паспорта неизвестен'
  switch (key) {
    case 'INVALID':
      return 'Не прошел проверку'
    case 'NO':
      return 'Подтвердить'
    case 'VALID':
      return 'Подтвержден'

  }
}

export const convertNumberDateToString = (dateString: string) => {
  if (!dateString) return '-'
  const months: string[] = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ]

  const [year, month, day] = dateString.split("-").map(Number)
  const monthName = months[month - 1]
  return `${day} ${monthName} ${year}`
}

export const checkPhotoFormat = (files: IOrderFile[]) => {
  if (!files || files.length === 0) {
    return searchorder_img // Return default image if no files are present
  }

  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.svg']

  const foundFile = files.find(file => {
    return validExtensions.some(ext => file.filename.toLowerCase().endsWith(`${ext}`))
  })

  return foundFile ? foundFile.file : searchorder_img

}

export const checkFileFormat = (file: IOrderFile): boolean => {
  const validExtensions = ['.pdf', '.docx', '.doc', '.txt', '.xlsx']

  // Get the file extension by extracting the part after the last dot
  const extension = file.filename.slice((file.filename.lastIndexOf(".")) || Infinity)

  // Check if the extension is in the list of validExtensions
  return validExtensions.some(validExtension => validExtension === extension)
}


export const fileType = (file: IOrderFile): DocumentType => {
  // Split the filename by dots to get the extension
  const extensions = file.filename.split('.')
  const extension = extensions[extensions.length - 1].toLowerCase() // Get 
  switch (extension) {
    case 'pdf':
      return 'pdf'
    case 'doc':
    case 'docx':
      return 'word'
    case 'xls':
    case 'xlsx':
      return 'xls'
    case 'txt':
      return 'txt'
    default:
      return 'generic' // Return 'generic' for unsupported file types
  }
}
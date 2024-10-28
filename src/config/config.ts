export const CHAT_SERVICE_HOST = import.meta.env.VITE_CHAT_SERVICE_HOST
export const CHAT_SERVICE_PORT = import.meta.env.VITE_CHAT_SERVICE_PORT

export const IS_PRODUCTION = parseInt(import.meta.env.VITE_IS_PRODUCTION || '0')

export const CHAT_SERVICE_URL = import.meta.env.VITE_CHAT_SERVICE_URL
export const AUTH_SERVICE_URL = import.meta.env.VITE_AUTH_SERVICE_URL
export const USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_URL

export const MAX_FILES_LENGTH = 10
export const FILES_FORMATS_ACCEPT = "doc,.docx,.xls,.xlsx,.pdf,.txt,.jpg,.jpeg,.png,.gif"
export const IMAGE_REG_EXP = /\.(jpg|jpeg|png|gif|bmp|svg)$/i
export const FILES_REG_EXP = /\.(xlsx|txt|pdf|docx|doc)$/i

export const API_KEY = import.meta.env.VITE_API_KEY
export const GET_AUTORIZATION = import.meta.env.VITE_GET_AUTORIZATION
export const GET_CITY = 'http://geohelper.info/api/v1/cities'


export const TELEGRAM_BOT_AUTH = import.meta.env.VITE_TELEGRAM_BOT_AUTH

export const VK_AUTH_URL = import.meta.env.VITE_VK_AUTH_URL
export const VK_URL = import.meta.env.VITE_VK_URL
export const VK_CLIENT_ID = import.meta.env.VITE_VK_CLIENT_ID
export const VK_CLIENT_ID_ORIGINAL = import.meta.env.VITE_VK_CLIENT_ID_ORIGINAL
export const VK_STATE = import.meta.env.VITE_VK_STATE
export const VK_REDIRECT = import.meta.env.VITE_VK_REDIRECT
export const VK_REDIRECT2 = import.meta.env.VITE_VK_REDIRECT2

export const YANDEX_SCRIPT_URL = import.meta.env.VITE_YANDEX_URL_SCRIPT
export const YANDEX_URL_REDIRECT = import.meta.env.VITE_YANDEX_URL_REDIRECT
export const YANDEX_CLIENT_ID = import.meta.env.VITE_YANDEX_CLIENT_ID
export const YANDEX_ORIGINAL_URL = import.meta.env.VITE_ORIGINAL_URL

export const MAILRU_REDIRECT_URL = import.meta.env.VITE_MAILRU_REDIRECT_URL
export const MAILRU_CLIENT_ID = import.meta.env.VITE_MAILRU_CLIENT_ID

export const REPORT_SERVICE_URL = import.meta.env.VITE_REPORT_SERVICE_URL

export const PROJECT_SERVICE_URL = import.meta.env.VITE_PROJECT_SERVICE_URL

export const ORDERS_SERVICE_URL = import.meta.env.VITE_ORDERS_SERVICE_URL


export const YANDEX_API_KEY = import.meta.env.VITE_YANDEX_API_KEY


export const IP_KEY = import.meta.env.VITE_IP_KEY
export const IP_URL = import.meta.env.VITE_IP_URL
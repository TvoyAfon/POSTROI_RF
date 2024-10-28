
import axios from 'axios'
import { YANDEX_API_KEY } from '../../config/config'

class YandexService {
    url = `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_API_KEY}`;
    /* ONLY RUSSIA */
    async getDataByAddress(address: string, cityCoordinates?: [number, number]): Promise<{ city: string; address: string; coordinates: [number, number] }[]> {
        try {
            const geocodeParams = cityCoordinates
                ? `&ll=${cityCoordinates[0]},${cityCoordinates[1]}&spn=0.1,0.1&`
                : '&'

            const response = await axios.get(`${this.url}${geocodeParams}geocode=${encodeURIComponent(address)}&format=json`)
            const geoObjects = response.data?.response?.GeoObjectCollection?.featureMember || []

            const result = geoObjects.map((geoObject: any) => {
                const country = geoObject.GeoObject?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country?.CountryName
                const city = geoObject.GeoObject?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country?.AdministrativeArea?.SubAdministrativeArea?.Locality?.LocalityName
                const formattedAddress = geoObject.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.formatted
                const coordinates = geoObject.GeoObject?.Point?.pos?.split(' ').map(Number) as [number, number]

                return {
                    country: country || '',
                    city: city || '',
                    address: formattedAddress || '',
                    coordinates: coordinates || [0, 0] // Используйте [0, 0] как запасной вариант, если координаты недоступны
                }
            }).filter((item: { country: string }) => item.country === 'Россия') // Filter for only Russia

            if (result.length === 0) {
                throw new Error('Геообъекты не найдены')
            }

            return result.map((item: { city: string; address: string; coordinates: [number, number] }) => ({ city: item.city, address: item.address, coordinates: item.coordinates }))

        } catch (error) {
            console.error('Не удалось найти координаты', error)
            throw error
        }
    }
    async getAddressByCoord(coordinates: [number, number]): Promise<{ city: string; address: string; coordinates: [number, number] }> {
        try {
            // Constructing geocode parameters from the coordinates
            const geocodeParams = `&ll=${coordinates[0]},${coordinates[1]}&spn=0.1,0.1&`

            // Making API call to Yandex geocoding service
            const response = await axios.get(`${this.url}${geocodeParams}geocode=${coordinates[0]},${coordinates[1]}&format=json`)

            // Extracting geoObjects from the response
            const geoObjects = response.data?.response?.GeoObjectCollection?.featureMember || []
            console.log('ГЕО', geoObjects)
            // Mapping to extract relevant details
            const result = geoObjects.map((geoObject: any) => {
                const country = geoObject.GeoObject?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country?.CountryName
                const city = geoObject.GeoObject?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country?.AdministrativeArea?.SubAdministrativeArea?.Locality?.LocalityName
                const formattedAddress = geoObject.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.formatted
                const coordinates = geoObject.GeoObject?.Point?.pos?.split(' ').map(Number) as [number, number]

                return {
                    country: country || '',
                    city: city || '',
                    address: formattedAddress || '',
                    coordinates: coordinates || [0, 0]
                }
            }).filter((item: { country: string }) => item.country === 'Россия')

            // Check if result is empty and throw an error
            if (result.length === 0) {
                throw new Error('Адрес не найден')
            }

            // Return the first matched result
            return {
                city: result[0].city,
                address: result[0].address,
                coordinates: result[0].coordinates
            }

        } catch (error) {
            console.error('Не удалось найти адрес по координатам', error)
            throw error
        }
    }
}

export const yandexService = new YandexService()
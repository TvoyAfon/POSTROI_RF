import { useEffect, useState } from 'react'
import { yandexService } from '../../services/yandex/yandexService'

export const useGetAddressByCoords = (coordinates: [number, number]) => {

	const [dataByCoords, setDataByCoords] = useState<{
		city: string
		address: string
		coordinates: [number, number]
	}>()

	useEffect(() => {
		if (!coordinates) return
		const getAddressByCoords = async () => {
			try {
				const response = await yandexService.getAddressByCoord(coordinates)
				setDataByCoords(response)
			} catch (error) {
				console.log('Не удалось найти адрес по указанным координатам', error)
			}
		}
		getAddressByCoords()
	}, [coordinates[0],coordinates[1]])
	return { dataByCoords }
}
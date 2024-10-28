import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { yandexService } from '../../services/yandex/yandexService'
import { RootState } from '../../store/store'
import useDebounce from '../useDebounce'

export const useGetDataByAddress = (address: string | undefined | null, cityCoords?: [number, number]) => {
	const [data, setData] = useState<{ city: string, address: string, coordinates: [number, number] }[]>()
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const debouncedAddress = useDebounce(address, 500)
	const { triggetInitCityCookie } = useSelector((state: RootState) => state.triggerFetch)


	useEffect(() => {

		const getDataByAddress = async () => {
			if (!address) return

			try {
				setLoading(true)
				setError(false)
				const response = await yandexService.getDataByAddress(address, cityCoords)
				setData(response)
			} catch (error) {
				setLoading(false)
				setError(true)
				console.log(error)
			}
			finally {
				setLoading(false)
			}
		}

		getDataByAddress()
	}, [debouncedAddress, triggetInitCityCookie])
	return { data, error, loading }
}
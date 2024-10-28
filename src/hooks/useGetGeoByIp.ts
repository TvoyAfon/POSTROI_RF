import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IP_URL } from '../config/config'
import { RootState } from '../store/store'

export const useGetGeoByIp = (ip: string) => {

	const { user } = useSelector((state: RootState) => state.auth)
	const [cityByIp, setCityByIp] = useState('')

	useEffect(() => {
		if (!ip && user?.city_name) return
		const getData = async () => {
			try {
				const response = await axios.get(`${IP_URL}/${ip}?lang=ru`)
				setCityByIp(response.data.city)
			} catch (error) {
				console.log(error)
			}
		}
		getData()
	}, [ip])
	return cityByIp
}
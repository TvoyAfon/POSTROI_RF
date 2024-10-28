import axios from 'axios'
import { ORDERS_SERVICE_URL } from '../config/config'


export const categoryList = async () => {
	try {
		const response = await axios.get(`${ORDERS_SERVICE_URL}/category/list`)
		return response.data
	} catch (error) {
      console.log('Не удалось получить список',error)
	}
}
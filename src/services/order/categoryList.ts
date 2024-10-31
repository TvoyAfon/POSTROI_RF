import { ORDERS_SERVICE_URL } from '../../config/config'
import { sendAsync } from '../send-async'
import { URLConstructor } from '../url'


class CategoryList {
	url = new URLConstructor(`${ORDERS_SERVICE_URL}/category`)

	async getCategoryList() {
		return await sendAsync('get', this.url.constructURL('list'), {}, {
			useAuthorization: true
		})
	}
}

export const categoryListService = new CategoryList()
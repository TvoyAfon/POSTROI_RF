import { ORDERS_SERVICE_URL } from '../../config/config'
import { sendAsync } from '../send-async'
import { URLConstructor } from '../url'
import { ICreateOrderParams, ICreateOrderSchema, IOrderEditSchema, IOrderExecutorSchema, IOrderInfo, IOrderListSchema, IOrderMyListSchema, IOrderPublish, OrderList } from './types/types'

class OrderService {
	url = new URLConstructor(`${ORDERS_SERVICE_URL}/order`)

	async create(
		body: ICreateOrderSchema,
		params: ICreateOrderParams
	): Promise<{ order_id: number } | undefined> {
		const formData = new FormData()

		formData.append('notification', JSON.stringify(body.notification))
		formData.append('contract', JSON.stringify(body.contract))
		body.files.forEach(file => formData.append('files', file))

		return await sendAsync(
			'post',
			this.url.constructURL('create', params),
			formData,
			{ useAuthorization: true }
		)
	}

	async list(schema: IOrderListSchema, categories_id?: number[] | []) {
		return await sendAsync('post', this.url.constructURL('list', schema), categories_id, { useAuthorization: true })
	}

	async mylist(schema: IOrderMyListSchema, categories_id?: number[] | []): Promise<OrderList | undefined> {
		return await sendAsync('post', this.url.constructURL('mylist', schema), categories_id, { useAuthorization: true })
	}

	async executor(schema: IOrderExecutorSchema) {
		return await sendAsync('patch', this.url.constructURL('executor', schema), {}, { useAuthorization: true })
	}

	async publish(schema: IOrderPublish) {
		return await sendAsync('patch', this.url.constructURL('publish', schema), {}, { useAuthorization: true })
	}

	async info(schema: IOrderPublish): Promise<IOrderInfo | undefined> {
		return await sendAsync('get', this.url.constructURL('info', schema), {}, { useAuthorization: true })
	}

	async delete(schema: IOrderPublish) {
		return await sendAsync('delete', this.url.constructURL('delete', schema), {}, { useAuthorization: true })
	}

	async edit(schema: IOrderEditSchema) {
		return await sendAsync('patch', this.url.constructURL('edit', schema), {}, { useAuthorization: true })
	}

	async filesAdd(params: IOrderPublish, files: File[]) {
		const formData = new FormData()
		files.forEach(file => formData.append('files', file))

		return await sendAsync('patch', this.url.constructURL('files-add', params), formData, { useAuthorization: true })
	}

	async filesRemove(schema: IOrderPublish, links: string[]) {
		return await sendAsync('patch', this.url.constructURL('files-remove', schema), links, { useAuthorization: true })
	}

}

export const orderService = new OrderService()
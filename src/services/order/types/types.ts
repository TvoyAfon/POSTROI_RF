import { IUserInfo } from '../../auth/common/types'
import { DegreeContamination, OrderStatus, PaymentMethod, WorkSpecialization } from './enums'

export interface IOrderActionSchema {
	client_id: number
	category_id: number
}

export interface IOrderPublish {
	client_id: number
	order_id: number
}

export interface IOrderExecutorSchema extends Omit<IOrderActionSchema, 'category_id'> {
	executor_id: number,
	order_id: number
}

export interface IOrderEditSchema extends IOrderPublish {
	title: string
	description: string
	contact_phone: string
	payment_method: PaymentMethod
	address: string
}

export interface IOrderSettings {
	notification: boolean
	min_rating?: number
	contract?: boolean
	is_call_executor?: boolean
	is_chat_executor?: boolean
	is_buy_material?: boolean
}

export interface IOrderNotif {
	is_send: boolean
	email: boolean
	vk: boolean
	whatsapp: boolean
	telegram: boolean
}

export interface IOrderContract {
	is_contract: boolean
	is_protected: boolean
}

export interface ICreateOrderSchema {
	files: File[]
	notification: IOrderNotif
	contract: IOrderContract
}

export interface ICreateOrderParams {
	client_id: number,
	title: string,
	description: string,
	address: string,
	category_id: number,     /* прокидывать айди нужно */
	start_date: string,
	end_date: string
	payment_method: string,
	contact_phone: string,
	min_rating: number | undefined
}

export interface IOrderMyListSchema {
	client_id: number
	page?: number
	limit?: number
	radius_search?: number
	search_filter?: string
}

export interface IOrderListSchema extends Omit<IOrderMyListSchema, 'client_id'> {
	city?: string
}

export interface IOrderFile {
	file: string
	filename: string
}

export interface ISubCategory {
	id: number
	name: string
	category_id: number
	category_name: string
}
export interface ClientInfo {
	id: number, first_name: string, last_name: string, patronymic: string
}

export interface IOrderInfo {
	id: number
	name: string
	client_id: number
	executor_id: number | null
	category_id: number
	start_date: string | null
	end_date: string | null
	description: string
	project_id: number | null
	contact_phone: string
	address: string
	square: string | null
	payment_method: PaymentMethod
	notification: IOrderNotif
	is_contract: boolean
	is_protected: boolean
	min_rating: number
	is_delivery: boolean
	transportation: null
	info_cargo: null
	params_cargo: string | null
	cleaning_type_other: string | null,
	info_time_rent: null
	info_time_handyman: null
	type_room: null
	style: null
	type_service: null
	is_analog: boolean
	work_specialization: WorkSpecialization | null
	type_cleaning: DegreeContamination | null
	materials_bought: string | null
	is_call_executor: boolean
	is_chat_executor: boolean
	status: OrderStatus
	preview: null | string
	price: number | null
	latitude: number
	city_id: number
	longitude: number
	client: ClientInfo
	publish_at: string | null
	created_at: string
	sub_category: ISubCategory
	files: IOrderFile[]
}

export interface IOrderFullInfo extends Omit<IOrderInfo, 'executor_id' | 'sub_category_id' | 'client_id'> {
	executor_data: IUserInfo | null
	client_data: IUserInfo | null
}

export type OrderList = IOrderInfo[]
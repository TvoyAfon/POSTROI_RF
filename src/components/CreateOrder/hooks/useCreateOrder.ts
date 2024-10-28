import { useSelector } from 'react-redux'
import { ICreateOrderParams } from '../../../services/order/types/types'
import { RootState } from '../../../store/store'
import { convertDate } from '../utils/utils'

export const useCreateOrder = () => {
	const orderData = useSelector((state: RootState) => state.createOrderData)
	const { user } = useSelector((state: RootState) => state.auth)

	if (!user?.id || !orderData.data.dateObjEnd || !orderData.data.dateObjStart || orderData.data.paymethod === null) return

	const params: ICreateOrderParams = {
		client_id: user.id,
		title: orderData.data.taskName,
		description: orderData.data.description,
		address: orderData.data.address,
		category_id: 2,     /* прокидывать айди нужно */
		start_date: convertDate(orderData.data.dateObjStart),
		end_date: convertDate(orderData.data.dateObjEnd),
		payment_method: orderData.data.paymethod,
		contact_phone: orderData.data.telephone,
		min_rating: orderData.data.offersRating
	}

	const socials = orderData.data.currentSocials
	const email = socials.includes('E-mail')
	const vk = socials.includes('Вконтакте')
	const whatsapp = socials.includes('WhatsApp')
	const telegram = socials.includes('Telegram')

	const body = {
		notification: {
			is_send: orderData.data.is_send,
			email,
			vk,
			whatsapp,
			telegram
		},
		contract: {
			is_contract: orderData.data.settings.contract,
			is_protected: orderData.data.settings.document
		},
		files: orderData.files
	}

	return {
		params, body
	}

}
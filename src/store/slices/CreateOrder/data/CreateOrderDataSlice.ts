import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrderData } from '../../../../interface/createOrder.props'
import { PaymentMethod } from '../../../../services/order/types/enums'

interface IState {
	data: IOrderData,
	files: File[]
}

const initialState: IState = {
	data: {
		taskName: '',
		description: '',
		dateObjStart: null,
		dateObjEnd: null,
		address: '',
		telephone: '+7',
		category1: '',
		connect: {
			chat: false,
			phone: false
		},
		offersRating: 4,
		currentSocials: [],
		is_send: false,
		paymethod: PaymentMethod.EXECUTOR,
		settings: {
			contract: false,
			push: false,
			rating: false,
			document: false
		},
		date: '',
		category2: '',
		category3: '',
		category4: '',
		categoryId: null
	},
	files: []
}

const createOrderDataSlice = createSlice({
	name: 'createOrderDataSlice',
	initialState,
	reducers: {
		addOrderData(state, action: PayloadAction<IOrderData>) {
			state.data = { ...state.data, ...action.payload }
		},
		addOrderFiles(state, action: PayloadAction<File[]>) {
			state.files = action.payload
		},

		clearOrderData(state) {
			state.data = initialState.data
		}
	}
})

export const { addOrderData, addOrderFiles, clearOrderData } = createOrderDataSlice.actions
export default createOrderDataSlice.reducer
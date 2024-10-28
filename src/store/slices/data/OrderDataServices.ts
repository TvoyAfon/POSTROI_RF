import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrderServicesData } from '../../../interface/createOrder.props'


interface IState {
	dataServices: IOrderServicesData,
	filesServices: File[]
}

const initialState: IState = {
	dataServices: {
		taskName: '',
		description: '',
		telephone: '',
		address: '',
		date: '',
		workTime: '',
		descretion: false,
		payMethod: null,

		settings: {
			offers: false,
			notice: false,
			contract: false,
		},
		categoryType:''
	},
	filesServices: []
}

const createOrderDataServicesSlice = createSlice({
	name: 'createOrderTruckingDataSlice',
	initialState,
	reducers: {
		addOrderServicesData(state, action: PayloadAction<IOrderServicesData>) {
			state.dataServices = { ...state.dataServices, ...action.payload }
		},
		addOrderServicesFiles(state, action: PayloadAction<File[]>) {
			state.filesServices = action.payload
		},
		clearOrderServicesData(state) {
			state.filesServices = [],
				state.dataServices = {
					taskName: '',
					description: '',
					telephone: '',
					address: '',
					date: '',
					workTime: '',
					descretion: false,
					payMethod: null,

					settings: {
						offers: false,
						notice: false,
						contract: false,
					},
					categoryType:''
				}
		}
	}
})

export const { addOrderServicesData, addOrderServicesFiles,clearOrderServicesData } = createOrderDataServicesSlice.actions
export default createOrderDataServicesSlice.reducer
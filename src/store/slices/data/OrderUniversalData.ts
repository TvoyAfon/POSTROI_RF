import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrderUniversalData } from '../../../interface/createOrder.props'


interface IState {
	dataUniversal: IOrderUniversalData,
	filesUniversal: File[]
}

const initialState: IState = {
	dataUniversal: {
		address: '',
		date: '',
		description: '',
		paymethod: null,
		phone: '',
		settings: {
			buyMaterials: false,
			contract: false,
			notice: false,
			offers: false
		},
		taskName: '',
		categoryType:''
	},
	filesUniversal: []
}


export const orderUniversalDataSlice = createSlice({
	name: 'universalData',
	initialState,
	reducers: {
		addOrderUniversalData(state, action: PayloadAction<IOrderUniversalData>) {
			state.dataUniversal = { ...state.dataUniversal, ...action.payload }
		},
		addOrderUniversalFiles(state, action: PayloadAction<File[]>) {
			state.filesUniversal = action.payload
		},
		clearOrderUniversalData(state) {
			state.dataUniversal = {
				address: '',
				date: '',
				description: '',
				paymethod: null,
				phone: '',
				settings: {
					buyMaterials: false,
					contract: false,
					notice: false,
					offers: false
				},
				taskName: '',
				categoryType:''
			}
			state.filesUniversal = []
		}
	}
})

export const { addOrderUniversalData, clearOrderUniversalData, addOrderUniversalFiles } = orderUniversalDataSlice.actions

export default orderUniversalDataSlice.reducer
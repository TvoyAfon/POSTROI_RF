import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrderCleaningData } from '../../../interface/createOrder.props'


interface IState {
	dataCleaning: IOrderCleaningData,
	filesCleaning: File[]
}

const initialState: IState = {
	dataCleaning: {
		taskName: '',
		place: null,
		otherPlace: '',
		square: '',
		pollution: null,
		description: '',
		telephone: '',
		address: '',
		date: '',
		payMethod: null,
		settings: {
			offers: false,
			notice: false,
			contract: false,
		},
		categoryType:''
	},
	filesCleaning: []
}

const createOrderDataCleaningSlice = createSlice({
	name: 'createOrderCleaningDataSlice',
	initialState,
	reducers: {
		addOrderCleaningData(state, action: PayloadAction<IOrderCleaningData>) {
			state.dataCleaning = { ...state.dataCleaning, ...action.payload }
		},
		addOrderCleaningFiles(state, action: PayloadAction<File[]>) {
			state.filesCleaning = action.payload
		},
		clearOrderDataCleaning(state) {
			state.filesCleaning = [],
				state.dataCleaning = {
					taskName: '',
					place: null,
					otherPlace: '',
					square: '',
					pollution: null,
					description: '',
					telephone: '',
					address: '',
					date: '',
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

export const { addOrderCleaningData, addOrderCleaningFiles,clearOrderDataCleaning } = createOrderDataCleaningSlice.actions
export default createOrderDataCleaningSlice.reducer
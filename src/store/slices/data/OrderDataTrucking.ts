import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrderTruckingData } from '../../../interface/createOrder.props'

interface IState {
	dataTrucking: IOrderTruckingData,
	filesTrucking: File[]
}

const initialState: IState = {
	dataTrucking: {
		taskName: '',
		delivery: null,
		description: '',
		parametresRadio: null,
		inputParametres: {
			length: '',
			diametr: '',
			width: '',
			height: '',
			size: ''
		},
		when: '',
		where: '',
		telephone: '',
		payMethod: null,
		settings: {
			offers: false,
			notice: false,
			contract: false,
		},
		categoryType:''
	},
	filesTrucking: []
}

const createOrderDataTruckingSlice = createSlice({
	name: 'createOrderTruckingDataSlice',
	initialState,
	reducers: {
		addOrderTruckingData(state, action: PayloadAction<IOrderTruckingData>) {
			state.dataTrucking = { ...state.dataTrucking, ...action.payload }
		},
		addOrderTruckingFiles(state, action: PayloadAction<File[]>) {
			state.filesTrucking = action.payload
		},
		clearOrderTruckingData(state) {
			state.dataTrucking = {
				taskName: '',
				delivery: null,
				description: '',
				parametresRadio: null,
				inputParametres: {
					length: '',
					diametr: '',
					width: '',
					height: '',
					size: ''
				},
				when: '',
				where: '',
				telephone: '',
				payMethod: null,
				settings: {
					offers: false,
					notice: false,
					contract: false,
				},
				categoryType:''
			},
			state.filesTrucking = []
		}
	}
})

export const { addOrderTruckingData, addOrderTruckingFiles,clearOrderTruckingData } = createOrderDataTruckingSlice.actions
export default createOrderDataTruckingSlice.reducer
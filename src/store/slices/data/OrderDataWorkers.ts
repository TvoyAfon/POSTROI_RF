import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrderWorkersData } from '../../../interface/createOrder.props'

interface IState {
	dataWorkers: IOrderWorkersData,
	filesWorkers: File[]
}

const initialState: IState = {
	dataWorkers: {
		taskName: '',
		workersType: {
			worker: false,
			loader: false
		},
		description: '',
		when: '',
		where: '',
		time: '',
		payMethod: null,
		settings: {
			calls: false,
			chat: false,
			notice: false,
		},
		categoryType: ''
	},
	filesWorkers: []
}

const createOrderWorkersDataSlice = createSlice({
	name: 'createOrderWorkersSlice',
	initialState,
	reducers: {
		addOrderWorkersData(state, action: PayloadAction<IOrderWorkersData>) {
			state.dataWorkers = { ...state.dataWorkers, ...action.payload }
		},
		addOrderWorkersFiles(state, action: PayloadAction<File[]>) {
			state.filesWorkers = action.payload
		},
		clearOrderWorkersData(state) {
			state.dataWorkers = {
				taskName: '',
				description: '',
				when: '',
				where: '',
				time: '',
				workersType: {
					worker: false,
					loader: false
				},
				payMethod: null,
				settings: {
					calls: false,
					notice: false,
					chat: false,
				},
				categoryType: ''
			},
				state.filesWorkers = []
		}
	}
}
)

export const { addOrderWorkersData, addOrderWorkersFiles, clearOrderWorkersData } = createOrderWorkersDataSlice.actions
export default createOrderWorkersDataSlice.reducer
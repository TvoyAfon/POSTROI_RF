import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IState {
	isOpenWorkerDone: boolean,
	isOpenMasterDone: boolean
}

const initialState: IState = {
	isOpenWorkerDone: false,
	isOpenMasterDone: false
}

export const openWorkerDone = createSlice({
	name: 'closeWorkerForm',
	initialState,
	reducers: {
		addOpenWorkerDone(state, action: PayloadAction<boolean>) {
			state.isOpenWorkerDone = action.payload
		},
		addOpenMasterDone(state, action: PayloadAction<boolean>) {
			state.isOpenMasterDone = action.payload
		}
	}
})

export const { addOpenWorkerDone, addOpenMasterDone } = openWorkerDone.actions
export default openWorkerDone.reducer
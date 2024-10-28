import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	globalOrderData: string
}

const initialState: IState = {
	globalOrderData: ''
}


export const orderDataTaskNameSlice = createSlice({
	name: 'orderDataTaskname',
	initialState,
	reducers: {
		addGlobalOrderDataTaskname(state, action: PayloadAction<string>) {
			state.globalOrderData = action.payload
		}
	}
})

export const { addGlobalOrderDataTaskname } = orderDataTaskNameSlice.actions
export default orderDataTaskNameSlice.reducer
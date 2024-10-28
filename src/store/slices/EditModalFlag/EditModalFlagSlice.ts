import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	clickEditFlag: boolean
}

const initialState: IState = {
	clickEditFlag: false
}

export const editModalFlagSlice = createSlice({
	name: "editFlag",
	initialState,
	reducers: {
		addClickEditFlag(state, action: PayloadAction<boolean>) {
			state.clickEditFlag = action.payload
		}
	}
})

export const { addClickEditFlag } = editModalFlagSlice.actions
export default editModalFlagSlice.reducer
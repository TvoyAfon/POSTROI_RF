import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IState {
	isOpenModalFlag: boolean
}

const initialState: IState = {
	isOpenModalFlag: false
}

export const closeModalClick = createSlice({
	name: 'closeModalClick',
	initialState,
	reducers: {
		addOpenModalClickFlag(state, action: PayloadAction<boolean>) {
			state.isOpenModalFlag = action.payload
		}
	}
})

export const { addOpenModalClickFlag } = closeModalClick.actions
export default closeModalClick.reducer

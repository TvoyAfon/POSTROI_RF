import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IState {
	isVakancy: boolean
}

const initialState: IState = {
	isVakancy: false
}

export const currentPageTypeSlice = createSlice({
	name: 'currentPageType',
	initialState,
	reducers: {
		chooseVakancyPage(state, action: PayloadAction<boolean>) {
			state.isVakancy = action.payload
		}
	}
})

export const { chooseVakancyPage } = currentPageTypeSlice.actions
export default currentPageTypeSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	isDirtyFieldForOrder: string
	isDirtyFieldForSigns: boolean
}

const initialState: IState = {
	isDirtyFieldForOrder: '',
	isDirtyFieldForSigns: false
}

export const checkDirtyFieldSlice = createSlice({
	name: 'dirtyField',
	initialState,
	reducers: {
		setDirtyFieldForOrder(state, action: PayloadAction<string>) {
			state.isDirtyFieldForOrder = action.payload
		},
		setDirtyFieldForSigns(state, action: PayloadAction<boolean>) {
			state.isDirtyFieldForSigns = action.payload
		}
	}
})

export const { setDirtyFieldForOrder, setDirtyFieldForSigns } = checkDirtyFieldSlice.actions
export default checkDirtyFieldSlice.reducer
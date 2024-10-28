import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	isActiveModal: string | null
}

const initialState: IState = {
	isActiveModal: null
}

const checkActiveModalSlice = createSlice({
	name: 'checkActiveModal',
	initialState,
	reducers: {
		setActiveModal(state, action: PayloadAction<string>) {
			state.isActiveModal = action.payload
		}
	}
})

export const { setActiveModal } = checkActiveModalSlice.actions
export default checkActiveModalSlice.reducer
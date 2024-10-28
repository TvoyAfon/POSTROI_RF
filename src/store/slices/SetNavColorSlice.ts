import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	navContainer: string
}

const initialState: IState = {
	navContainer: ''
}

export const setNavColorSlice = createSlice({
	name: 'setNavColor',
	initialState,
	reducers: {
		setColorNav(state, action: PayloadAction<string>) {
			state.navContainer = action.payload
		}
	}
})

export const { setColorNav } = setNavColorSlice.actions
export default setNavColorSlice.reducer
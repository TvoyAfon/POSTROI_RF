import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IState {
	searchRadius: number
}

const initialState: IState = {
	searchRadius: 0
}

const searchRadiusSlice = createSlice({
	name: 'searchRadius',
	initialState,
	reducers: {
		changeSearchRadius(state, action: PayloadAction<number>) {
			state.searchRadius = action.payload
		}
	}
})

export const { changeSearchRadius } = searchRadiusSlice.actions
export default searchRadiusSlice.reducer
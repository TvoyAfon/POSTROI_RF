import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IState {
	openMapCurrentCity: boolean
}

const initialState: IState = {
	openMapCurrentCity: false
}


export const modalUserLocationSlice = createSlice({
	name: 'userLocationSlice',
	initialState,
	reducers: {
		openUserLocation(state, action: PayloadAction<boolean>) {
			state.openMapCurrentCity = action.payload
		}
	}
})

export const { openUserLocation } = modalUserLocationSlice.actions
export default modalUserLocationSlice.reducer
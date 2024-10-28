import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	isOpenNavbarPopup: boolean
}

const initialState: IState = {
	isOpenNavbarPopup: false,
}

export const navbarSlice = createSlice({
	name: 'navbar', // Changed to a more descriptive name
	initialState,
	reducers: {
		setOpenNavbarPopup(state, action: PayloadAction<boolean>) {
			state.isOpenNavbarPopup = action.payload // Directly mutating state using Immer
		},
		toggleNavbarPopup(state) {
			state.isOpenNavbarPopup = !state.isOpenNavbarPopup // Toggle the value
		},
	},
})

// Export the action to be used in components
export const { setOpenNavbarPopup, toggleNavbarPopup } = navbarSlice.actions

// Export the reducer to be included in the store
export default navbarSlice.reducer
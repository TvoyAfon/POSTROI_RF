import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	isOpenConfirmModal: boolean,
	isOpenConfirmModalSigns: boolean,
	isOpenConfirmModalforAll: boolean,
	currentLocation: string,
	isLogoClick: boolean
}

const initialState: IState = {
	isOpenConfirmModal: false,
	isOpenConfirmModalSigns: false,
	isOpenConfirmModalforAll: false,
	isLogoClick: false,
	currentLocation: ''
}

export const modalConfirmSlice = createSlice({
	name: 'modalConfirmSlice',
	initialState,
	reducers: {
		openConfirmModalSearch(state, action: PayloadAction<boolean>) {
			state.isOpenConfirmModal = action.payload
		},
		openConfirmModalSigns(state, action: PayloadAction<boolean>) {
			state.isOpenConfirmModalSigns = action.payload
		},
		openConfirmModal(state, action: PayloadAction<boolean>) {
			state.isOpenConfirmModalforAll = action.payload
		},
		checkCurrentLocation(state, action: PayloadAction<string>) {
			state.currentLocation = action.payload
		},
		isLogoClickFlag(state, action: PayloadAction<boolean>) {
			state.isLogoClick = action.payload
		}
	}
})

export const { openConfirmModalSearch, openConfirmModalSigns, openConfirmModal, checkCurrentLocation, isLogoClickFlag } = modalConfirmSlice.actions

export default modalConfirmSlice.reducer
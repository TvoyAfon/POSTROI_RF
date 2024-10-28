import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IState {
	isOpenVendorAndMaterials: boolean
}

const initialState: IState = {
	isOpenVendorAndMaterials: false
}

export const createOrderVendorAndMaterialsSlice = createSlice({
	name: 'openVendorAndMaterials',
	initialState,
	reducers: {
		openVendorAndMaterials(state, action: PayloadAction<boolean>) {
			state.isOpenVendorAndMaterials = action.payload
		}
	}
})

export const { openVendorAndMaterials } = createOrderVendorAndMaterialsSlice.actions
export default createOrderVendorAndMaterialsSlice.reducer
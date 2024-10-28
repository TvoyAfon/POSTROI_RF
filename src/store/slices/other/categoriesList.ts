import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	selectedHierarchy: {
		category: '',
		subCategories: [],
		subsubCategories: [],
	},
}

const createOrderHierarchySlice = createSlice({
	name: 'createOrderHierarchy',
	initialState,
	reducers: {
		setSelectedHierarchy: (state, action) => {
			state.selectedHierarchy = action.payload
		},
		clearSelectedHierarchy: (state) => {
			state.selectedHierarchy = initialState.selectedHierarchy
		}
	},
})

export const { setSelectedHierarchy, clearSelectedHierarchy } = createOrderHierarchySlice.actions
export default createOrderHierarchySlice.reducer
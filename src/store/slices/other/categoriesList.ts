import { createSlice } from '@reduxjs/toolkit'

export interface IHierarchy {
	category1: string,
	category2: string,
	category3: string,
	category4: string,
	id: number
}


interface IState {
	selectedHierarchy: IHierarchy,
	idForFilters: string[]
}

const initialState: IState = {
	selectedHierarchy: {
		category1: '',
		category2: '',
		category3: '',
		category4: '',
		id: 0
	},
	idForFilters: []
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
		},
		setIdForFilters: (state, action) => {
			state.idForFilters = action.payload
		}
	}
})

export const { setSelectedHierarchy, clearSelectedHierarchy, setIdForFilters } = createOrderHierarchySlice.actions
export default createOrderHierarchySlice.reducer
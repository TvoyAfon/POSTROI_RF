import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	category1: string,
	category2: string[],
	category3: string[],
	category4: string[],
	id: number[] | null
}

const initialState: IState = {
	category1: 'Выберите категорию заказов',
	category2: [],
	category3: [],
	category4: [],
	id: null
}

export const categoriesForFilterSlice = createSlice({
	name: 'categoriesForFilter',
	initialState,
	reducers: {
		addCategoriesOrder(state, action: PayloadAction<IState>) {
			state.category1 = action.payload.category1
			state.category2 = action.payload.category2
			state.category3 = action.payload.category3
			state.category4 = action.payload.category4
		},
		clearCategories(state) {
			state.category1 = 'Выберите категорию заказов'
			state.category2 = []
			state.category3 = []
			state.category4 = []
		},
	}
})

export const { addCategoriesOrder, clearCategories } = categoriesForFilterSlice.actions

export default categoriesForFilterSlice.reducer
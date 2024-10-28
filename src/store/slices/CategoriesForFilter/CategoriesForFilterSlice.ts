import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	categoryOrder: string,
	subCategoryOrder: string,
}

const initialState: IState = {
	categoryOrder: 'Выберите категорию заказов',
	subCategoryOrder: '',
}

export const categoriesForFilterSlice = createSlice({
	name: 'categoriesForFilter',
	initialState,
	reducers: {
		addCategoriesOrder(state, action: PayloadAction<IState>) {
			state.categoryOrder = action.payload.categoryOrder
			state.subCategoryOrder = action.payload.subCategoryOrder
		},
	}
})

export const { addCategoriesOrder } = categoriesForFilterSlice.actions

export default categoriesForFilterSlice.reducer
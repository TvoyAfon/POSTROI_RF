import { PayloadAction, createSlice } from '@reduxjs/toolkit'


interface IState {
	categoryName: string,
	subCategoryName: string
}

const initialState: IState = {
	categoryName: '',
	subCategoryName: ''
}

const createOrderCategoriesSlice = createSlice({
	name: 'createOrderCategoriesSlice',
	initialState,
	reducers: {
		changeCategoryName: (state, action: PayloadAction<string>) => {
			state.categoryName = action.payload
		},
		changesubCategoryName: (state, action: PayloadAction<string>) => {
			state.subCategoryName = action.payload
		},
	}
})

export const { changeCategoryName, changesubCategoryName } = createOrderCategoriesSlice.actions
export default createOrderCategoriesSlice.reducer
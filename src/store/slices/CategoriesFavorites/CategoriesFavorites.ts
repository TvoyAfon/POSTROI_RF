import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SubCategory {
	id: number // Пример поля для идентификатора подкатегории
	name: string
	subsubcategories?: SubSubCategory[]
}

interface SubSubCategory {
	id: number
	name: string | null
}

export interface Category {
	id: number
	name: string
	subCategories: SubCategory[]
}

interface FavoritesState {
	categories: Category[]
}

const initialState: FavoritesState = {
	categories: [],
}

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavoriteCategory: (state, action: PayloadAction<Category>) => {
			const newCategory = action.payload

			// Check if the category with the same name already exists
			const existingCategoryIndex = state.categories.findIndex(category => category.name === newCategory.name)

			if (existingCategoryIndex !== -1) {
				// The category exists, let's check for the subcategory
				newCategory.subCategories.forEach(newSubCategory => {
					const existingSubCategoryIndex = state.categories[existingCategoryIndex].subCategories.findIndex(
						subCat => subCat.name === newSubCategory.name
					)

					if (existingSubCategoryIndex !== -1) {
						// The subcategory exists, check for subsubcategories
						const existingSubCategory = state.categories[existingCategoryIndex].subCategories[existingSubCategoryIndex]
						const existingIds = new Set(existingSubCategory.subsubcategories?.map(sub => sub.id))

						newSubCategory.subsubcategories?.forEach(newSubSubCategory => {
							if (!existingIds.has(newSubSubCategory.id)) {
								existingSubCategory.subsubcategories?.push(newSubSubCategory)
								existingIds.add(newSubSubCategory.id) // Avoid duplicates
							}
						})
					} else {
						// The subcategory does not exist, add it
						state.categories[existingCategoryIndex].subCategories.push(newSubCategory)
					}
				})
			} else {
				// The category does not exist, let's add it
				state.categories.push(newCategory)
			}
		},

		clearFavorites: (state) => {
			state.categories = []
		},
	},
})

export const { addFavoriteCategory, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
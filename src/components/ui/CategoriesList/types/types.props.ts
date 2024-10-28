import { CSSProperties } from 'react'

export interface ICategoriesList {
	onCategorySelect?: (currentCategory: string, subCategory: string, subsubsection?: string) => void
	isFilter: boolean
	isAddFavorites?: boolean
	setSelectedHierarchy?: React.Dispatch<React.SetStateAction<{
		category: string; subCategories: string[]; subsubCategories: string[]
	}>>
	selectedHierarchy?: {
		category: string
		subCategories: string[]
		subsubCategories: string[]
	},
	style?: CSSProperties,
	styleCat?: CSSProperties
	styleSub?: CSSProperties
	styleSubSub?: CSSProperties,
	isCreateOrder?: boolean,
	isSigns?: boolean

}

export interface selectedCategory {
	title: string
	subcategories: SubCategory[]
}

interface SubCategory {
	title: string
	sections: SubSubCategory[]
}

interface SubSubCategory {
	title: string
}
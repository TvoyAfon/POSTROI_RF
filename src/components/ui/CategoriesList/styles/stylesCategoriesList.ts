import { CSSProperties } from 'react'

export const categoriesStyles: CSSProperties = {
	fontSize: 16, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
}



export const subCategoriesStyles: CSSProperties = {
	...categoriesStyles
}

export const buttonStyleForCatList: CSSProperties = {
	backgroundColor: '#282930', color: 'white', borderRadius: 8, padding: 6, height: 'auto'
}
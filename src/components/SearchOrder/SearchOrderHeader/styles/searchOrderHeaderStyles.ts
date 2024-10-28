import { CSSProperties } from 'react'

export const currentCategoryStyles: CSSProperties = {
	cursor: 'pointer', backgroundColor: '#231F20', color: '#fff', padding: 8, borderRadius: 12, width: 250, height: 40, display: 'flex', gap: 4, alignItems: 'center'
}

export const filterStyles: CSSProperties = {
	position: 'absolute', borderRadius: '50%', backgroundColor: '#7099ED', width: 20, color: 'white', right: -20, top: -10, fontSize: 14, padding: 2
}

export const spanStyles: CSSProperties = {
	fontWeight: 600, textOverflow: 'ellipsis', width: 250, whiteSpace: 'nowrap', overflow: 'hidden', display: 'block', cursor: 'pointer'
}

export const stylesForFilter: CSSProperties = {
	position: 'absolute', borderRadius: '50%', width: 20, height: 20, backgroundColor: "#7099ED", right: -12, top: -13, fontSize: 12, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'
}
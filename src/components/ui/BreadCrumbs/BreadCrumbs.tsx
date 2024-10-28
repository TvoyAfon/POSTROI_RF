import React, { CSSProperties } from 'react'

interface BreadCrumbs {
	category: string,
	subCategory?: string,
	subsubCategory?: string,
	subsubsubCategory?: string,
	style?: CSSProperties
}

const BreadCrumbs: React.FC<BreadCrumbs> = ({ category, subCategory, subsubCategory, subsubsubCategory, style }) => {
	const categories = [
		category,
		subCategory,
		subsubCategory,
		subsubsubCategory,
	]
	const existingCategories = categories.filter(Boolean)

	return (
		<div style={{ position: 'absolute', top: -40, left: 0, ...style }}>
			<span style={{ color: 'gray' }} >{existingCategories.join(' / ')}</span>
		</div>
	)
}

export default BreadCrumbs

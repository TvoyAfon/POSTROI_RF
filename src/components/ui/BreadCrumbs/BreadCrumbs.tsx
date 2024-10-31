import React, { CSSProperties } from 'react'

interface BreadCrumbs {
	category1: string,
	category2?: string,
	category3?: string,
	category4?: string,
	style?: CSSProperties
}

const BreadCrumbs: React.FC<BreadCrumbs> = ({ category1, category2, category3, category4, style }) => {
	const categories = [
		category1,
		category2,
		category3,
		category4,
	]
	const existingCategories = categories.filter(Boolean)

	return (
		<div style={{ position: 'absolute', top: -40, left: 0, ...style }}>
			<span style={{ color: 'gray' }} >{existingCategories.join(' / ')}</span>
		</div>
	)
}

export default BreadCrumbs

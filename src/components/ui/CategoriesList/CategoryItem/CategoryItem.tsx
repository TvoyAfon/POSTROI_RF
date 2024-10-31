import React, { CSSProperties } from 'react'
import caret from '../../../../assets/images/navbar/caret-up-solid 1 (4).svg'
import { categoriesStyles } from '../styles/stylesCategoriesList'


interface ICategoryItem {
	style?: CSSProperties,
	handleClick: () => void,
	className: string,
	categoryName: string,
	isCaret?: boolean
}

const CategoryItem: React.FC<ICategoryItem> = ({ categoryName, className, handleClick, style, isCaret = true }) => {
	return (
		<div
			style={style}
			onClick={handleClick}
			className={className}>
			<span style={categoriesStyles}>{categoryName}</span>
			{isCaret ? <img src={caret} alt="caret" /> : null}
		</div>
	)
}

export default CategoryItem

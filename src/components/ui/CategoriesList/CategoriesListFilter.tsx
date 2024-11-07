import React, { CSSProperties, SetStateAction, useState } from 'react'
import { SubCategory } from '../../../hooks/categoryList/types'
import { useGetCategoryList } from '../../../hooks/categoryList/useGetCategoryList'
import CheckboxButton from '../CheckboxButton/CheckboxButton'
import styles from './CategoriesList.module.scss'
import CategoryItem from './CategoryItem/CategoryItem'
import { buttonStyleForCatList } from './styles/stylesCategoriesList'
import { ISelectedCategories } from './types/types.props'

interface ICategoriesListFilter {
	style?: CSSProperties,
	setCurrentCategories: React.Dispatch<SetStateAction<ISelectedCategories>>,
	currentCategories: ISelectedCategories
}

const CategoriesListFilter: React.FC<ICategoriesListFilter> = ({ style, setCurrentCategories, currentCategories }) => {

	const categories = useGetCategoryList()
	const [currentSubSection, setCurrentSubSection] = useState<SubCategory[]>([])
	const [currentSubSubSection, setCurrentSubSubSection] = useState<SubCategory[]>([])
	const [currentSubSubSubSection, setCurrentSubSubSubSection] = useState<SubCategory[]>([])

	const handleClickCategoryLvl1 = (catId: number, catName: string, subCategory: SubCategory[]) => {

		setCurrentCategories(prev => ({
			...prev,
			selectedId: [catId],
			category1: catName
		}))

		setCurrentSubSection(subCategory)
		setCurrentSubSubSection([])
		setCurrentSubSubSubSection([])
	}

	const handleClickCategoryLvl2 = (subCategory: SubCategory[], catName: string, catId: number) => {
		setCurrentSubSubSection(subCategory)
		setCurrentSubSubSubSection([])

		setCurrentCategories(prev => ({
			...prev,
			category2: [catName],
			selectedId: [catId]
		}))
	}

	const handleClickCategoryLvl3 = (subCategory: SubCategory[], catName: string, catId: number) => {
		setCurrentSubSubSubSection(subCategory)

		setCurrentCategories(prev => ({
			...prev,
			selectedId: [catId],
			category3: [catName]
		}))

	}

	const handleCheckBoxClick = (catId: number, catName: string, level: number) => {
		if (!currentCategories?.selectedId) return
		if (level === 2) {
			setCurrentCategories(prev => ({
				...prev,
				selectedId: [...currentCategories!.selectedId, catId],
				category2: [...prev.category2, catName]
			}))
		}
		if (level === 3) {

			setCurrentCategories(prev => ({
				...prev,
				selectedId: [...currentCategories.selectedId, catId],
				category3: [...prev.category3, catName]
			}))
		}
		if (level === 4) {
			setCurrentCategories(prev => ({
				...prev,
				selectedId: [...currentCategories.selectedId, catId],
				category4: [...prev.category4, catName]
			}))
		}

	}
	const isChecked = (catName: string, level: number) => {
		if (currentCategories.selectedId) return
		if (level === 2 && currentCategories.category2.includes(catName)) {
			return true
		}
		if (level === 3 && currentCategories.category3.includes(catName)) {
			return true
		}
		if (level === 4 && currentCategories.category4.includes(catName)) {
			return true
		}
	}

	const getStyleForCategory = (catName: string, currentCat: string) => {
		if (!currentCat) return
		if (catName === currentCat) {
			return { ...buttonStyleForCatList }
		}
	}
	return (
		<div style={style} className={styles['navbar_popup']}>
			<div className={styles['navbar_popup_content']}>
				<div className={styles['navbar_popup_content_categories']}>
					<section>
						{categories && categories.map(category => (
							<CategoryItem
								key={category.id}
								isCaret={true}
								style={getStyleForCategory(category.category, currentCategories?.category1)}
								categoryName={category.category}
								className={styles['categories_categoryFilter']}
								handleClick={() => handleClickCategoryLvl1(category.id, category.category, category.sub_category)}
							/>
						))}
					</section>
				</div>
				<div className={styles['navbar_popup_content_categories_subcategories']}>
					{currentSubSection.map(sub => (
						<>
							{sub && sub.sub_category.length > 0 ?
								<CategoryItem
									key={sub.id}
									style={getStyleForCategory(sub.category, currentCategories.category2[0])}
									isCaret={true}
									categoryName={sub.category}
									className={styles['categories_categoryFilter']}
									handleClick={() => handleClickCategoryLvl2(sub.sub_category, sub.category, sub.id)}
								/> :
								<CheckboxButton
									checked={isChecked(sub.category, sub.level)}
									onClick={() => handleCheckBoxClick(sub.id, sub.category, sub.level)}
									label={sub.category} />
							}
						</>
					))}
				</div>
				<div className={styles['navbar_popup_content_categories_subcategories_sub']}>
					{currentSubSubSection.map(subsub => (
						<>
							{
								subsub && subsub.sub_category.length > 0 ?
									<CategoryItem
										key={subsub.id}
										style={getStyleForCategory(subsub.category, currentCategories.category3[0])}
										categoryName={subsub.category}
										className={styles['categories_categoryFilter']}
										handleClick={() => handleClickCategoryLvl3(subsub.sub_category, subsub.category, subsub.id)}
									/> :
									<CheckboxButton
										checked={isChecked(subsub.category, subsub.level)}
										onClick={() => handleCheckBoxClick(subsub.id, subsub.category, subsub.level)}
										label={subsub.category} />
							}
						</>
					))}
				</div>
				<div
					style={{ width: 100, whiteSpace: 'nowrap', overflow: 'hidden' }}
					className={styles['navbar_popup_content_categories_subcategories_sub']}>
					{
						currentSubSubSubSection.map(subsubsub => (
							<CheckboxButton
								checked={isChecked(subsubsub.category, subsubsub.level)}
								onClick={() => handleCheckBoxClick(subsubsub.id, subsubsub.category, subsubsub.level)}
								label={subsubsub.category} />
						))
					}
				</div>
			</div>
		</div>
	)
}

export default CategoriesListFilter

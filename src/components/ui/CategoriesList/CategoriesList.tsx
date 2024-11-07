import React, { CSSProperties, useEffect, useState } from 'react'
import { SubCategory } from '../../../hooks/categoryList/types'
import { useGetCategoryList } from '../../../hooks/categoryList/useGetCategoryList'
import { IHierarchy } from '../../../store/slices/other/categoriesList'
import styles from './CategoriesList.module.scss'
import CategoryItem from './CategoryItem/CategoryItem'
import { buttonStyleForCatList } from './styles/stylesCategoriesList'

interface ICategoriesList {
	style?: CSSProperties,
	handleSetCategories?: (updatedHierarchy: IHierarchy) => void,
	handleSetFilters?: () => void,
	selectedHierachy?: IHierarchy
}

const CategoriesList: React.FC<ICategoriesList> = ({ style, handleSetCategories }) => {
	const categories = useGetCategoryList()
	/* Рендерим список категорий */
	const [currentCategory, setCurrentCategory] = useState('') /* lvl 1*/
	const [currentSubCategory, setCurrentSubCategory] = useState('') /* lvl2 */
	const [currentSubSubCategory, setCurrentSubSubCategory] = useState('') /* lvl3 */
	const [currentSubSubSubCategory, setCurrentSubSubSubCategory] = useState('')  /* lvl4 */
	const [currentSubSection, setCurrentSubSection] = useState<SubCategory[]>([])
	const [currentSubSubSection, setCurrentSubSubSection] = useState<SubCategory[]>([])
	const [currentSubSubSubSection, setCurrentSubSubSubSection] = useState<SubCategory[]>([])

	const [id, setId] = useState<number[]>([]) /* CREATE ORDER */

	const handleClickCategoryLvl1 = (category: string, subCategory: SubCategory[], idLvl1: number) => {

		setCurrentCategory(category)
		setCurrentSubSection(subCategory)
		setCurrentSubSubSection([])
		setCurrentSubSubSubSection([])

		setId([idLvl1])
	}
	const handleClickCategoryLvl2 = (subCategory: SubCategory[], subCategoryName: string, idLvl2: number) => {
		setCurrentSubSubSection(subCategory)
		setCurrentSubCategory(subCategoryName)
		setCurrentSubSubSubSection([])

		setId([id[0], idLvl2])

		console.log(id)
	}
	const handleClickCategoryLvl3 = (subsubsubCategory: SubCategory[], subsubsubCategoryName: string, idLvl3: number) => {
		setCurrentSubSubSubSection(subsubsubCategory)
		setCurrentSubSubCategory(subsubsubCategoryName)

		setId([id[0], id[1], idLvl3])
	}

	const handleClickCategoryLvl4 = (subsubsubsubCategoryName: string, idLvl4: number) => {
		setCurrentSubSubSubCategory(subsubsubsubCategoryName)
		setId([id[0], id[1], id[2], idLvl4])
	}

	const getStyle = (categoryId: number, index: number) => {
		if (id[index] === categoryId) {
			return { ...buttonStyleForCatList }
		}
	}

	useEffect(() => {
		handleSetCategories && handleSetCategories({
			category1: currentCategory,
			category2: currentSubCategory,
			category3: currentSubSubCategory,
			category4: currentSubSubSubCategory,
			id: id[id.length - 1]
		})
	}, [currentCategory, currentSubCategory, currentSubSubCategory, currentSubSubSubCategory, id])

	return (
		<div style={style} className={styles['navbar_popup']}>
			<div className={styles['navbar_popup_content']}>
				<div className={styles['navbar_popup_content_categories']}>
					<section>
						{categories && categories.map(category => (
							<CategoryItem
								isCaret={true}
								key={category.id}
								style={getStyle(category.id, category.level - 1)!}
								categoryName={category.category}
								className={styles['categories_categoryFilter']}
								handleClick={() => handleClickCategoryLvl1(category.category, category.sub_category, category.id)}
							/>
						))}
					</section>
				</div>
				<div className={styles['navbar_popup_content_categories_subcategories']}>
					{currentSubSection.map(sub => (
						<CategoryItem
							key={sub.id}
							isCaret={sub && sub.sub_category.length > 0 ? true : false}
							style={getStyle(sub.id, sub.level - 1)!}
							categoryName={sub.category}
							className={styles['categories_categoryFilter']}
							handleClick={() => handleClickCategoryLvl2(sub.sub_category, sub.category, sub.id)}
						/>
					))}
				</div>
				<div className={styles['navbar_popup_content_categories_subcategories_sub']}>
					{currentSubSubSection.map(subsub => (
						<CategoryItem
							key={subsub.id}
							isCaret={subsub.sub_category.length > 0 ? true : false}
							style={getStyle(subsub.id, subsub.level - 1)!}
							categoryName={subsub.category}
							className={styles['categories_categoryFilter']}
							handleClick={() => handleClickCategoryLvl3(subsub.sub_category, subsub.category, subsub.id)}
						/>
					))}
				</div>
				<div
					style={{ overflow: 'hidden' }}
					className={styles['navbar_popup_content_categories_subcategories_sub']}>
					{
						currentSubSubSubSection.map(subsubsub => (
							<CategoryItem
								key={subsubsub.id}
								isCaret={false}
								style={getStyle(subsubsub.id, subsubsub.level - 1)!}
								categoryName={subsubsub.category}
								className={styles['categories_categoryFilter']}
								handleClick={() => handleClickCategoryLvl4(subsubsub.category, subsubsub.id)} />
						))
					}
				</div>
			</div>
		</div>
	)
}

export default CategoriesList
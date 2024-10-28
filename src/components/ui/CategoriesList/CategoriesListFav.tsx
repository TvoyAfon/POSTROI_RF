import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import caret from '../../../assets/images/navbar/caret-up-solid 1 (4).svg'
import { RootState } from '../../../store/store'
import { categoriesWithSubSections } from '../../SearchOrder/SearchOrderHeader/SearchOrderModal/categoriesWithSub'
import CheckboxButton from '../CheckboxButton/CheckboxButton'
import styles from './CategoriesList.module.scss'
import { buttonStyleForCatList, categoriesStyles, subCategoriesStyles } from './styles/stylesCategoriesList'

export interface ISelectedCategory {
	title: string
	subcategories?: SubCategory[]
}

interface SubCategory {
	title: string
	sections: SubSubCategory[]
}

interface SubSubCategory {
	title: string
}

const CategoriesListFav: React.FC<{ handleSetSelectedHierarchy: (selectedHierarchy: any) => void }> = ({ handleSetSelectedHierarchy }) => {

	const { selectedHierarchy } = useSelector((state: RootState) => state.createOrderHierarchySlice)

	const [currentCat, setCurrentCat] = useState<string>(selectedHierarchy.category || '')
	const [currentSubSection, setCurrentSubSection] = useState<SubCategory[]>([])
	const [currentSubSubSection, setCurrentSubSubSection] = useState<SubSubCategory[]>([])
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]) // Список выбранных категорий
	const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(selectedHierarchy.subCategories || []) // Список выбранных подкатегорий
	const [selectedSubSubCategories, setSelectedSubSubCategories] = useState<string[]>(selectedHierarchy.subsubCategories || []) // Список выбранных подподкатегорий


	const handleClickCategory = (category: ISelectedCategory) => {
		setCurrentCat(category.title)
		if (category.subcategories) {
			setCurrentSubSection(category.subcategories)
		}
		setCurrentSubSubSection([])

		// Добавление или удаление выбранной категории
		setSelectedCategories(prev =>
			prev.includes(category.title) ? prev.filter(title => title !== category.title) : [...prev, category.title]
		)

	}

	const handleClickSubCategory = (subCategory: SubCategory) => {
		setCurrentSubSubSection(subCategory.sections)

		// Добавление или удаление выбранной подкатегории
		setSelectedSubCategories(prev =>
			prev.includes(subCategory.title) ? prev.filter(title => title !== subCategory.title) : [...prev, subCategory.title]
		)
	}

	const handleClickSubSubCategory = (subSubCategory: SubSubCategory) => {
		// Добавление или удаление выбранной подподкатегории
		setSelectedSubSubCategories(prev =>
			prev.includes(subSubCategory.title) ? prev.filter(title => title !== subSubCategory.title) : [...prev, subSubCategory.title]
		)
	}

	const getCategoryStyle = (categoryTitle: string) => currentCat === categoryTitle ? { ...buttonStyleForCatList } : {}



	useEffect(() => {
		handleSetSelectedHierarchy({
			category: currentCat,
			subCategories: selectedSubCategories,
			subsubCategories: selectedSubSubCategories,
		})
	}, [selectedCategories, selectedSubCategories, selectedSubSubCategories])

	return (
		<div className={styles['navbar_popup']}>
			<div className={styles['navbar_popup_content']}>
				<div className={styles['navbar_popup_content_categories']}>
					<section>
						{categoriesWithSubSections.map((category, index) => (
							<div
								style={getCategoryStyle(category.title)}
								onClick={() => handleClickCategory(category)}
								className={styles['categories_categoryFilter']}
								key={index}
							>
								<span style={categoriesStyles}>{category.title}</span>
								<img src={caret} alt="caret" />
							</div>
						))}
					</section>
				</div>
				<div className={styles['navbar_popup_content_categories_subcategories']}>
					{currentSubSection.map((subCategory, index) => (
						<div key={index}>
							{subCategory.sections.length > 0 ? (
								<div

									onClick={() => handleClickSubCategory(subCategory)}
									className={styles['categories_subCategoryFilter']}
								>
									<span style={subCategoriesStyles}>{subCategory.title}</span>
									<img src={caret} alt="caret" />
								</div>
							) : (
								<CheckboxButton
									label={subCategory.title}
									checked={selectedSubCategories.includes(subCategory.title)}
									onChange={() => handleClickSubCategory(subCategory)}
								/>
							)}
						</div>
					))}
				</div>
				<div className={styles['navbar_popup_content_categories_subcategories_sub']}>
					{currentSubSubSection.map((subSubCategory, index) => (
						<div key={index} className={styles['categories_subsubCategoryFilter']}>
							<CheckboxButton
								label={subSubCategory.title}
								checked={selectedSubSubCategories.includes(subSubCategory.title)}
								onChange={() => handleClickSubSubCategory(subSubCategory)}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default CategoriesListFav
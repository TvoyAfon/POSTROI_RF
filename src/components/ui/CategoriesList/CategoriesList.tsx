import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import caret from '../../../assets/images/navbar/caret-up-solid 1 (4).svg'
import { RootState } from '../../../store/store'
import { categoriesWithSubSections } from '../../SearchOrder/SearchOrderHeader/SearchOrderModal/categoriesWithSub'
import CheckboxButton from '../CheckboxButton/CheckboxButton'
import styles from './CategoriesList.module.scss'
import { buttonStyleForCatList, categoriesStyles, subCategoriesStyles } from './styles/stylesCategoriesList'
import { ICategoriesList } from './types/types.props'

const CategoriesList: React.FC<ICategoriesList> = ({
	onCategorySelect,
	isFilter,
	isAddFavorites = false,
	isCreateOrder = false,
	isSigns = false,
	setSelectedHierarchy,
	selectedHierarchy,
	style,
}) => {
	const { categories } = useSelector((state: RootState) => state.favCategories)

	const [currentCat, setCurrentCat] = useState<string>(selectedHierarchy?.category || '')
	const [currentSubSection, setCurrentSubSection] = useState<any[]>([])
	const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(selectedHierarchy?.subCategories || [])
	const [currentSubSubSection, setCurrentSubSubSection] = useState<any[]>([])
	const [selectedSubsubCategories, setSelectedSubsubCategories] = useState<string[]>(selectedHierarchy?.subsubCategories || [])


	const { data } = useSelector((state: RootState) => state.createOrderData)
	const { dataSigns } = useSelector((state: RootState) => state.signsData)

	const handleCategoryClick = (category: any) => {
		setCurrentCat(category.title)
		setCurrentSubSection(category.subcategories)

		if (isAddFavorites) {
			setSelectedHierarchy && setSelectedHierarchy({
				category: currentCat,
				subCategories: selectedSubCategories,
				subsubCategories: selectedSubsubCategories
			})
		}
		setSelectedSubCategories([])
		setCurrentSubSubSection([])
	}



	const isSavedCategory = (categoryLocal: string): boolean => {
		return categories.some(category => category.name === categoryLocal)
	}

	const isSavedSubCategory = (subCategoryLocal: string): boolean => {
		return categories.some(category => category.subCategories.some(subcat => subcat.name === subCategoryLocal))
	}

	const isSavedSubSubCategory = (subsubCategoryLocal: string): boolean => {
		return categories.some(category =>
			category.subCategories.some(sub => sub.subsubcategories?.some(subsub => subsub.name === subsubCategoryLocal))
		)
	}
	const handleSubCategoryChange = useCallback((subCategory: any) => {
		const hasSubSubCategories = subCategory.sections && subCategory.sections.length > 0

		setSelectedSubCategories(prev => {
			const isSelected = prev.includes(subCategory.title)
			if (isSelected) {
				setSelectedSubsubCategories(currentSubs =>
					currentSubs.filter(sub => !subCategory.sections.includes(sub))
				)
				return prev.filter(item => item !== subCategory.title)
			} else {
				const newSubCategories = isCreateOrder ? [subCategory.title] : [...prev, subCategory.title]
				if (hasSubSubCategories) {
					setCurrentSubSubSection(subCategory.sections)
				}
				return newSubCategories
			}
		})
	}, [isCreateOrder])


	const handleSubCategoryClick = (subCategory: any) => {

		setCurrentSubSubSection(subCategory.sections)

		setSelectedSubCategories((prevSelected) => {
			if (prevSelected.includes(subCategory.title)) {

				return prevSelected.filter(sub => sub !== subCategory.title)
			} else {

				return [subCategory.title]
			}
		})
	}

	const handleSubSubCategoryClick = useCallback((subsubCat: any) => {
		setSelectedSubsubCategories(prevSelected =>
			prevSelected.includes(subsubCat) ?
				prevSelected.filter(sub => sub !== subsubCat.title) :
				[subsubCat]
		)
	}, [])

	const handleSubsubCategoryChange = useCallback((subsubCategory: any) => {
		const isSelected = selectedSubsubCategories.includes(subsubCategory)

		setSelectedSubsubCategories(prev => {
			if (isSelected) {
				return prev.filter(item => item !== subsubCategory)
			} else {
				return isCreateOrder ? [subsubCategory] : [...prev, subsubCategory]
			}
		})
	}, [isCreateOrder, selectedSubsubCategories])
	useEffect(() => {
		if (currentCat) {
			onCategorySelect && onCategorySelect(currentCat, selectedSubCategories.join(', '), selectedSubsubCategories.join(', '))

			setSelectedHierarchy && setSelectedHierarchy({
				category: currentCat,
				subCategories: selectedSubCategories,
				subsubCategories: selectedSubsubCategories,
			})

		}
	}, [currentCat, selectedSubCategories, selectedSubsubCategories])



	const getCategoryStyle = (categoryTitle: string) => {
		if (isAddFavorites && isSavedCategory(categoryTitle)) {
			return { ...buttonStyleForCatList }
		}
		if (currentCat === categoryTitle) {
			return { ...buttonStyleForCatList }
		}
		if (isCreateOrder && data.categoryType === categoryTitle) {
			return { ...buttonStyleForCatList }
		}
		if (isSigns && dataSigns.categoryType === categoryTitle) {
			return { ...buttonStyleForCatList }
		}
		return {}
	}

	const getSubCategoryStyle = (subCategoryTitle: string) => {
		if (isAddFavorites && isSavedSubCategory(subCategoryTitle)) {
			return { ...buttonStyleForCatList }
		}
		if (selectedSubCategories.includes(subCategoryTitle))
			return { ...buttonStyleForCatList }
		if (isCreateOrder && data.subCategoryType === subCategoryTitle) {
			return { ...buttonStyleForCatList }
		}
		if (isSigns && dataSigns.subCategoryType === subCategoryTitle) {
			return { ...buttonStyleForCatList }
		}
	}

	const getSubSubCategoryStyle = (subsubCat: string) => {
		if (selectedSubsubCategories.includes(subsubCat)) {
			return { ...buttonStyleForCatList }
		}
		if (isCreateOrder && data.subsubCategoryType === subsubCat) {
			return { ...buttonStyleForCatList }
		}
	}

	// Render categories
	return (
		<div style={style} className={styles['navbar_popup']}>
			<div className={styles['navbar_popup_content']}>
				<div className={styles['navbar_popup_content_categories']}>
					<section>
						{categoriesWithSubSections.map((category, index) => (
							<div
								onClick={() => handleCategoryClick(category)}
								style={getCategoryStyle(category.title)}
								className={styles[!isFilter ? 'navbar_popup_content_categories_category' : 'categories_categoryFilter']}
								key={index}>
								<span style={isFilter ? categoriesStyles : { fontWeight: 400, fontSize: 14 }}>
									{category.title}
								</span>
								<img src={caret} alt="caret" />
							</div>
						))}
					</section>
				</div>
				<div className={styles['navbar_popup_content_categories_subcategories']}>
					{currentSubSection.map((subCategory, index) => {
						const hasSubSubCategories = subCategory.sections && subCategory.sections.length > 0
						const subCategoryStyle = getSubCategoryStyle(subCategory.title)
						return (
							<div key={index} >
								{hasSubSubCategories ? (
									<div
										onClick={() => hasSubSubCategories && handleSubCategoryClick(subCategory)}
										style={subCategoryStyle}
										className={styles[!isFilter ? 'navbar_popup_content_subcategory' : 'categories_subCategoryFilter']}>
										<span style={isFilter ? subCategoriesStyles : undefined}>{subCategory.title}</span>
										<img src={caret} alt="caret" />
									</div>
								) : (
									<>
										{!isCreateOrder ? <CheckboxButton
											onChange={() => handleSubCategoryChange(subCategory)}
											checked={isAddFavorites ? isSavedSubCategory(subCategory.title) : data.subCategoryType === subCategory.title}
											label={subCategory.title} /> :
											<span
												onClick={() => handleSubCategoryClick(subCategory)}
												style={{ ...subCategoryStyle, fontWeight: 300, cursor: 'pointer' }}>{subCategory.title}</span>
										}
									</>
								)}
							</div>
						)
					})}
				</div>
				<div className={styles['navbar_popup_content_categories_subcategories_sub']}>
					{currentSubSubSection.map((subSubCategory, index) => (
						<div
							key={index}
							className={styles[!isFilter ? 'navbar_popup_content_subcategory' : 'categories_subsubCategoryFilter']}>
							<>
								{!isCreateOrder ?
									<CheckboxButton
										checked={isAddFavorites ? isSavedSubSubCategory(subSubCategory.title) : data.subsubCategoryType === subSubCategory.title}
										onClick={() => handleSubsubCategoryChange(subSubCategory.title)}
										label={subSubCategory.title} /> :

									<span
										style={getSubSubCategoryStyle(subSubCategory.title)}
										onClick={() => handleSubSubCategoryClick(subSubCategory.title)}>{subSubCategory.title}</span>}
							</>

						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default CategoriesList
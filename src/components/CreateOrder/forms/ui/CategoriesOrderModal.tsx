import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import solid_bottom from '../../../../assets/images/other/caret-bottom-solid.svg'
import { useModal } from '../../../../hooks/useModal'
import { addOrderData } from '../../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { setSelectedHierarchy } from '../../../../store/slices/other/categoriesList'
import { setDirtyFieldForOrder } from '../../../../store/slices/other/checkDirtyField'
import { addSignsData } from '../../../../store/slices/Signs/dataSigns/DataSignsSlice'
import { RootState } from '../../../../store/store'
import BreadCrumbs from '../../../ui/BreadCrumbs/BreadCrumbs'
import Button from '../../../ui/Button/Button'
import CategoriesList from '../../../ui/CategoriesList/CategoriesList'
import { categoriesStyles } from '../../../ui/CategoriesList/styles/stylesCategoriesList'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../ui/Modal/ModalContainer'
import { flexRow } from '../styles/stylesCreateOrder'


const CategoriesOrderModal: React.FC<{ isOrder: boolean }> = ({ isOrder }) => {
	const { handleClose, handleOpen, isOpen } = useModal()

	const dispatch = useDispatch()
	const { data } = useSelector((state: RootState) => state.createOrderData)
	const { dataSigns } = useSelector((state: RootState) => state.signsData)
	const { selectedHierarchy } = useSelector((state: RootState) => state.createOrderHierarchySlice)

	const handleSetSelectedHierarchy = (updatedHierarchy: any) => {
		dispatch(setSelectedHierarchy(updatedHierarchy))
		dispatch(setDirtyFieldForOrder(updatedHierarchy))
	}

	const handleApply = () => {
		if (selectedHierarchy.category) {
			if (isOrder) {
				dispatch(addOrderData({
					...data,
					categoryType: selectedHierarchy.category,
					subCategoryType: selectedHierarchy.subCategories[0],
					subsubCategoryType: selectedHierarchy.subsubCategories[0]
				}))
			}
			else {
				dispatch(addSignsData({
					...dataSigns,
					categoryType: selectedHierarchy.category,
					subCategoryType: selectedHierarchy.subCategories[0],
					subsubCategoryType: selectedHierarchy.subsubCategories[0]
				}))
			}
			handleClose()
		}
	}

	return (
		<>
			{isOpen &&
				<ModalContainer
					zIndex={11}
					isOnOverlay={true}
					style={{ position: 'fixed', width: 1190, height: 660 }}>
					<div className='flex-column gap-medium'>
						<BreadCrumbs
							style={{ position: 'absolute', top: 75, left: 32 }}
							category={selectedHierarchy.category}
							subCategory={selectedHierarchy.subCategories[0]}
							subsubCategory={selectedHierarchy.subsubCategories[0]}
						/>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span style={{ paddingBottom: 48 }} className='textSizeL'>Подкатегория заказа</span>
							<CloseButton onClick={handleClose} />
						</div>
						<CategoriesList
							setSelectedHierarchy={handleSetSelectedHierarchy}
							style={{ height: 440, padding: '15px 0px' }}
							isCreateOrder={true}
							isFilter={true} />
						<Button
							onClick={handleApply}
							style={{ width: '10%' }}>Выбрать</Button>
					</div>
				</ModalContainer>}
			<div className='flex-column '>
				<div
					onClick={handleOpen}
					style={{ ...flexRow, cursor: 'pointer' }}>
					<span className='textSizeM'>Выберите категорию</span>
					<img src={solid_bottom} alt="caret" />
				</div>
				<span style={categoriesStyles}></span>
			</div>
		</>
	)
}

export default CategoriesOrderModal

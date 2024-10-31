import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import solid_bottom from '../../../../assets/images/other/caret-bottom-solid.svg'
import { useModal } from '../../../../hooks/useModal'
import { addOrderData } from '../../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { IHierarchy, setSelectedHierarchy } from '../../../../store/slices/other/categoriesList'
import { setDirtyFieldForOrder } from '../../../../store/slices/other/checkDirtyField'
import { addSignsData } from '../../../../store/slices/Signs/dataSigns/DataSignsSlice'
import { RootState } from '../../../../store/store'
import BreadCrumbs from '../../../ui/BreadCrumbs/BreadCrumbs'
import Button from '../../../ui/Button/Button'
import CategoriesListFilter from '../../../ui/CategoriesList/CategoriesListFilter'
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

	const handleSetSelectedHierarchy = (updatedHierarchy: IHierarchy) => {
		dispatch(setSelectedHierarchy(updatedHierarchy))
		dispatch(setDirtyFieldForOrder(updatedHierarchy.category1))
	}
	console.log(handleSetSelectedHierarchy)

	useEffect(() => {
		console.log(selectedHierarchy)
	}, [selectedHierarchy])

	const handleApply = () => {
		if (selectedHierarchy.category1) {
			if (isOrder) {
				dispatch(addOrderData({
					...data,
					category1: selectedHierarchy.category1,
					category2: selectedHierarchy.category2,
					category3: selectedHierarchy.category3,
					category4: selectedHierarchy.category4,
					categoryId: selectedHierarchy.id
				}))
			}
			else {
				dispatch(addSignsData({
					...dataSigns,
					categoryType: selectedHierarchy.category1,
					subCategoryType: selectedHierarchy.category2,
					subsubCategoryType: selectedHierarchy.category3
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
					style={{ position: 'fixed', width: 1190, height: 560 }}>
					<div className='flex-column gap-medium'>
						<BreadCrumbs
							style={{ position: 'absolute', top: 75, left: 32 }}
							category1={selectedHierarchy.category1}
							category2={selectedHierarchy.category2}
							category3={selectedHierarchy.category3}
							category4={selectedHierarchy.category4}
						/>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span style={{ paddingBottom: 48 }} className='textSizeL'>Подкатегория заказа</span>
							<CloseButton onClick={handleClose} />
						</div>
						<CategoriesListFilter />
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

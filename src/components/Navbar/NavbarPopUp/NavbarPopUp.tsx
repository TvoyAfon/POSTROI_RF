import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES_NAVBAR } from '../../../routes/routes'
import { addOrderData } from '../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { setSelectedHierarchy } from '../../../store/slices/other/categoriesList'
import { toggleNavbarPopup } from '../../../store/slices/other/openNavbarPopup'
import { setColorNav } from '../../../store/slices/SetNavColorSlice'
import { RootState } from '../../../store/store'
import Button from '../../ui/Button/Button'
import CategoriesList from '../../ui/CategoriesList/CategoriesList' // Importing the CategoriesList component
import CloseButton from '../../ui/CloseButton/CloseButton'
import ModalContainer from '../../ui/Modal/ModalContainer'

interface INavbarPopUp {
	onClose?: () => void
}

const NavbarPopUp: React.FC<INavbarPopUp> = () => {
	const nav = useNavigate()
	const dispatch = useDispatch()
	const { selectedHierarchy } = useSelector((state: RootState) => state.createOrderHierarchySlice)
	const { data } = useSelector((state: RootState) => state.createOrderData)

	const handleApply = () => {
		if (!selectedHierarchy && !data.categoryType) return
		dispatch(setColorNav(''))
		dispatch(toggleNavbarPopup())
		nav(ROUTES_NAVBAR.createOrder)
	}

	useEffect(() => {
		dispatch(addOrderData({
			...data,
			categoryType: selectedHierarchy.category,
			subCategoryType: selectedHierarchy.subCategories[0],
			subsubCategoryType: selectedHierarchy.subsubCategories[0]
		}))

		console.log(data.categoryType)

	}, [selectedHierarchy, dispatch])

	const handleClose = () => {
		dispatch(toggleNavbarPopup())
	}

	const handleSetSelectedHierarchy = (updatedHierarchy: any) => {
		dispatch(setSelectedHierarchy(updatedHierarchy))

	}

	return (
		<ModalContainer
			style={{ width: '100%', position: 'fixed', height: 450, top: 295, borderRadius: 0 }}
			zIndex={11}
			isOnOverlay
		>
			<CloseButton
				onClick={handleClose}
				style={{ position: 'absolute', right: 100 }}
			/>
			<CategoriesList
				isCreateOrder={true}
				isFilter={false}
				selectedHierarchy={selectedHierarchy}
				setSelectedHierarchy={handleSetSelectedHierarchy} />
			<Button
				onClick={handleApply}
				style={{ position: 'absolute', right: 100 }}>
				Подтвердить
			</Button>
		</ModalContainer>
	)
}

export default NavbarPopUp
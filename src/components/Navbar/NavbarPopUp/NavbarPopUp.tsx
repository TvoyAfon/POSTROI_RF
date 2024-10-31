import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES_NAVBAR } from '../../../routes/routes'
import { addOrderData } from '../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { IHierarchy, setSelectedHierarchy } from '../../../store/slices/other/categoriesList'
import { toggleNavbarPopup } from '../../../store/slices/other/openNavbarPopup'
import { setColorNav } from '../../../store/slices/SetNavColorSlice'
import { RootState } from '../../../store/store'
import Button from '../../ui/Button/Button'
import CategoriesList from '../../ui/CategoriesList/CategoriesList'
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
		if (!selectedHierarchy) return
		dispatch(addOrderData({
			...data,
			category1: selectedHierarchy.category1,
			category2: selectedHierarchy.category2,
			category3: selectedHierarchy.category3,
			category4: selectedHierarchy.category4,
			categoryId: selectedHierarchy.id

		}))
		dispatch(setColorNav(''))
		dispatch(toggleNavbarPopup())
		nav(ROUTES_NAVBAR.createOrder)
	}

	const handleClose = () => {
		dispatch(toggleNavbarPopup())
	}

	const handleSetSelectedHierarchy = (updatedHierarchy: IHierarchy) => {
		dispatch(setSelectedHierarchy(updatedHierarchy))

	}
	console.log(handleSetSelectedHierarchy)

	useEffect(() => {
		console.log(selectedHierarchy)
	}, [selectedHierarchy])
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
				selectedHierachy={selectedHierarchy}
				handleSetCategories={handleSetSelectedHierarchy}
			/>
			<Button
				onClick={handleApply}
				style={{ position: 'absolute', right: 100 }}>
				Подтвердить
			</Button>
		</ModalContainer>
	)
}

export default NavbarPopUp
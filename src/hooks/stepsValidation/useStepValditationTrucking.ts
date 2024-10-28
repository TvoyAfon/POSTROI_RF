import { useDispatch, useSelector } from 'react-redux'
import { changeTruckingStep } from '../../store/slices/categories/CreateOrderTruckingSlice'
import { openModal } from '../../store/slices/FormSlice/FormSlice'
import { RootState } from '../../store/store'

export const useStepValidationTrucking = () => {
	const dispatch = useDispatch()
	const { dataTrucking } = useSelector((state: RootState) => state.createOrderTruckingData)
	const stepTrucking = useSelector((state: RootState) => state.createOrderTrucking)
	const { user } = useSelector((state: RootState) => state.auth)

	return () => {
		if (stepTrucking.stepComponentNumber === 7 && user) {
			return true
		}
	
		if (dataTrucking.taskName.length !== 0 && stepTrucking.stepComponentNumber === 1) {

			dispatch(changeTruckingStep(stepTrucking.stepComponentNumber + 1))
			return false
		}
		if (dataTrucking.delivery !== null && stepTrucking.stepComponentNumber === 2) {
			dispatch(changeTruckingStep(stepTrucking.stepComponentNumber + 1))
			return false
		}
		if (dataTrucking.description.length !== 0 && dataTrucking.parametresRadio !== null && stepTrucking.stepComponentNumber === 3) {
			dispatch(changeTruckingStep(stepTrucking.stepComponentNumber + 1))
			return false
		}
		if (dataTrucking.inputParametres.width.length !== 0 && dataTrucking.inputParametres.height.length !== 0 && dataTrucking.inputParametres.length.length !== 0 && dataTrucking.inputParametres.size.length !== 0 && stepTrucking.stepComponentNumber === 3) {
			dispatch(changeTruckingStep(stepTrucking.stepComponentNumber + 1))
			return false
		}
		if (dataTrucking.where.length !== 0 && dataTrucking.telephone.length > 2 && dataTrucking.telephone.length > 11 && dataTrucking.when.length !== 0 && stepTrucking.stepComponentNumber === 4) {
			dispatch(changeTruckingStep(stepTrucking.stepComponentNumber + 1))
			return false
		}
		if (dataTrucking.payMethod !== null && stepTrucking.stepComponentNumber === 5) {
			dispatch(changeTruckingStep(stepTrucking.stepComponentNumber + 1))
			return false
		}
		if (stepTrucking.stepComponentNumber === 6 || stepTrucking.stepComponentNumber === 7 && user !== null) {
			dispatch(changeTruckingStep(stepTrucking.stepComponentNumber + 1))
		} else if (stepTrucking.stepComponentNumber === 6 || stepTrucking.stepComponentNumber === 7 && user === null) {
			dispatch(openModal('authModal'))
			return false
		}

		if (stepTrucking.stepComponentNumber === 7 && user !== null) {
			/*const photo = filesTrucking.find(el => el.type.startsWith('image/'))
			dispatch(createTruckingCard({
				...dataTrucking,
				files: filesTrucking,
				prewievPhoto: photo ? photo : null,
				where: dataTrucking.where
			}))*/
			return true
		}

		return false
	}
}
import { useDispatch, useSelector } from 'react-redux'
import { changeCleaningStep } from '../../store/slices/categories/CreateOrderCleaning'
import { openModal } from '../../store/slices/FormSlice/FormSlice'
import { RootState } from '../../store/store'

export const useStepValidationCleaning = () => {

	const dispatch = useDispatch()
	const { dataCleaning } = useSelector((state: RootState) => state.createOrderCleaningData)
	const stepCleaning = useSelector((state: RootState) => state.createOrderCleaning)
	const { user } = useSelector((state: RootState) => state.auth)
	const { globalOrderData } = useSelector((state: RootState) => state.globalOrderDatataskname)

	return (): boolean => {
		if (stepCleaning.stepComponentNumber === 7 && user) {
			console.log('ok888')
			return true
		}

		if (globalOrderData.length !== 0 && stepCleaning.stepComponentNumber === 1) {
			dispatch(changeCleaningStep(stepCleaning.stepComponentNumber + 1))
			console.log('ok1')

			return false
		}
		if (dataCleaning.place !== null && stepCleaning.stepComponentNumber === 2) {
			dispatch(changeCleaningStep(stepCleaning.stepComponentNumber + 1))
			console.log('ok2')
			return false
		}
		if (dataCleaning.otherPlace.length !== 0 && dataCleaning.place === 'other' && stepCleaning.stepComponentNumber === 2) {         /*фикс*/
			dispatch(changeCleaningStep(stepCleaning.stepComponentNumber + 1))
			console.log('ok3')
			return false
		}
		if (dataCleaning.square.length !== 0 && stepCleaning.stepComponentNumber === 3 && dataCleaning.pollution !== null && dataCleaning.description.length !== 0) {
			dispatch(changeCleaningStep(stepCleaning.stepComponentNumber + 1))
			console.log('ok4')
			return false
		}
		if (dataCleaning.telephone.length > 2 && dataCleaning.telephone.length > 11 && dataCleaning.address.length !== 0 && dataCleaning.date.length !== 0 && stepCleaning.stepComponentNumber === 4) {
			dispatch(changeCleaningStep(stepCleaning.stepComponentNumber + 1))
			console.log('ok5')
			return false
		}
		if (dataCleaning.payMethod !== null && stepCleaning.stepComponentNumber === 5) {
			dispatch(changeCleaningStep(stepCleaning.stepComponentNumber + 1))
			console.log('ok6')
			return false
		}
		if (stepCleaning.stepComponentNumber === 6 || stepCleaning.stepComponentNumber === 7 && user !== null) {
			dispatch(changeCleaningStep(stepCleaning.stepComponentNumber + 1))
			console.log('ok666')
			return false
		} else if (stepCleaning.stepComponentNumber === 6 || stepCleaning.stepComponentNumber === 7 && user === null) {
			dispatch(openModal('authModal'))
			console.log('ok7')
			return false
		}

		if (stepCleaning.stepComponentNumber === 7 && user !== null) {
			/*const photo = filesCleaning.find(el => el.type.startsWith('image/'))
			dispatch(createCleaningCard({
				...dataCleaning,
				prewievPhoto: photo ? photo : null,
				files: filesCleaning,
				where: dataCleaning.address
			}))*/
			console.log('true 8')
			return true
		}

		console.log('ok9')
		return false
	}
}
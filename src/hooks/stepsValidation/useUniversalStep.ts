import { useDispatch, useSelector } from 'react-redux'
import { changeUniversalStep } from '../../store/slices/categories/CreateOrderUniversal'
import { openModal } from '../../store/slices/FormSlice/FormSlice'
import { RootState } from '../../store/store'

export const useStepValidationUniversal = () => {
	const stepUniversal = useSelector((state: RootState) => state.createOrderUniversal)
	const dispatch = useDispatch()
	const { dataUniversal } = useSelector((state: RootState) => state.createOrderUniversalData)
	const { globalOrderData } = useSelector((state: RootState) => state.globalOrderDatataskname)
	const { user } = useSelector((state: RootState) => state.auth)


	return () => {
		if (globalOrderData.length !== 0 && stepUniversal.stepComponentNumber === 1) {
			dispatch(changeUniversalStep(stepUniversal.stepComponentNumber + 1))
		}

		if (dataUniversal.description.length !== 0 && stepUniversal.stepComponentNumber === 2) {
			dispatch(changeUniversalStep(stepUniversal.stepComponentNumber + 1))
		}

		if (dataUniversal.address.length !== 0 &&
			dataUniversal.date.length !== 0 &&
			dataUniversal.phone.length > 2 &&
			dataUniversal.phone.length > 11 &&
			stepUniversal.stepComponentNumber === 3) {
			dispatch(changeUniversalStep(stepUniversal.stepComponentNumber + 1))
		}

		if (dataUniversal.paymethod !== null && stepUniversal.stepComponentNumber === 4) {
			dispatch(changeUniversalStep(stepUniversal.stepComponentNumber + 1))
		}

		if (stepUniversal.stepComponentNumber === 5) {
			dispatch(changeUniversalStep(stepUniversal.stepComponentNumber + 1))
		}

		if (stepUniversal.stepComponentNumber === 6) {
			if (user === null) {
				dispatch(openModal('authModal'))
			} else {
				dispatch(changeUniversalStep(stepUniversal.stepComponentNumber + 1))
			}
		}
	}
}

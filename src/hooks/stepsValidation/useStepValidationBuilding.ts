import { useDispatch, useSelector } from 'react-redux'
import { changeStep } from '../../store/slices/CreateOrder/form/CreateOrderForm'
import { openModal } from '../../store/slices/FormSlice/FormSlice'
import { RootState } from '../../store/store'

export const useStepValidationBuilding = () => {
	const dispatch = useDispatch()
	const step = useSelector((state: RootState) => state.createOrder)
	const { user } = useSelector((state: RootState) => state.auth)
	const { data } = useSelector((state: RootState) => state.createOrderData)

	return () => {
		if (step.stepComponentNumber === 6 && user) {
			return true

		}
		if (step.stepComponentNumber === 1 && data.category1.length !== 0 && data.taskName.length !== 0) {
			dispatch(changeStep(step.stepComponentNumber + 1))

		}
		if (data.description.length !== 0 && step.stepComponentNumber === 2) {
			dispatch(changeStep(step.stepComponentNumber + 1))
			return false
		}

		if (data.address.length !== 0 && data.date.length !== 0 && data.telephone.length !== 0 && step.stepComponentNumber === 3) {
			dispatch(changeStep(step.stepComponentNumber + 1))
			return false
		}
		if (data.paymethod !== null && step.stepComponentNumber === 4) {
			dispatch(changeStep(step.stepComponentNumber + 1))
			return false
		}

		if (step.stepComponentNumber === 5 || step.stepComponentNumber === 6 && user !== null) {
			dispatch(changeStep(step.stepComponentNumber + 1))
			return false
		} else if (step.stepComponentNumber === 5 || step.stepComponentNumber === 6 && user === null) {
			dispatch(openModal('authModal'))
			return false
		}

		return false
	}
}
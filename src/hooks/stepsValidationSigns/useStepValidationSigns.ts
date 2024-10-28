import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../store/slices/FormSlice/FormSlice'
import { changeSignsStep } from '../../store/slices/Signs/stepSigns/signsSlice'
import { RootState } from '../../store/store'

export const useStepValidationSigns = () => {
	const dispatch = useDispatch()
	const stepSigns = useSelector((state: RootState) => state.signsReducer)
	const { user } = useSelector((state: RootState) => state.auth)

	const { dataSigns } = useSelector((state: RootState) => state.signsData)

	return () => {
		if (dataSigns.taskName.length !== 0 && stepSigns.stepComponentNumber === 1) {
			dispatch(changeSignsStep(stepSigns.stepComponentNumber + 1))
		}

		if (dataSigns.address.length !== 0 && dataSigns.experience.length !== 0 && dataSigns.price.length !== 0 && stepSigns.stepComponentNumber === 2) {
			dispatch(changeSignsStep(stepSigns.stepComponentNumber + 1))
		}
		if (dataSigns.description.length !== 0 && stepSigns.stepComponentNumber === 3) {
			dispatch(changeSignsStep(stepSigns.stepComponentNumber + 1))
		}

		if (dataSigns.telephone && dataSigns.telephone.length > 11 && dataSigns.email && dataSigns.email.includes('@') && dataSigns.email.length > 3 && dataSigns.communication !== null && stepSigns.stepComponentNumber === 4) {
			dispatch(changeSignsStep(stepSigns.stepComponentNumber + 1))
		}

		if (stepSigns.stepComponentNumber === 5 && user !== null) {
			dispatch(changeSignsStep(stepSigns.stepComponentNumber + 1))
		} else if (stepSigns.stepComponentNumber === 5 && user === null)
			return dispatch(openModal('authModal'))
	}
}
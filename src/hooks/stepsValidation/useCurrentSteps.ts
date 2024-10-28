import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export const useCurrentSteps = () => {

	const step = useSelector((state: RootState) => state.createOrder)
	if (step.stepComponentNumber === 6) return true
}
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'


export const useCreateOrderDone = () => {
	const step = useSelector((state: RootState) => state.createOrder)
	const stepSigns = useSelector((state: RootState) => state.signsReducer)

	if (step.stepComponentNumber === 7) return true
	if (stepSigns.stepComponentNumber === 6) return true
}
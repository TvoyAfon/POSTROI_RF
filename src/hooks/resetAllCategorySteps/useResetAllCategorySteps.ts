import { useDispatch } from 'react-redux'
import { resetAllSignsSteps } from '../../store/slices/Signs/stepSigns/signsSlice'



export const useResetAllCategorySteps = () => {
	const dispatch = useDispatch()

	return () => {
		dispatch(resetAllSignsSteps())

	}
}
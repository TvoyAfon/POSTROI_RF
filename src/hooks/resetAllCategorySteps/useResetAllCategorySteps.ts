import { useDispatch } from 'react-redux'
import { resetAllSignsSteps } from '../../store/slices/Signs/stepSigns/signsSlice'
import { resetAllCleaningSteps } from '../../store/slices/categories/CreateOrderCleaning'
import { resetAllMaterialsSteps } from '../../store/slices/categories/CreateOrderMaterials'
import { resetAllServiceSteps } from '../../store/slices/categories/CreateOrderServices'
import { resetAllTruckingSteps } from '../../store/slices/categories/CreateOrderTruckingSlice'
import { resetAllUniversalStep } from '../../store/slices/categories/CreateOrderUniversal'
import { resetAllWorkersSteps } from '../../store/slices/categories/CreateOrderWorkers'


export const useResetAllCategorySteps = () => {
	const dispatch = useDispatch()

	return () => {
		dispatch(resetAllCleaningSteps())
		dispatch(resetAllTruckingSteps())
		dispatch(resetAllServiceSteps())
		dispatch(resetAllSignsSteps())
		dispatch(resetAllWorkersSteps())
		dispatch(resetAllMaterialsSteps())
		dispatch(resetAllUniversalStep())
	}
}
import { useDispatch, useSelector } from 'react-redux'
import { Categories, SubsectionsByTruckingAndServices, SubsectionsByWorkers } from '../../../common/categories'
import { changeCleaningStep } from '../../../store/slices/categories/CreateOrderCleaning'
import { changeMaterialsStep } from '../../../store/slices/categories/CreateOrderMaterials'
import { changeServiceStep } from '../../../store/slices/categories/CreateOrderServices'
import { changeTruckingStep } from '../../../store/slices/categories/CreateOrderTruckingSlice'
import { changeWorkersStep } from '../../../store/slices/categories/CreateOrderWorkers'
import { changeStep } from '../../../store/slices/CreateOrder/form/CreateOrderForm'
import { RootState } from '../../../store/store'

export const useChangeStepToDone = () => {
	const dispatch = useDispatch()
	const step = useSelector((state: RootState) => state.createOrder)
	const stepTrucking = useSelector((state: RootState) => state.createOrderTrucking)
	const stepServices = useSelector((state: RootState) => state.createOrderServices)
	const stepCleaning = useSelector((state: RootState) => state.createOrderCleaning)
	const stepMaterials = useSelector((state: RootState) => state.createOrderMaterials)
	const stepWorkers = useSelector((state: RootState) => state.createOrderWorkers)
	const { categoryName, subCategoryName } = useSelector((state: RootState) => state.createOrderCategories)

	return () => {
		return {
			[Categories.Building]: () => dispatch(changeStep(step.stepComponentNumber + 1)),
			[Categories.Cleaning]: () => dispatch(changeCleaningStep(stepCleaning.stepComponentNumber + 1)),
			[Categories.Materials]: () => dispatch(changeMaterialsStep(stepMaterials.stepComponentNumber + 1)),
			[Categories.TRUCKINGANDSERVCES]: () => {
				if (subCategoryName === SubsectionsByTruckingAndServices.CARS) {
					dispatch(changeServiceStep(stepServices.stepComponentNumber + 1))
				}
				else if (subCategoryName === SubsectionsByTruckingAndServices.TRUCKING) {
					dispatch(changeTruckingStep(stepTrucking.stepComponentNumber + 1))
				}
			},
			[Categories.WORKERSANDSPEC]: () => {
				if (subCategoryName === SubsectionsByWorkers.WORKERS) {
					dispatch(changeWorkersStep(stepWorkers.stepComponentNumber + 1))
				}
			}
		}[categoryName]
	}
}
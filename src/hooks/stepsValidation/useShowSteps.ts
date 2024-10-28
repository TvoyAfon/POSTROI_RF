import { useSelector } from 'react-redux'
import { Categories, SubsectionsByTruckingAndServices } from '../../common/categories'
import { RootState } from '../../store/store'

export const useShowSteps = (categoryName: string, subCategoryName: string) => {
	const step = useSelector((state: RootState) => state.createOrder)
	const stepTrucking = useSelector((state: RootState) => state.createOrderTrucking)
	const stepServices = useSelector((state: RootState) => state.createOrderServices)
	const stepCleaning = useSelector((state: RootState) => state.createOrderCleaning)
	const stepMaterials = useSelector((state: RootState) => state.createOrderMaterials)
	const stepWorkers = useSelector((state: RootState) => state.createOrderWorkers)
	const stepUniversal = useSelector((state: RootState) => state.createOrderUniversal)

	const universalCategories = [
		Categories.BuildExpertise,
		Categories.Geo,
		Categories.ProjectAndDesign,
		Categories.Rent
	]

	return () => {
		switch (categoryName) {
			case Categories.Building:
				return step.stepComponentNumber
				
			case Categories.TRUCKINGANDSERVCES:
				if (subCategoryName === SubsectionsByTruckingAndServices.CARS) {
					return stepServices.stepComponentNumber
				} else if (subCategoryName === SubsectionsByTruckingAndServices.TRUCKING) {
					return stepTrucking.stepComponentNumber
				}
				return null // Возврат значения по умолчанию для подкатегорий

			case Categories.Cleaning:
				return stepCleaning.stepComponentNumber

			case Categories.Materials:
				return stepMaterials.stepComponentNumber

			case Categories.WORKERSANDSPEC:
				return stepWorkers.stepComponentNumber

			default:
				if (universalCategories.includes(categoryName as Categories)) {
					return stepUniversal.stepComponentNumber
				}
				return null // Возврат значения по умолчанию, если категория неизвестна
		}
	}
}
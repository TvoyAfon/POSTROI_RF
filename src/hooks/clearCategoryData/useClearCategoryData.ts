import { useDispatch } from 'react-redux'
import { Categories } from '../../common/categories'
import { clearOrderData } from '../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { clearOrderDataCleaning } from '../../store/slices/data/OrderDataCleaning'
import { clearOrderDataMaterials } from '../../store/slices/data/OrderDataMaterials'
import { clearOrderServicesData } from '../../store/slices/data/OrderDataServices'
import { clearOrderTruckingData } from '../../store/slices/data/OrderDataTrucking'
import { clearOrderWorkersData } from '../../store/slices/data/OrderDataWorkers'
import { clearOrderUniversalData } from '../../store/slices/data/OrderUniversalData'

export const useClearCategoryData = (categoryName: string) => {

	const dispatch = useDispatch()
	const universalCategories = [
		Categories.BuildExpertise,
		Categories.Geo,
		Categories.Rent,
		Categories.ProjectAndDesign
	]

	return () => {

		switch (categoryName) {
			case 'Строительство и ремонт':
				dispatch(clearOrderData())
				break
			case 'Грузоперевозки':
				dispatch(clearOrderTruckingData())
				break
			case 'Услуги и спецтехника':
				dispatch(clearOrderServicesData())
				break
			case 'Клининг':
				dispatch(clearOrderDataCleaning())
				break
			case 'Стройматериалы':
				dispatch(clearOrderDataMaterials())
				break
			case 'Разнорабочие':
				dispatch(clearOrderWorkersData())
				break

			default:
				if (universalCategories.includes(categoryName as Categories)) {
					dispatch(clearOrderUniversalData())
				}
		}
	}
}

import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export const useOrderTaskName = () => {
	const { categoryName } = useSelector((state: RootState) => state.createOrderCategories)

	if (categoryName === 'Строительство и ремонт') return

}
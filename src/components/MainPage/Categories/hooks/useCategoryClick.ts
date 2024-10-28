import { useDispatch } from 'react-redux'
import { changeCategoryName } from '../../../../store/slices/CreateOrderCategoriesSlice'
import { setColorNav } from '../../../../store/slices/SetNavColorSlice'



export const useCategoryClick = () => {
	const dispatch = useDispatch()

	return (categoryName: string) => {
		dispatch(setColorNav(categoryName))
		dispatch(changeCategoryName(categoryName))

	}
}
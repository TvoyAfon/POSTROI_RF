import { useDispatch } from 'react-redux'
import { clearSignsData } from '../../store/slices/Signs/dataSigns/DataSignsSlice'


export const useClearAllCategoryData = () => {

	const dispatch = useDispatch()

	return () => {

		dispatch(clearSignsData())
	}
}
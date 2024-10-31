import { useQuery } from 'react-query'
import { categoryListService } from '../../services/order/categoryList'
import { ICategoryList } from './types'

export const useGetCategoryList = () => {

	const { data } = useQuery({
		queryKey: ['categoryList'],
		queryFn: () => categoryListService.getCategoryList(),
		refetchOnReconnect: false,
		refetchOnWindowFocus: false
	})

	return data as ICategoryList[]
}
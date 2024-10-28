import { FC } from 'react'
import Tab from '../../../ui/Tabs/Tab'
import { ICategory } from './data'

interface CategoryProps extends ICategory {
	isSelected: boolean
	onClick: () => void
}

const Category: FC<CategoryProps> = ({ isSelected, onClick, name }) => {
	return (
		<Tab isSelected={isSelected} variant='gray' onClick={onClick}>
			{name}
		</Tab>
	)
}

export default Category
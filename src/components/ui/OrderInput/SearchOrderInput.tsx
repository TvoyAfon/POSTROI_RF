import React from 'react'
import glass from '../../../assets/images/other/search-01.svg'
import { ISearchOrderInput } from '../../../interface/searchInput.props'
import styles from './SearchOrderInput.module.scss'

const SearchOrderInput: React.FC<ISearchOrderInput> = ({
	placeholder = '         Поиск заказов',
	value,
	onChange,
	width,
	style }) => {
	return (
		<input className={styles.input} value={value} onChange={onChange} style={{
			width: width,
			height: 40,
			borderRadius: 8,
			backgroundImage: !value ? `url(${glass})` : '',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: '4%,3%',
			backgroundColor: '#F4F3F1',
			...style
		}} type="text" placeholder={placeholder} />
	)
}

export default SearchOrderInput

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderData } from '../../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { RootState } from '../../../../store/store'
import CheckboxButton from '../../../ui/CheckboxButton/CheckboxButton'
import Tooltip from '../../../ui/Tooltip/Tooltip'
import { flexRow } from '../styles/stylesCreateOrder'
import OffersRating from './OffersRating'

const CheckBoxOffers: React.FC<{ onClick: () => void, value: boolean }> = ({ onClick, value }) => {
	const [open, setOpen] = useState(value)
	const dispatch = useDispatch()
	const { data } = useSelector((state: RootState) => state.createOrderData)

	const handleClick = () => {
		setOpen(!open)
		onClick()
	}

	const handleClickCurrentRating = (rating: number) => {
		dispatch(addOrderData({
			...data, offersRating: rating
		}))
	}

	return (
		<div className='flex-column'>
			<div style={flexRow}>
				<CheckboxButton
					checked={value}
					onClick={handleClick}
					label='Хотите получать отклики от специалистов с хорошим рейтингом?' /><Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			{open && <div>
				<OffersRating
					ratingRedux={data.offersRating!}
					handleClickCurrentRating={handleClickCurrentRating} />
			</div>}
		</div>
	)
}

export default CheckBoxOffers

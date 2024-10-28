import { FC, useMemo } from 'react'
import ratingStarChecked from '../../../../assets/images/profile/rating-star-checked.svg'
import ratingStar from '../../../../assets/images/profile/rating-star.svg'

export const MAX_RATING_VALUE = 5

interface IRating {
	rating?: number
	label?: string
}

const Rating: FC<IRating> = ({ rating = 0, label = '' }) => {
	const disabledStarsQty = useMemo(() => MAX_RATING_VALUE - rating, [rating])

	return (
		<div>
			<span style={{
				fontWeight: 300,
				fontSize: '16px',
			}}>{label}</span>
			<div style={{
				display: 'flex',
				gap: '5px',
				marginTop: '5px'
			}}>
				{
					[...Array(rating)].map((_, index) => (
						<img src={ratingStarChecked} alt="" key={index} />
					))
				}
				{
					[...Array(disabledStarsQty)].map((_, index) => (
						<img src={ratingStar} alt="" key={index} />
					))
				}
			</div>
		</div>
	)
}

export default Rating
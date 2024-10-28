import React from 'react'
import Line from '../../../ui/Line/Line'
import { flexRow, stylesOffersRating } from '../styles/stylesCreateOrder'

const OffersRating: React.FC<{ handleClickCurrentRating: (rating: number) => void, ratingRedux: number }> = ({ handleClickCurrentRating, ratingRedux }) => {
	const ratingArray = [5, 4, 3, 2, 1].reverse()

	return (
		<div style={{ position: 'relative' }} >
			<div style={{ ...flexRow, paddingLeft: 20 }}>
				{ratingArray.map((rating, index) => (
					<div
						onClick={() => handleClickCurrentRating(rating)}
						key={index}
						style={{
							...stylesOffersRating,
							backgroundColor: ratingRedux && rating <= ratingRedux ? '#7099ED' : '#8E8E93' // изменяем цвет фона
						}}>
						{rating}
					</div>
				))}
			</div>
			<Line style={{ position: 'absolute', bottom: 0, left: 20, border: '2px solid #8E8E93' }} lineWidth='160px' />
		</div>
	)
}

export default OffersRating
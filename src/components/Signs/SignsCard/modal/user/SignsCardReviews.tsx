import React from 'react'
import reviews from '../../../../../assets/images/signs/rewievs.svg'

const SignsCardReviews: React.FC<{ reviewsCount: string }> = ({ reviewsCount }) => {
	return (
		<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
			<img src={reviews} alt="reviews" />
			<span style={{ fontWeight: 800 }}>{reviewsCount}</span>
			<span style={{ fontWeight: 800 }}>отзывов</span>
		</div>
	)
}

export default SignsCardReviews

import { FC, useMemo } from 'react'
import { IStar } from '../types'
import styles from './ReviewsRating.module.scss'
import Star from './Star'

interface IReviewsRating {
	stars: IStar[]
	className?: string
}

const ReviewsRating: FC<IReviewsRating> = ({ stars, className = '' }) => {
	const reviewsTotalCount = useMemo(() => {
		let count = 0
		stars.forEach(star => count += star.numberOfReviews)
		return count
	}, [stars])

	return (
		<div className={`${styles.rating} ${className}`}>
			{
				stars.map(star => (
					<Star {...star} reviewsTotalCount={reviewsTotalCount} />
				))
			}
		</div>
	)
}

export default ReviewsRating
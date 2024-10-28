import { FC, useMemo } from 'react'
import ratingStarChecked from '../../../../../../assets/images/profile/rating-star-checked.svg'
import { IStar } from '../types'
import styles from './ReviewsRating.module.scss'

interface StarProps extends IStar {
	reviewsTotalCount: number
}

const Star: FC<StarProps> = ({ reviewsTotalCount, stars, numberOfReviews }) => {
	const percentage = useMemo(() => (numberOfReviews / reviewsTotalCount) * 100, [numberOfReviews, reviewsTotalCount])

	return (
		<div className={styles['rating__star']}>
			<div style={{
				display: 'flex',
				gap: '8px',
				fontSize: '20px',
				fontWeight: 600
			}}>
				<img src={ratingStarChecked} alt="" />
				<span style={{ marginTop: '3px' }}>{stars}</span>
			</div>
			<div style={{ width: '100%' }}>
				{
					numberOfReviews
						?
						<div className={styles['rating__progress']} style={{
							width: `${percentage}%`
						}}></div>
						: <></>
				}
			</div>
			<span style={{
				fontWeight: 700,
				marginTop: '4px'
			}}>{numberOfReviews}</span>
		</div>
	)
}

export default Star
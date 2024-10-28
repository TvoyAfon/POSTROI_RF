import { useState } from 'react'
import arrowDownIcon from '../../../../../../assets/images/mainpage_images/caret-up-solid 1.png'
import arrowUpIcon from '../../../../../../assets/images/profile/arrow-up.svg'
import ratingStarChecked from '../../../../../../assets/images/profile/rating-star-checked.svg'
import IconButton from '../../../../../ui/IconButton/IconButton'
import Review from '../../../../UserProfile/ProfileComponents/Reviews/Review'
import ReviewsRating from '../../../../UserProfile/ProfileComponents/Reviews/ReviewsRating/ReviewsRating'
import { reviews, services, stars } from '../../../../UserProfile/ProfileComponents/Reviews/data'
import IconSignature from '../../../../ui/IconSignature'
import Tab from '../../../../ui/Tabs/Tab'
import Tabs from '../../../../ui/Tabs/Tabs'

const Reviews = () => {
	const [isRatingOpen, setIsRatingOpen] = useState<boolean>(false)

	return (
		<>
			<Tabs style={{
				gap: '16px'
			}}>
				{
					services.map(service => (
						<Tab variant='inline' key={service.key}>
							{service.name}
						</Tab>
					))
				}
			</Tabs>
			<div>
				<IconSignature icon={ratingStarChecked} signatureStyle={{
					fontSize: '20px',
					fontWeight: 700,
					gap: '8px',
					display: 'flex'
				}}>
					<span style={{fontWeight:600}}>4,3</span>
					<IconButton icon={isRatingOpen ? arrowUpIcon : arrowDownIcon} onClick={() => setIsRatingOpen(!isRatingOpen)} />
				</IconSignature>
			</div>
			{
				isRatingOpen
				&&
				<ReviewsRating stars={stars} />
			}
			{
				reviews.map(review => (
					<Review {...review} style={{
						background: 'transparent'
					}} />
				))
			}
		</>
	)
}

export default Reviews
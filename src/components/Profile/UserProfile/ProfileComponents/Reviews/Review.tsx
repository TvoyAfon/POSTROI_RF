import { CSSProperties, FC } from 'react'
import Button from '../../../../ui/Button/Button'
import Rating from '../../../MyProfile/ui/Rating'
import styles from './Reviews.module.scss'
import { IReviewItem } from './types'

interface IReview extends IReviewItem {
	onReply?: () => void
	style?: CSSProperties
}

const Review: FC<IReview> = ({ clientName, category, content, images, rating, price, style = {}, onReply }) => {
	return (
		<div className={styles.review} style={style}>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '12px'
			}}>
				<Rating rating={rating} />
				<span style={{
					color: '#8E8E93',
					fontWeight: 300
				}}>19 марта 2024</span>
			</div>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '16px'
			}}>
				<span style={{
					fontSize: '20px',
					fontWeight: 600
				}}>{clientName}</span>
				<span style={{
					color: '#8E8E93'
				}}>{category}</span>
				<span style={{
					color: '#262626'
				}}>{content}</span>
				<span style={{
					color: '#8E8E93'
				}}>Стоимость работ</span>
				<span style={{
					color: '#262626'
				}}>{price} руб</span>
				<div style={{
					display: 'flex',
					gap: '24px'
				}}>
					{
						images.map(img => (
							<img src={img} alt="" style={{
								width: '78px',
								height: '78px',
								borderRadius: '6px'
							}} />
						))
					}
				</div>
				<Button onClick={onReply} style={{
					marginLeft: 'auto',
					minWidth: '180px'
				}}>Ответить</Button>
			</div>

		</div>
	)
}

export default Review
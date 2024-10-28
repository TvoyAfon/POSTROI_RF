import { useState } from 'react'
import caret from '../../../../../assets/images/other/caret-bottom-solid.svg'
import ratingStarChecked from '../../../../../assets/images/profile/rating-star-checked.svg'
import { useModal } from '../../../../../hooks/useModal'
import ReplyModal from '../../../../ui/Modal/ReplyModal'
import IconSignature from '../../../ui/IconSignature'
import Tab from '../../../ui/Tabs/Tab'
import Tabs from '../../../ui/Tabs/Tabs'
import { reviews, services, stars } from './data'
import Review from './Review'
import styles from './Reviews.module.scss'
import ReviewsRating from './ReviewsRating/ReviewsRating'

const Reviews = () => {
	const [selectedTab, setSelectedTab] = useState<string>('all')
	const [isOpenTabs, setIsOpenTabs] = useState(false)
	const { handleClose, handleOpen, isOpen } = useModal()


	const handleOpenTabs = () => {
		setIsOpenTabs(!isOpenTabs)
	}

	return (
		<>
			<ReplyModal onClose={handleClose} stateValue={isOpen} />
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'start',
				paddingBottom: 16
			}}>
				<div style={{
					display: 'flex',
					gap: '8px',
					color: '#262626',
					paddingBottom: 10
				}}>
					<span style={{
						fontSize: '20px',
						fontWeight: 600
					}}>Отзывы</span>
					<span style={{
						fontWeight: '300',
						marginTop: '4px'
					}}>24</span>
				</div>
				<div style={{ display: 'flex', gap: 14 }}>
					<IconSignature icon={ratingStarChecked} signatureStyle={{
						fontSize: '20px',
						fontWeight: 600
					}}>
						4,3
					</IconSignature>
					<img style={{ cursor: 'pointer' }} onClick={handleOpenTabs} src={caret} alt="caret" />
				</div>
			</div>

			{isOpenTabs && <div className={isOpenTabs ? styles.rating : styles.rating_close}>
				<Tabs style={{
					gap: '16px',
				}}>
					{
						services.map(service => (
							<Tab onClick={() => setSelectedTab(service.key)} key={service.key} isSelected={service.key === selectedTab} variant='inline'>
								{service.name} {service.reviews}
							</Tab>
						))
					}
				</Tabs>
				<ReviewsRating stars={stars} />
			</div>}
			<div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 16 }}>
				{
					reviews.map(review => (
						<Review onReply={handleOpen}  {...review} />
					))
				}</div>
			<span style={{
				fontWeight: 300,
				color: '#262626'
			}}>Каждый отзыв перед публикацией проходит проверку на неподдельность. Анонимные сообщения не рассматриваются. Тексты не редактируются и не фильтруются — все прошедшие проверку публикуются «как есть».</span>
		</>
	)
}

export default Reviews
import React from 'react'
import { useNavigate } from 'react-router-dom'
import avatar_img from '../../../../../../assets/images/createOrder_img/Rectangle 35.png'
import { ICardMasters } from '../../../../../../interface/categoryCard.props'
import { ROUTES_CATEGORY } from '../../../../../../routes/routes'
import styles from './CardMasters.module.scss'

const CardMasters: React.FC<ICardMasters> = ({
	avatar = avatar_img,
	profession = 'Инженер-строитель',
	specialization = 'Прораб',
	nrs = 'Национальный реестр специалистов',
	employment = 'Полная занятость',
	educational = 'Высшее',
	workingSchedule = 'Полный день',
	experience = '4года и 4 мес',
	salary = 150000

}) => {
	const navigate = useNavigate()
	return (
		<div onClick={() => navigate(ROUTES_CATEGORY.mastersDetail)} className={styles.cardMasters}>
			<div style={{ display: 'flex', gap: 32, position: 'relative' }}>
				<img style={{ width: 112, height: 112 }} src={avatar} alt="avatar" />
				<div className='flex-column gap-small'>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<span className='textSizeL'>{profession?.toUpperCase()}
						</span>
						<span className='textSizeL' style={{ position: 'absolute', right: 0 }}>{salary}₽ НА РУКИ</span>
					</div>
					<div style={{ display: 'flex', gap: 8 }}>
						<span>Специализации:</span>
						<span style={{ fontWeight: 700 }}>{specialization}</span>
					</div>
					<span style={{ color: '#4C54CC', fontWeight: 800 }}>{nrs}</span>
					<div style={{ display: 'flex', gap: 32 }}>
						<div style={{ display: 'flex', gap: 8 }}>
							<span>Занятость:</span>
							<span style={{ fontWeight: 700 }}>{employment}</span>
						</div>
						<div style={{ display: 'flex', gap: 8 }}>
							<span>График работы:</span>
							<span style={{ fontWeight: 700 }}>{workingSchedule}</span>
						</div>
					</div>
				</div>
			</div>
			<div style={{ display: 'flex', gap: 8 }}>
				<span>Опыт работы:</span>
				<span style={{ fontWeight: 700 }}>{experience}</span>
			</div>
			<div style={{ display: 'flex', gap: 8 }}>
				<span>Образование:</span>
				<span style={{ fontWeight: 700 }}>{educational}</span>
			</div>
		</div>
	)
}

export default CardMasters

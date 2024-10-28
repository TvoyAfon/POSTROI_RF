import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ICardVakancy } from '../../../../../../interface/categoryCard.props'
import { ROUTES_CATEGORY } from '../../../../../../routes/routes'
import Button from '../../../../../ui/Button/Button'
import styles from './CardVakancy.module.scss'
import CompanyIcon from './CompanyIcon'

const CardVakancy: React.FC<ICardVakancy> = ({ vakancyName = 'Инженер-строитель', salary = 60000, experience = 'Без опыта', company = <CompanyIcon /> }) => {

	const nav = useNavigate()
	return (
		<div className={styles.cardVakancy}>
			<span className='textSizeL' style={{ color: '#7099ED' }}>{vakancyName.toUpperCase()}</span>
			<div style={{ display: 'flex', gap: 32 }}>
				<span className='textSizeL'>От {salary}р на руки</span>
				<span style={{ backgroundColor: '#fff', borderRadius: 8, padding: 8 }}>{experience}</span>
			</div>
			<div>{company}</div>
			<div style={{ display: 'flex', gap: 24 }}>
				<Button onClick={() => nav(ROUTES_CATEGORY.vakancyCardDetail)} style={{ backgroundColor: '#383940' }}>Посмотреть</Button>
				<Button>Отправить резюме</Button>
			</div>
		</div>
	)
}

export default CardVakancy

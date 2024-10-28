import React from 'react'
import { ICardMastersDetail } from '../../../../../../../interface/categoryCard.props'
import AddSmthCard from '../../../../../../ui/AddSmthCard/AddSmthCard'
import styles from '../CardMasters.module.scss'
import CardMasterResume from './CardMasterResume/CardMasterResume'

const CardMastersRightSide: React.FC<ICardMastersDetail> = ({
	profession = 'Инженер-строитель',
	salary = 150000,
	specialization = 'Прораб.Мастер CMR',
	nrs = 'Национальный реестр специалистов',
	employment = 'Полная занятость',
	workingSchedule = 'Полный день',
	experience = '4 года и 4 месяца',
	workPlace = [{
		date: 'Август 2004 — по настоящее время',
		profession: "Начальник строительного участка.",
		location: "Ростовская область",
		workName: 'ООО ПК Барс',
		description: 'Производство работ на строительном участке.'
	}],
	higherEducation = [{
		date: '2012',
		univercityName: "Ростовский государственный строительный университет, Ростов-на-Дону",
		specialization: "Промышленное гражданское строительство, Инжинер"
	}],
	skills = ['Умение работать в команде', 'Строительное делопроизводство', 'Выполнение технического надзора', 'Строительно-отделочные работы'],
	skillUpdate = [{
		date: '2011',
		specialization: "Промышленное гражданское строительство, Инжинер",
		univercityName: "Центр качества строительства"
	}],
	experienceDrive = 'Права категории С, D.',
	about = 'Стрессово устойчивость, обучаемость, хобби судомоделизм.',
	isMyProfile = false }) => {
	return (
		<div className={styles.cardMastersRightSide}>
			{!isMyProfile ? <div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div className='flex-column gap-medium'>
					<span className='textSizeL'>{profession.toUpperCase()}</span>
					<div style={{ display: 'flex', gap: 12 }}>
						<span>Специализации:</span>
						<span style={{ fontWeight: 700 }}>{specialization}</span>
					</div>
					<span style={{ fontWeight: 700, color: "#4C54CC" }}>{nrs}</span>
					<div style={{ display: 'flex', gap: 12 }}>
						<span>Занятость</span>
						<span style={{ fontWeight: 700 }}>{employment}</span>
					</div>
					<div style={{ display: 'flex', gap: 12 }}>
						<span>График работы</span>
						<span style={{ fontWeight: 700 }}>{workingSchedule}</span>
					</div>
				</div>
				<span className='textSizeL'>{salary}₽  НА РУКИ</span>
			</div> :
				<div className='flex-column gap-medium'>
					<span className='textSizeL' style={{ paddingBottom: 64 }}>Мои резюме</span>
					<section style={{ display: "flex", gap: 8, flexWrap: 'wrap' }}>
						<CardMasterResume />
						<CardMasterResume />
						<CardMasterResume />
						<AddSmthCard isCurrentModal='resume' style={{ width: 177, height: 223 }} />
					</section>
					<span style={{ fontSize: 14, fontWeight: 600, color: '#8E8E93', cursor: 'pointer' }}>Подобрать резюме</span>
				</div>
			}
			<div>
				<div style={{ paddingBottom: 16 }}>
					<div style={{ paddingBottom: 16 }}>
						<span className='textSizeL' style={{ color: '#383940' }}>Опыт работы </span>
						<span className='textSizeL' style={{ color: '#383940' }}>{experience}</span>
					</div>
					<div style={{ display: 'flex', gap: 32 }}>
						<span >{workPlace[0].date}</span>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 4, }}>
							<span style={{ fontWeight: 700 }}>{workPlace[0].workName}</span>
							<span style={{ paddingBottom: 8 }}>{workPlace[0].location}</span>
							<span style={{ fontWeight: 700 }}>{workPlace[0].profession}</span>
							<span>{workPlace[0].description}</span>
						</div>
					</div>
				</div>
				<div className='flex-column gap-medium' style={{ paddingBottom: 64 }}>
					<span className='textSizeL' style={{ color: '#383940' }}>Ключевые навыки</span>
					<div style={{ display: "flex", gap: 8, flexWrap: 'wrap' }}>
						{skills.map((skill, index) => (
							<span style={{ padding: 8, borderRadius: 8, backgroundColor: '#F4F3F1' }} key={index}>{skill}</span>
						))}
					</div>
				</div>
				<div className='flex-column gap-medium'>
					<span className='textSizeL' style={{ color: '#383940' }}> Высшее образование</span>
					<div style={{ display: 'flex', gap: 32 }}>
						<span>{higherEducation[0].date}</span>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<span style={{ fontWeight: 700 }}>{higherEducation[0].univercityName}</span>
							<span>{higherEducation[0].specialization}</span>
						</div>
					</div>
				</div>
			</div>
			<div className='flex-column gap-medium'>
				<span className='textSizeL' style={{ color: '#383940' }}>Повышение квалификации,курсы</span>
				<div style={{ display: 'flex', gap: 32 }}>
					<span>{skillUpdate[0].date}</span>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
						<span style={{ fontWeight: 700 }}>{skillUpdate[0].univercityName}</span>
						<span>{skillUpdate[0].specialization}</span>
					</div>
				</div>
			</div>
			<div className='flex-column gap-medium'>
				<span className='textSizeL' style={{ color: '#383940' }}>Опыт вождения</span>
				<span>{experienceDrive}</span>
			</div>
			<div className='flex-column gap-medium'>
				<span className='textSizeL' style={{ color: '#383940' }}>О себе</span>
				<span>{about}</span>
			</div>
		</div >
	)
}

export default CardMastersRightSide

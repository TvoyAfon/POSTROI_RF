import React from 'react'
import Button from '../../../../../../ui/Button/Button'
import styles from '../CardVakancy.module.scss'

const responsibilities = ['ремонтно-строительные работы', 'эксплуатация инженерных сетей', 'сантехнические работы', 'сварочные работы', 'ремонтно-строительные работы', 'отделочные работы']

const requirements = ['выпускники Строительного университета (бакалавр, магистр) или Строительного колледжа (можно так же студенты)', 'опыт работы в данной сфере приветствуется (можно и без опыта)']

const conditions = ['корпоративное питание за счет компании', 'пятидневка, соцпакет', 'возможно обучение в процессе работы специалистами компании', 'заработная плата обсуждается индивидуально с руководителем']

const CardVakancyInfo: React.FC = () => {
	return (
		<div className={styles['cardVakancyInfo']}>
			<span className='textSizeL'>ИНЖЕНЕР-СТРОИТЕЛЬ</span>
			<span className='textSizeL'>от 55000 р на руки</span>
			<div style={{ display: 'flex', gap: 4 }}>
				<span>Требуемый опыт работы:</span>
				<span>не требуется</span>
			</div>
			<div style={{ display: 'flex', gap: 4 }}>
				<span>Полная занятость</span>
				<span>полный день</span>
			</div>
			<Button style={{ width: 145 }}>Откликнуться</Button>
			<section className='flex-column gap-medium'>
				<span style={{ fontWeight: 800 }}>Обязанности:</span>
				<ul className='flex-column gap-small'>
					{responsibilities.map((el, index) => (
						<li key={index}>{el}</li>
					))}
				</ul>
			</section>
			<section className='flex-column gap-medium'>
				<span style={{ fontWeight: 800 }}>Требования:</span>
				<ul className='flex-column gap-small'>
					{requirements.map((el, index) => (
						<li key={index}>{el}</li>
					))}
				</ul>
			</section>
			<section className='flex-column gap-medium'>
				<span style={{ fontWeight: 800 }}>Условия:</span>
				<ul className='flex-column gap-small'>
					{conditions.map((el, index) => (
						<li key={index}>{el}</li>
					))}
				</ul>
			</section>
			<section className='flex-column gap-medium'>
				<span style={{ fontWeight: 800 }}>Контакты:</span>
				<div className='flex-column gap-verySmall'>
					<span>Светлана Васильевна</span>
					<span>+7(989)5173664</span>
				</div>
				<a href='/'>ok2@trustgroup.ru</a>
			</section>
		</div>
	)
}

export default CardVakancyInfo

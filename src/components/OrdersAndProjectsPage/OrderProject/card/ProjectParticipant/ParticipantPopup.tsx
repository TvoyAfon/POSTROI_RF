import React from 'react'
import edit from '../../../../../assets/images/createOrder_img/pencil-edit-02.svg'
import CheckboxButton from '../../../../ui/CheckboxButton/CheckboxButton'
import Line from '../../../../ui/Line/Line'
import styles from './Participant.module.scss'

const buttons = [
	{
		btnName: 'Написать',
		onClick: () => { console.log('Кнопка 1 нажата') }
	},
	{
		btnName: 'Удалить',
		onClick: () => { console.log('Кнопка 2 нажата') }
	},
	{
		btnName: 'Добавить в группу',
		onClick: () => { console.log('Кнопка 3 нажата') }
	},
	{
		btnName: 'Профиль',
		onClick: () => { console.log('Кнопка 4 нажата') }
	},
]

const сheckBox = [
	{
		btnName: 'Просмотр файлов',
		onClick: () => { console.log('Кнопка 1 нажата') }
	},
	{
		btnName: 'Просмотр фото',
		onClick: () => { console.log('Кнопка 2 нажата') }
	},
	{
		btnName: 'Создавать чаты',
		onClick: () => { console.log('Кнопка 3 нажата') }
	},
	{
		btnName: 'Создавать заказы в проекте',
		onClick: () => { console.log('Кнопка 4 нажата') }
	},
	{
		btnName: 'Добавлять участников',
		onClick: () => { console.log('Кнопка 4 нажата') }
	},
]

const ParticipantPopup: React.FC = () => {
	return (
		<div className={styles['popup']}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<span style={{ color: '#7099ED' }}>Штукатур</span>
				<img style={{ cursor: 'pointer' }} src={edit} alt="edit" />
			</div>
			{buttons.map((button, index) => (
				<span style={{ cursor: 'pointer' }} onClick={button.onClick} key={index}>{button.btnName}</span>
			))}
			<div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
				<span style={{ color: '#8E8E93', fontSize: 13 }}>Разрешить действие</span>
				<Line style={{}} lineWidth='53.5%' />
			</div>
			{сheckBox.map((el, index) => (
				<CheckboxButton key={index} label={el.btnName} onChange={el.onClick} />
			))}
			<Line lineWidth='100%' />
		</div>
	)
}

export default ParticipantPopup

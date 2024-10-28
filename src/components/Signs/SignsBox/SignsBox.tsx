import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import CheckboxButtonBlack from '../../ui/CheckboxButton/CheckBoxButtonBlack'
import styles from '../Signs.module.scss'
import SignsPeriod from '../SignsPeriod'

const SignsBox: React.FC = () => {
	const [days, setDays] = useState(7)
	const [money, setMoney] = useState(0)
	const stepSigns = useSelector((state: RootState) => state.signsReducer)
	useEffect(() => {
		setMoney(days * 100)
	}, [days])

	return (
		<div style={{ height: stepSigns.stepComponentNumber === 5 ? 455 : 142 }} className={styles.signs_form}>
			<span style={{ color: 'white', fontSize: '20px' }}>НОВОЕ ОБЪЯВЛЕНИЕ</span>
			<span style={{ color: 'white', fontSize: 16, fontWeight: 300 }}>Шаг     {stepSigns.stepComponentNumber}/5</span>
			{stepSigns.stepComponentNumber === 5 && <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
				<section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
					<span style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>Выделить объявление</span>
					<CheckboxButtonBlack labelStyle={{ color: 'white' }} label='Рамка' />
					<CheckboxButtonBlack labelStyle={{ color: 'white' }} label='Фон' />
				</section>
				<section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
					<div >
						<span style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>Срок размещения объявления:</span>
						<span style={{ fontSize: 24, paddingLeft: 10, color: '#FFB31D', fontWeight: 700 }}> {days} дней</span>
					</div>
					<SignsPeriod days={days} setDays={setDays} />
					<span draggable='false' unselectable='on' style={{ fontSize: 40, fontWeight: 500, textAlign: 'start', color: 'white', marginTop: '30px', userSelect: 'none' }}>{money}₽</span>
				</section>
			</div>}
		</div>
	)
}

export default SignsBox

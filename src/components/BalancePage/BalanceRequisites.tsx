import React from 'react'
import { IBalanceRequisites } from '../../interface/modal.props'
import Button from '../ui/Button/Button'
import Field from '../ui/Field/Field'
import Line from '../ui/Line/Line'
import OverLay from '../ui/OverLay'
import styles from './BalancePage.module.scss'


const BalanceRequisites: React.FC<IBalanceRequisites> = ({ handleCloseRequisites }) => {
	return (
		<>
			<OverLay />
			<div className={styles.balanceRequisites_container} >
				<section style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span style={{ fontSize: 20, fontWeight: 600 }}>РЕКВИЗИТЫ</span>
					<button className={styles.button} onClick={handleCloseRequisites}>
						<span style={{ position: 'absolute', top: '-3px', left: '7px' }}>&times;</span>
					</button>
				</section>
				<div className='flex-column gap-medium'>
					<section style={{ display: 'flex', gap: 150 }}>
						<span >Платежный счет</span>
						<Field style={{ width: 128, fontWeight: 700 }} />
					</section>
					<section style={{ display: 'flex', gap: 60 }}>
						<span >Адрес регистрации клиента</span>
						<Field style={{ width: 610, fontWeight: 700 }} />
					</section>
				</div>
				<Line lineWidth='100%' />
				<span style={{ fontSize: 20, fontWeight: 600 }}>Подразделение банка по месту ведения счёта</span>
				<div className='flex-column gap-medium'>
					<section className='textSizeL'>
						<span>Код подразделения (ТБ/ОСБ/ВСП)</span>
						<Field style={{ width: 128, fontWeight: 700 }} />
					</section>
					<section style={{ display: 'flex', gap: 110 }}>
						<span style={{ whiteSpace: 'nowrap' }}>Адрес подразделения</span>
						<Field style={{ width: 610, fontWeight: 700 }} />
					</section>
				</div>
				<Line lineWidth='100%' />
				<span style={{ fontSize: 20, fontWeight: 600 }}>Получатель</span>
				<div className='flex-column gap-medium'>
					<section style={{ display: 'flex', gap: 190 }}>
						<span >Получатель</span>
						<Field style={{ width: 610, fontWeight: 700 }} />
					</section>
					<section style={{ display: 'flex', gap: 150 }}>
						<span>Счёт получателя</span>
						<Field style={{ width: 233, fontWeight: 700 }} />
					</section>
				</div>
				<Line lineWidth='100%' />
				<span style={{ fontSize: 20, fontWeight: 600 }}>Банк получателя</span>
				<div>
					<section style={{ display: 'flex', gap: 110, alignItems: 'center', paddingBottom: 16 }}>
						<span>Наименование банка</span>
						<Field style={{ fontWeight: 700 }} />
					</section>
					<section style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
							<span>БИК</span>
							<Field style={{ width: 128, fontWeight: 700 }} />
						</div>
						<div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
							<span>КПП</span>
							<Field style={{ width: 128, fontWeight: 700 }} />
						</div>
						<div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
							<span>ИНН</span>
							<Field style={{ width: 128, fontWeight: 700 }} />
						</div>
					</section>
				</div>
				<Button style={{ width: '137px' }}>Сохранить</Button>
			</div>
		</>
	)
}

export default BalanceRequisites

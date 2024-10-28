import React from 'react'
import styles from '../BalancePage.module.scss'
import BalanceInfo from './BalanceInfo'



const BalanceHistory: React.FC = () => {
	return (
		<div className={styles.balanceHistory} >
			<h3 style={{ fontSize: 24, fontWeight: 600 }}>История операций</h3>
			<section style={{ display: 'flex', gap: 100, paddingLeft: 20 }}>
				<h4>Дата и время</h4>
				<h4>Операция</h4>
				<h4>Карта</h4>
				<h4>Сумма</h4>
				<h4>Статус</h4>
			</section>

			<BalanceInfo />
			<BalanceInfo backgroundColor='#white' />
			<BalanceInfo />
			<BalanceInfo backgroundColor='#white' />
			<BalanceInfo />
			<BalanceInfo backgroundColor='#white' />
			<BalanceInfo />
		</div>
	)
}

export default BalanceHistory

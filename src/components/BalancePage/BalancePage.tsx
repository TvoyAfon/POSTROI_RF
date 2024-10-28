import Balance from './Balance'
import BalanceHistory from './BalanceHistory/BalanceHistory'
import styles from './BalancePage.module.scss'

const BalancePage = () => {
	return (
		<div className={styles['balancePage']} style={{display:'flex',gap:18,justifyContent:'center',paddingTop:120}}>
			<Balance/>
			<BalanceHistory/>
			</div>
	)
}

export default BalancePage
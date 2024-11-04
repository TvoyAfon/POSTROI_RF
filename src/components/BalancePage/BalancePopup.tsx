import React, { useState } from 'react'
import { IBalancePopUp } from '../../interface/modal.props'
import Button from '../ui/Button/Button'
import CloseButton from '../ui/CloseButton/CloseButton'
import Field from '../ui/Field/Field'
import OverLay from '../ui/OverLay'
import BalanceChoose from './BalanceChoose'
import styles from './BalancePage.module.scss'

const BalancePopup: React.FC<IBalancePopUp> = ({ handleClosePopup }) => {

	const [openTransact, setOpenTransact] = useState<boolean>(false)

	return (
		<>
			<OverLay />
			<div className={styles['balance_popup_content']}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span className='textSizeL'>ПОПОЛНЕНИЕ БАЛАНСА</span>
					<CloseButton onClick={handleClosePopup} />
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span className='textSizeL'>Сумма</span>
					<Field style={{ width: '100%' }} />
					<span style={{ fontWeight: 300, fontSize: 10, textAlign: 'center' }}>Минимальная сумма пополнения - 500р </span>
					<div className={styles['balance_popup_content_pay']}>
						<span onClick={() => setOpenTransact(!openTransact)} >Система быстрых платежей</span>
						{openTransact && <BalanceChoose />}
					</div>
				</div>
				<Button>Пополнить</Button>
			</div>
		</>
	)
}

export default BalancePopup

import React, { useState } from 'react'
import OverLay from '../ui/OverLay'

import { IBalancePopUp } from '../../interface/modal.props'
import Button from '../ui/Button/Button'
import CloseButton from '../ui/CloseButton/CloseButton'
import Field from '../ui/Field/Field'
import BalanceChoose from './BalanceChoose'

const BalancePopup: React.FC<IBalancePopUp> = ({ handleClosePopup }) => {

	const [openTransact, setOpenTransact] = useState<boolean>(false)

	return (
		<>
			<OverLay />
			<div className='flex-column gap-large' style={{ width: 354, padding: 32, borderRadius: 32, backgroundColor: 'white', position: 'absolute', zIndex: 11 }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span className='textSizeL'>ПОПОЛНЕНИЕ БАЛАНСА</span>
					<CloseButton onClick={handleClosePopup} />
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span className='textSizeL'>Сумма</span>
					<Field style={{ width: '100%' }} />
					<span style={{ fontWeight: 300, fontSize: 10, textAlign: 'center' }}>Минимальная сумма пополнения - 500р </span>
					<div style={{ position: 'relative', marginTop: 32, backgroundColor: '#F4F3F1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 9, borderRadius: 8, cursor: 'pointer' }}>
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

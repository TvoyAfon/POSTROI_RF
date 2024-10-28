import React from 'react'
import Field from '../ui/Field/Field'
import OverLay from '../ui/OverLay'

import { IBalanceAddCard } from '../../interface/modal.props'
import Button from '../ui/Button/Button'
import CloseButton from '../ui/CloseButton/CloseButton'

const BalanceAddCard: React.FC<IBalanceAddCard> = ({ handleCloseAddCard }) => {
	return (
		<>
			<OverLay />
			<div className='flex-column gap-medium-large' style={{ width: 290, padding: 32, borderRadius: 32, backgroundColor: 'white', zIndex: 11, position: 'absolute' }}>
				<div style={{ display: 'flex', gap: 30 }}>
					<h3 className='textSizeL' style={{ whiteSpace: 'nowrap', position: 'relative' }}>ПРИВЯЗАТЬ КАРТУ</h3>
					<CloseButton style={{ position: 'absolute', left: '84%', top: '9.5%' }} onClick={handleCloseAddCard} />
				</div>
				<div>
					<span className='textSizeL' >Номер карты</span>
					<Field style={{ width: '100%' }} />
				</div>
				<div>
					<span className='textSizeL' >CVV</span>
					<Field style={{ width: '100%' }} />
				</div>
				<div>
					<span className='textSizeL' >Срок действия</span>
					<Field style={{ width: '100%' }} />
				</div>
				<Button>Привязать</Button>
			</div>
		</>

	)
}

export default BalanceAddCard

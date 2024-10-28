import React from 'react'
import { arrInfoSection2 } from '../../../../../../common/createOrderRegisterModal'
import Field from '../../../../../ui/Field/Field'

const LegalAddress: React.FC = () => {
	return (
		<div className='flex-column gap-medium' style={{ paddingTop: 12, paddingBottom: 16 }}>
			<span style={{ fontSize: 16, fontWeight: 700, color: '#262626' }}>Юридический адрес</span>
			{arrInfoSection2.map((field, index) => (
				<div style={{ display: 'flex', flexDirection: 'column' }} key={index}>
					<span style={{ fontSize: 16, fontWeight: 800, color: '#8E8E93' }}>{field}</span>
					<Field style={{ width: '100%' }} />
				</div>
			))}
			<section style={{ display: 'flex', gap: 32 }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span style={{ fontSize: 16, fontWeight: 800, color: '#8E8E93' }}>Дом*</span>
					<Field style={{ width: '358px' }} />
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span style={{ fontSize: 16, fontWeight: 800, color: '#8E8E93' }}>Корпус*</span>
					<Field style={{ width: '358px' }} />
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span style={{ fontSize: 16, fontWeight: 800, color: '#8E8E93' }}>Квартира/Офис*</span>
					<Field style={{ width: '358px' }} />
				</div>
			</section>
		</div>
	)
}

export default LegalAddress

import React from 'react'

const BalanceInfo: React.FC<{ backgroundColor?: string }> = ({ backgroundColor = '#F4F3F1' }) => {
	return (
		<section style={{ display: 'flex', gap: 100, backgroundColor: backgroundColor, padding: '16px 8px 16px 8px', borderRadius: 10 }}>
			<div className='flex-column gap-medium-large' style={{ fontSize: 16, fontWeight: 400 }}>04.04.2024 | 19:30</div>
			<div>Оплата</div>
			<div style={{ paddingLeft: 8 }}>xxx 371</div>
			<div>-140</div>
			<div style={{ paddingLeft: 20 }} >Успешно</div>
		</section>
	)
}

export default BalanceInfo

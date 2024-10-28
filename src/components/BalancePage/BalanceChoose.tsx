import React from 'react'


const arrTransaction = ['Система быстрых платежей', 'Карта банков РФ', 'SberPay', 'Наличные', 'ЮMoney', 'Карта банков других государств']

const BalanceChoose: React.FC = () => {
	return (
		<div
			className='flex-column gap-small'
			style={{ position: 'absolute', padding: 32, borderRadius: 32, backgroundColor: 'white', width: 300, whiteSpace: 'nowrap', top: '110%', zIndex: 10 }}>
			{arrTransaction.map(item => (
				<span style={{ fontWeight: 300 }}>{item}</span>
			))}
		</div>
	)
}

export default BalanceChoose

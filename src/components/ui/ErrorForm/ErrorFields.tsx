import React from 'react'
import warn_svg from '../../../assets/images/createOrder_img/Уведомление.svg'

const ErrorFields: React.FC = () => {
	return (
		<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><img style={{ width: 14 }} src={warn_svg} alt="warning" /><span style={{ fontSize: '10px', color: 'red' }}>Заполните все поля</span></div>
	)
}

export default ErrorFields

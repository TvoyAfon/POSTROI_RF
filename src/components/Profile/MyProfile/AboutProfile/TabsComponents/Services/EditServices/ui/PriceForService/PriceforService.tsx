import React, { useState } from 'react'
import arrow_down from '../../../../../../../../../assets/images/createOrder_img/circle-arrow-down-01.svg'
import Field from '../../../../../../../../ui/Field/Field'
import PriceForServicePopup from './PriceForServicePopup'

interface IPriceForService {
	toPrice?: boolean,
	value?: string,
	onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
	name?: string
}

const PriceforService: React.FC<IPriceForService> = ({ name, onChange, toPrice, value }) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className='flex-column gap-medium'>
			<span className='textSizeL'>Цена за услугу</span>
			<div style={{ display: 'flex', gap: 16 }}>
				<Field name={name} onChange={onChange} value={value} placeholder='от ₽' style={{ width: 300 }} />
				{toPrice && <Field placeholder='до ₽' style={{ width: 300 }} />}
				<div style={{ display: 'flex', gap: 8, alignItems: 'center', position: 'relative' }}>
					<span>кв.м</span>
					<img
						onClick={() => setIsOpen(!isOpen)}
						style={{ cursor: 'pointer' }}
						src={arrow_down}
						alt="arrow_down" />
					{isOpen && <PriceForServicePopup />}
				</div>
			</div>
		</div>
	)
}

export default PriceforService

import React, { useState } from 'react'
import Button from '../../../../../ui/Button/Button'
import RadioButton from '../../../../../ui/RadioButton/RadioButton'

const radius = [1, 2, 3, 5, 10, 15, 25, 50, 100, 150, 200]

const RadiusButton: React.FC = () => {
	const [currentButton, setCurrentButton] = useState<number | null>(null)
	return (
		<div style={{ display: 'flex', gap: 8 }}>
			<RadioButton label='Радиус,км' />
			<div style={{ display: 'flex', gap: 8 }}>
				{radius.map((el, index) => (
					<Button onClick={() => setCurrentButton(el)}
						style={{ width: 36, height: 20, borderRadius: 8, backgroundColor: currentButton === el ? '#383940' : '#F4F3F1', color: currentButton === el ? '#fff' : '#262626' }}
						key={index}>{el}
					</Button>
				))}
			</div>
		</div>
	)
}

export default RadiusButton

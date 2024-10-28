import React, { useState } from 'react'
import CheckboxButton from '../../../ui/CheckboxButton/CheckboxButton'
import Tooltip from '../../../ui/Tooltip/Tooltip'
import { flexRow } from '../styles/stylesCreateOrder'

const CheckBoxNotice: React.FC<{
	onClick: () => void,
	value: boolean,
	handleCurrentSocials: (socials: string[]) => void,
	socialsValue: string[],
	handleClickSend: (value: boolean) => void
}> = ({ onClick, value, handleCurrentSocials, socialsValue, handleClickSend }) => {
	const [open, setOpen] = useState(value)
	const socials = ['E-mail', 'Вконтакте', 'WhatsApp', 'Telegram']

	const handleClickNotice = () => {
		const newOpenValue = !open  // Determine the new open state
		setOpen(newOpenValue)  // Update local state
		onClick()  // Dispatch the action in parent component
		handleClickSend(newOpenValue)  // Update is_send state in Redux
	}

	const handleSocialToggle = (social: string) => {
		const updatedSocials = socialsValue.includes(social)
			? socialsValue.filter(s => s !== social)
			: [...socialsValue, social]

		handleCurrentSocials(updatedSocials)
	}

	return (
		<div className='flex-column'>
			<div style={flexRow}>
				<CheckboxButton
					onClick={handleClickNotice}
					checked={value}
					label=' Хотите получать уведомления об откликах на ваш заказ?' />
				<Tooltip>Всплывающая подсказка</Tooltip>
			</div>
			{open &&
				<div style={{ paddingLeft: 20 }} className='flex-column gap-medium'>
					{socials.map((soc, index) => (
						<CheckboxButton
							checked={socialsValue.includes(soc)}
							onClick={() => handleSocialToggle(soc)}
							key={index}
							label={soc} />
					))}
				</div>
			}
		</div>
	)
}
export default CheckBoxNotice
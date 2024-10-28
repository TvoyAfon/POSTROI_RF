import React, { forwardRef, useState } from 'react'
import next_svg from '../../../assets/images/createOrder_img/arrow-right-02.svg'
import arrow_white from '../../../assets/images/createOrder_img/arrow_white.svg'
import { IRoundedButton } from '../../../interface/roundedButton.props'
import styles from './RoundedButton.module.scss'


const RoundedButton: React.FC<IRoundedButton> = forwardRef<HTMLButtonElement, IRoundedButton>(({
	style = {},
	label = '',
	handleContinue,
	disabled = false,
	onKeyDown,
}, ref) => {

	const [changeArrow, setChangeArrow] = useState(false)

	return (
		<button
			ref={ref}
			onKeyDown={onKeyDown}
			onMouseLeave={() => setChangeArrow(false)}
			onMouseEnter={() => setChangeArrow(true)}
			disabled={disabled}
			id='buttonNextStep'
			onClick={handleContinue}
			style={style}
			className={styles.button_next}>{label}
			{changeArrow ?
				<img style={{ width: 20, height: 20 }} src={arrow_white} /> : <img style={{ width: 20, height: 20 }} src={next_svg} />}
		</button>
	)
})
export default RoundedButton

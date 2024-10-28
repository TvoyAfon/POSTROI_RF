import { CSSProperties, FC, ReactNode } from 'react'
import ratingStarChecked from '../../../assets/images/profile/rating-star-checked.svg'

interface IIconSignature {
	icon?: string
	children: ReactNode
	style?: CSSProperties
	signatureStyle?: CSSProperties
	iconStyle?: CSSProperties
}

const IconSignature: FC<IIconSignature> = ({
	icon = ratingStarChecked,
	children,
	style = {},
	signatureStyle = {},
	iconStyle
}) => {
	return (
		<div style={{
			display: 'flex',
			gap: '8px',
			alignItems: 'center',
			...style
		}}>
			<img src={icon} width='22' height='22' style={iconStyle} />
			<span style={signatureStyle}>{children}</span>
		</div>
	)
}

export default IconSignature
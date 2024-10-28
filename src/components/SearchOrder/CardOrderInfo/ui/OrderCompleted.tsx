import { CSSProperties, FC } from 'react'
import checkmarkCircleIcon from '../../../../assets/images/createOrder_img/checkmark-circle.svg'

export interface IOrderCompletedProps {
	style?: CSSProperties
}

const OrderCompleted: FC<IOrderCompletedProps> = ({ style = {} }) => {
	return (
		<div style={{
			display: 'flex',
			gap: '8px',
			...style
		}}>
			<img
				src={checkmarkCircleIcon}
				width='20'
				height='20'
				style={{
					marginTop: '3px'
				}}
				alt=""
			/>
			<span style={{
				color: '#7099ED',
				fontWeight: '600',
				fontSize: '20px'
			}}>
				Выполнен
			</span>
		</div>
	)
}

export default OrderCompleted
import { CSSProperties, FC, PropsWithChildren } from 'react'
import notificationIcon from '../../../../assets/images/createOrder_img/Уведомление.svg'

export interface InvalidFieldProps extends PropsWithChildren {
	style?: CSSProperties
}

const InvalidField: FC<InvalidFieldProps> = ({
	children,
	style
}) => {
	return (
		<div style={{
			display: 'flex',
			gap: '8px',
			...style
		}}>
			<img
				src={notificationIcon}
				alt=""
				width={14}
				height={14}
			/>
			<span style={{
				fontSize: '10px',
				color: '#FE0000',
				marginTop: '1px'
			}}>
				{children}
			</span>
		</div>
	)
}

export default InvalidField
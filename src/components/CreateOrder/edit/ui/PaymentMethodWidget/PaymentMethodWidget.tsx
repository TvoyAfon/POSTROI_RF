import { FC, useEffect, useState } from 'react'
import { PaymentMethod } from '../../../../../services/order/types/enums'
import RadioButton from '../../../../ui/RadioButton/RadioButton'
import Tooltip from '../../../../ui/Tooltip/Tooltip'
import { paymentMethods } from './methods'

export interface IPaymentMethodWidgetProps {
	onChangeMethod?: (paymentMethod: PaymentMethod) => void
	defaultPaymenthod?: PaymentMethod
}

const PaymentMethodWidget: FC<IPaymentMethodWidgetProps> = ({
	onChangeMethod,
	defaultPaymenthod
}) => {
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.ORGANIZATION)

	useEffect(() => {
		if (!defaultPaymenthod) return
		setPaymentMethod(defaultPaymenthod)
	}, [defaultPaymenthod])

	const handleChange = (key: PaymentMethod) => {
		setPaymentMethod(key)
		onChangeMethod && onChangeMethod(key)
	}

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '16px'
		}}>
			<span style={{ fontSize: '16px', fontWeight: '700' }}>Укажите способ оплаты</span>
			{
				paymentMethods.map(method => (
					<div key={method?.key} style={{
						display: 'flex',
						gap: '8px'
					}}>
						<RadioButton
							onClick={() => handleChange(method!.key)}
							checked={method?.key === paymentMethod}
							label={method?.name} />
						<Tooltip>{method?.tooltip}</Tooltip>
					</div>
				))
			}
		</div>
	)
}

export default PaymentMethodWidget
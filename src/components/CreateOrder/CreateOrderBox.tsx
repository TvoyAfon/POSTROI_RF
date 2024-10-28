import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCurrentSteps } from '../../hooks/stepsValidation/useCurrentSteps'
import { RootState } from '../../store/store'
import styles from './CreateOrder.module.scss'
import { useGetTextInBox } from './hooks/useGetTextInBox'

const CreateOrderBox: React.FC = () => {
	const currentCategoryStep = useCurrentSteps()
	const { stepComponentNumber } = useSelector((state: RootState) => state.createOrder)
	const text = useGetTextInBox()
	const [height, setHeight] = useState('')

	useEffect(() => {
		switch (stepComponentNumber) {
			case 1:
				setHeight('215px')
				break
			case 2:
				setHeight('230px')
				break
			case 3:
				setHeight('260px')
				break
			case 4:
				setHeight('193px')
				break
			case 5:
				setHeight('347px')
				break
			case 6:
				setHeight('370px')
				break
			default:
				break
		}

	}, [stepComponentNumber])

	return (
		<div
			style={{ height }}
			className={styles['createOrderBox']}>
			<span style={{ color: 'white', fontWeight: 500 }} className='textSizeL'
			>НОВЫЙ ЗАКАЗ</span>
			<span
				style={{ color: 'white', fontSize: '16px', fontWeight: '300' }}>Шаг {stepComponentNumber}/6</span>
			<span style={{ color: 'white', fontWeight: stepComponentNumber === 6 ? 600 : '' }}>{text}</span>
			{currentCategoryStep ? <>
				<div
					className={styles.createOrderBox_text}>
					<span>Заказ будет активен 30 дней <br />Количество откликов - 15<br />
						После чего он будет добавлен в архив.Вы сможете его продлить.
					</span>
				</div>
			</> : null}
		</div>
	)
}

export default CreateOrderBox

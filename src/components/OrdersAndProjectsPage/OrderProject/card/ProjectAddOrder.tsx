import React, { useState } from 'react'
import add_circle from '../../../../assets/images/other/add-circlee.svg'
import Button from '../../../ui/Button/Button'
import styles from '../OrderProject.module.scss'

const ProjectAddOrder: React.FC = () => {
	const [showButton, setShowButton] = useState(false)
	return (
		<div style={{ position: 'relative' }}
			onMouseEnter={() => setShowButton(true)}
			onMouseLeave={() => setShowButton(false)}
			className={styles['projectAddOrder']}>
			<img src={add_circle} alt="add" />
			{
				showButton &&
				<div style={{ position: 'absolute', bottom: 5 }} className='flex-column gap-small'>
					<Button style={{ backgroundColor: '#282930', color: 'white', width: 140 }}>Создать заказ
					</Button>
					<Button style={{ backgroundColor: 'white', color: '#282930', width: 140 }}>Добавить заказ
					</Button>
				</div>
			}
		</div>
	)
}

export default ProjectAddOrder

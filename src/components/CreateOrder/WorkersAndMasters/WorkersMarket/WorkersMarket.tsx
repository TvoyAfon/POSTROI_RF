import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrow_svg from '../../../../assets/images/createOrder_img/arrow-left-02.svg'
import workers_svg from '../../../../assets/images/createOrder_img/workers.svg'
import { IDefaultModal } from '../../../../interface/modal.props'
import { ROUTES_CATEGORY, ROUTES_PATH } from '../../../../routes/routes'
import Button from '../../../ui/Button/Button'
import styles from '../WorkersAndMaterials.module.scss'


const WorkersMarket: React.FC<IDefaultModal> = ({ onOpen }) => {
	const navigate = useNavigate()
	return (

		<div className={styles.overlayCard}>
			<div style={{ display: 'flex', position: 'absolute', top: -55, left: 0, gap: 32 }}>
				<img onClick={() => navigate(`${ROUTES_PATH.main}`)} style={{ cursor: 'pointer', height: 24, width: 24 }} src={arrow_svg} alt='arrow' />
				<span className='textSizeL' style={{ whiteSpace: 'nowrap' }}>БИРЖА РАЗНОРАБОЧИХ И СПЕЦИАЛИСТОВ</span>
			</div>
			<div className='flex-column gap-medium'>
				<img style={{ width: 235 }} src={workers_svg} alt="workers" />
				<span className='textSizeL' style={{ color: '#FFFFFF' }}>БИРЖА <br />РАЗНОРАБОЧИХ</span>
				<div style={{ display: 'flex', gap: 11 }}>
					<Button onClick={() => navigate(`${ROUTES_CATEGORY.findWorkers}`)} style={{ color: '#231F20', backgroundColor: 'white', }}>Найти рабочего</Button>
					<Button onClick={onOpen} style={{ color: 'white', backgroundColor: '#231F20' }}>Заполнить анкету разнорабочего</Button>
				</div>
				<span style={{ fontWeight: 300, color: 'white' }}>Биржа разнорабочих — это современный способ поиска работников. Работодатель, может разместить объявление о поиске работника и просматривать анкеты рабочх. Разнорабочие, могут заполнить анкету, чтобы привлечь внимание потенциальных работодателей и просматривать объявления работодателей.</span>
			</div>
		</div>

	)
}

export default WorkersMarket

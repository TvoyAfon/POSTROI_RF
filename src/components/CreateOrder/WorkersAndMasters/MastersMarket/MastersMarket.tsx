import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import masters_svg from '../../../../assets/images/createOrder_img/special.svg'
import { useModal } from '../../../../hooks/useModal'
import { ROUTES_CATEGORY } from '../../../../routes/routes'
import { chooseVakancyPage } from '../../../../store/slices/currentMastersPageType/currentPageTypeSlice'
import Button from '../../../ui/Button/Button'
import styles from '../WorkersAndMaterials.module.scss'
import MastersForm from './modal/MastersForm'

const MastersMarket: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { handleClose, handleOpen, isOpen } = useModal()

	const handleOpenMastersPage = () => {
		navigate(ROUTES_CATEGORY.showMasters)
		dispatch(chooseVakancyPage(false))
	}

	return (
		<>
			{isOpen && <MastersForm onClose={handleClose} />}
			<div className={styles.overlayCard}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
					<img src={masters_svg} alt="masters" />
					<span className='textSizeL' style={{ color: '#FFFFFF' }}>БИРЖА <br />СПЕЦИАЛИСТОВ</span>
					<div style={{ display: 'flex', gap: 11 }}>
						<Button onClick={handleOpenMastersPage} style={{ color: '#231F20', backgroundColor: 'white' }}>Найти специалиста</Button>
						<Button onClick={handleOpen} style={{ color: 'white', backgroundColor: '#231F20' }}>Заполнить анкету специалиста</Button>
					</div>
					<span style={{ fontWeight: 300, color: 'white' }}>Биржа специалиста — это современный способ поиска работников. Работодатель, может разместить объявление о поиске работника и просматривать анкеты рабочх. Разнорабочие, могут заполнить анкету, чтобы привлечь внимание потенциальных работодателей и просматривать объявления работодателей.</span>
				</div>
			</div>
		</>
	)
}

export default MastersMarket

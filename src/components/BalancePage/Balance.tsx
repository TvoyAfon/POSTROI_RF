import { useState } from 'react'
import { useModal } from '../../hooks/useModal'
import Button from '../ui/Button/Button'
import BalanceAddCard from './BalanceAddCard'
import BalancePopup from './BalancePopup'
import BalanceRequisites from './BalanceRequisites'

const Balance = () => {

	const { isOpen, handleClose, handleOpen } = useModal()
	const [openAddCard, setOpenAddCard] = useState<boolean>(false)
	const [openRequisites, setOpenRequisites] = useState(false)

	const handleCloseAddCard = () => {
		setOpenAddCard(false)
	}

	const handleCloseRequisites = () => {
		setOpenRequisites(false)
	}

	return (
		<>
			<div className='flex-column gap-medium-large' style={{ width: 258, backgroundColor: 'white', padding: 24, borderRadius: '32px', alignItems: 'center' }}>
				<h2 className='textSizeL'>БАЛАНС</h2>
				<span style={{ fontSize: 40, fontWeight: 500 }}>0₽</span>
				<Button
					onClick={handleOpen}
					style={{ width: 224 }}>Пополнить</Button>
				<span>Минимальная сумма <br /> пополнения — 500 руб.</span>
				<section className='flex-column gap-large' style={{ alignItems: 'center' }}>
					<span className='textSizeL'>привязанные карты</span>
					<span>xxxxxxxxxx 371</span>
					<span>xxxxxxxxxx 371</span>
					<Button
						onClick={() => setOpenAddCard(true)}
						style={{ width: 224 }}>Привязать карту</Button>
				</section>
				<Button
					onClick={() => setOpenRequisites(true)}
					style={{ width: 224 }}>Реквизиты</Button>
			</div>
			{isOpen && <BalancePopup handleClosePopup={handleClose} />}
			{openAddCard && <BalanceAddCard handleCloseAddCard={handleCloseAddCard} />}
			{openRequisites && <BalanceRequisites handleCloseRequisites={handleCloseRequisites} />}
		</>
	)
}

export default Balance

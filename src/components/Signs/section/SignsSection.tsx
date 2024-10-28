import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteSignsCard, ICard } from '../../../store/slices/Signs/dataSigns/DataSignsSlice'
import SignsCard from '../SignsCard/SignsCard'

const SignsSection: React.FC<{ openMap: boolean, filteredCards: ICard[] }> = ({ openMap, filteredCards }) => {
	const dispatch = useDispatch()
	return (
		<section
			style={!openMap ?
				{ display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'scroll', height: 650 } :
				{ display: 'grid', gridTemplateColumns: '1fr 1fr', overflowY: 'scroll', height: 650, gap: 24 }}>
			{filteredCards.length !== 0 ? filteredCards.map((card) => (
				<SignsCard
					createDate={card.create_date}
					key={card.id}
					card={card}
					openMap={openMap}
					onDelete={() => dispatch(deleteSignsCard(card.id))}
					isMycard={true} />
			)) :
				<div className='textSizeL' style={{ textAlign: 'center' }}>
					Нет объявлений.
				</div>
			}
		</section>
	)
}

export default SignsSection

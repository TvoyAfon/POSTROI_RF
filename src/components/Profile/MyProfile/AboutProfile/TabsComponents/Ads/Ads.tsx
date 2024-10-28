import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES_NAVBAR } from '../../../../../../routes/routes'
import { deleteSignsCard } from '../../../../../../store/slices/Signs/dataSigns/DataSignsSlice'
import { RootState } from '../../../../../../store/store'
import SignsCard from '../../../../../Signs/SignsCard/SignsCard'
import Button from '../../../../../ui/Button/Button'
import { services } from '../../../../UserProfile/ProfileComponents/Reviews/data'
import Tab from '../../../../ui/Tabs/Tab'
import Tabs from '../../../../ui/Tabs/Tabs'

const Ads = () => {
	const [selectedService, setSelectedService] = useState<string>('all')
	const nav = useNavigate()
	const { cards } = useSelector((state: RootState) => state.signsData)
	const dispatch = useDispatch()
	return (
		<>
			<Tabs style={{
				gap: '16px'
			}}>
				{
					services.map(service => (
						<Tab
							isSelected={selectedService === service.key}
							variant='inline' key={service.key}
							onClick={() => setSelectedService(service.key)}>
							{service.name}
						</Tab>
					))
				}
			</Tabs>
			<Button
				onClick={() => nav(ROUTES_NAVBAR.createSigns)}
				style={{
					marginRight: 'auto'
				}}>
				Новое объявление
			</Button>
			{
				cards.map(card => (
					<SignsCard
						card={card}
						key={card.id}
						onDelete={() => dispatch(deleteSignsCard(card.id))}
						isMycard={true}
					/>
				))
			}
		</>
	)
}

export default Ads
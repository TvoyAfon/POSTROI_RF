import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import addCircleIcon from '../../../../../../assets/images/profile/add-circle.svg'
import pencilEditGrayIcon from '../../../../../../assets/images/profile/pencil-edit-gray.svg'
import { ROUTES_CATEGORY } from '../../../../../../routes/routes'
import Button from '../../../../../ui/Button/Button'
import Service from '../../../../UserProfile/ProfileComponents/ServicesAndPrices/Service'
import styles from '../../../../UserProfile/ProfileComponents/ServicesAndPrices/ServicesAndPrices.module.scss'
import { services } from '../../../../UserProfile/ProfileComponents/ServicesAndPrices/data'
import Tab from '../../../../ui/Tabs/Tab'
import Tabs from '../../../../ui/Tabs/Tabs'

const Services = () => {
	const [selectedService, setSelectedService] = useState<string>('building')
	const category = useMemo(() => services.find(s => s.key === selectedService), [selectedService])
	const nav = useNavigate()

	return (
		<>
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				width: '100%',
				paddingTop: 40
			}}>
				<Button icon={addCircleIcon}>
					Добавить услугу
				</Button>
				<Button onClick={() => nav(ROUTES_CATEGORY.editServicesInProfile)}>
					Редактировать услуги
				</Button>
			</div>
			<Tabs style={{
				gap: '16px'
			}}>
				{
					services.map(service => (
						<Tab isSelected={service.key === selectedService} variant='gray' key={service.key} onClick={() => setSelectedService(service.key)}>
							<span style={{ fontWeight: 600 }}>{service.name}</span>
							{
								service.key === selectedService
								&&
								<img src={pencilEditGrayIcon} />
							}
						</Tab>
					))
				}
			</Tabs>
			<ul className={styles['category__services']} style={{
				padding: '0px 32px 32px 32px'
			}}>
				{category?.services.map(service => (<Service key={service.name} {...service} />))}
			</ul>
		</>
	)
}

export default Services
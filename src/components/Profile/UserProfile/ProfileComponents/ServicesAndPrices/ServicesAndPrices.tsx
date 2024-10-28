import { useMemo, useState } from 'react'
import Tabs from '../../../ui/Tabs/Tabs'
import Category from './Category'
import Service from './Service'
import styles from './ServicesAndPrices.module.scss'
import { services } from './data'

const ServicesAndPrices = () => {
	const [selectedService, setSelectedService] = useState<string>('building')
	const category = useMemo(() => services.find(s => s.key === selectedService), [selectedService])

	return (
		<>
			<span style={{
				fontSize: '20px',
				fontWeight: 600
			}}>Услуги и цены</span>
			<Tabs style={{
				gap: '16px'
			}}>
				{
					services.map(service => (
						<Category isSelected={selectedService === service.key} onClick={() => setSelectedService(service.key)} {...service} />
					))
				}
			</Tabs>
			<ul className={styles['category__services']}>
				{category?.services.map(service => (<Service {...service} />))}
			</ul>
		</>
	)
}

export default ServicesAndPrices
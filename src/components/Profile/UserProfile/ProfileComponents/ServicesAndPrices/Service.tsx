import { CSSProperties, FC, useState } from 'react'
import styles from './ServicesAndPrices.module.scss'
import { IService } from './data'

interface ServiceProps extends IService {
	style?: CSSProperties
}

const Service: FC<ServiceProps> = ({ style = {}, name, numberOfServices, subcategories }) => {
	const [isSubCategoriesOpen, setIsSubCategoriesOpen] = useState<boolean>(false)
	const handleToggleOpen = () => setIsSubCategoriesOpen(!isSubCategoriesOpen)

	return (
		<li className={styles.category}>
			<div onClick={handleToggleOpen} style={style} className={styles['category__service']}>
				<span>{name}</span>
				<span>{numberOfServices} услуг</span>
			</div>
			{
				isSubCategoriesOpen
				&&
				<ul className={styles['category__service-subcategories']}>
					{
						subcategories.map(subcat => (
							<li className={styles['category__service-subcategory']}>
								<span>{subcat.name}</span>
								<span>{subcat.price} руб</span>
							</li>
						))
					}
				</ul>
			}
		</li>
	)
}

export default Service
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import arrow_back from '../../../../../assets/images/createOrder_img/arrow-left-02.svg'
import photo from '../../../../../assets/images/createOrder_img/Group 54.svg'
import { IDefaultModal } from '../../../../../interface/modal.props'
import { ROUTES_CATEGORY } from '../../../../../routes/routes'
import InputSelect from '../../../../ui/InputSelect/InputSelect'
import ToggleButton from '../../../../ui/ToggleButton/ToggleButton'
import CategoryVendorCard from './CategoryVendorCard/CategoryVendorCard'
import styles from './CategoryVendorInfo.module.scss'
import FilterVendor from './FilterVendor/FilterVendor'


export const dataExample = [
	{
		id: 1,
		name: 'ООО “Кирпичпостав”',
		img: photo,
		site: 'www.kirpi4.ru',
		address: 'г. Самара, Заводское шоссе 25/2',
		delivery: 'Самарская обл, Московская обл,'
	},
	{
		id: 2,
		name: 'ООО “Кирпичпостав”',
		img: photo,
		site: 'www.kirpi4.ru',
		address: 'г. Самара, Заводское шоссе 25/2',
		delivery: 'Самарская обл, Московская обл,'
	},
	{
		id: 3,
		name: 'ООО “Кирпичпостав”',
		img: photo,
		site: 'www.kirpi4.ru',
		address: 'г. Самара, Заводское шоссе 25/2',
		delivery: 'Самарская обл, Московская обл,'
	}
]

const CategoryVendorInfo: React.FC<IDefaultModal> = () => {
	const navigate = useNavigate()
	const [openFilter, setOpenFilter] = useState(false)

	const handleOpenFilter = () => {
		setOpenFilter(true)
	}

	const handleCloseModalFilter = () => {
		setOpenFilter(false)
	}


	return (
		<div className={styles['vendorInfoContainer_overlay']} style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
			<div className={styles.vendorInfoContainer} >
				<div style={{ paddingBottom: 24, display: 'flex', gap: 32 }} >
					<img style={{ cursor: 'pointer' }} onClick={() => navigate(ROUTES_CATEGORY.vendorsandmaterials)} src={arrow_back} alt="" />
					<span className='textSizeL' style={{ color: '#262626', whiteSpace: 'nowrap' }}>ПРОСМОТР ПОСТАВЩИКОВ</span>
				</div>
				<section style={{ display: 'flex', gap: 50, alignItems: 'center' }}>
					<div className='flex-column gap-small'>
						<span>Регионы поставки</span>
						<InputSelect bg='white' width='350px' value='Московская,Ставропольский' />
					</div>
					<div className='flex-column gap-small'>
						<span>Материалы</span>
						<InputSelect bg='white' width='350px' value='Выберите один или несколько' />
					</div>
					<div style={{ width: 180, height: 40, backgroundColor: 'white', borderRadius: 8, textAlign: 'center', marginTop: 22, display: 'flex', justifyContent: 'center' }}>
						<ToggleButton label='Проверенные' />
					</div>
					<div style={{ width: 153, height: 40, backgroundColor: 'white', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 22 }}>
						<FilterVendor stateValue={openFilter} onClose={handleCloseModalFilter} onOpen={handleOpenFilter} />
					</div>
				</section>
				<div className='flex-column' style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}>
					{
						dataExample.map((card) => (
							<Link key={card.id} style={{ color: 'inherit' }} to={`/createorder/vendors-and-materials/vendors/${card.id}`}>
								<CategoryVendorCard
									address={card.address}
									delivery={card.delivery}
									key={card.id}
									name={card.name}
									site={card.site}
									img={card.img}
								/>
							</Link>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default CategoryVendorInfo

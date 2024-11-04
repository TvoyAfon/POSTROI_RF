import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrow_back from '../../../../../assets/images/createOrder_img/arrow-left-02.svg'
import pensil_edit from '../../../../../assets/images/createOrder_img/pencil-edit-02.svg'
import gosUslugi from '../../../../../assets/images/other/gosUslugi.svg'
import { ROUTES_PATH } from '../../../../../routes/routes'
import Button from '../../../../ui/Button/Button'
import Line from '../../../../ui/Line/Line'
import { ICategoryVendorCard } from '../CategoryVendorCard/interface/ICategoryVendorCard'
import { dataExample } from '../CategoryVendorInfo'
import styles from '../CategoryVendorInfo.module.scss'

const CategoryVendorProfile: React.FC<ICategoryVendorCard> = () => {

	const navigate = useNavigate()
	return (
		<div className={styles['categoryVendorProfile_overlay']} style={{ paddingTop: 120, display: 'flex', justifyContent: 'center' }}>
			<div className={styles['categoryVendorProfile']} style={{ position: 'relative' }}>
				<div style={{ position: 'absolute', display: 'flex', gap: 32, top: -15 }}>
					<img onClick={() => navigate(ROUTES_PATH.vendors)} style={{ cursor: 'pointer' }} src={arrow_back} alt="arrow" />
					<span className='textSizeL' style={{ whiteSpace: 'nowrap' }}>
						ЛИЧНЫЙ КАБИНЕТ ПОСТАВЩИКА
					</span>
				</div>
			</div>
			<div className='flex-column' style={{ backgroundColor: 'white', padding: 32, borderRadius: 32, width: 1200, marginTop: 30 }}>
				<div style={{ display: 'flex', gap: 32 }}>
					<img src={dataExample[0].img} alt="logo" />
					<div className='flex-column gap-small'>
						<span className='textSizeL'>{dataExample[0].name}</span>
						<span style={{ fontSize: 16, fontWeight: 600 }} >{dataExample[0].address}</span>
						<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
							<span style={{ fontSize: 18, fontWeight: 800, color: '#7099ED' }}>{dataExample[0].site}</span>
							<img src={pensil_edit} alt="pensil" />
						</div>
						<div style={{ display: 'flex', gap: 8 }}>
							<Button onClick={() => navigate(`${ROUTES_PATH.vendorsProfileRequisistes}`)}>Реквизиты</Button>
							<Button style={{ backgroundColor: 'transparent', color: '#7099ED', border: '1px solid #7099ED' }}>
								<img src={gosUslugi} alt="gosUslugi" />
								<span>Подтвердить через Госуслуги</span>
							</Button>
						</div>
					</div>
				</div>
				<div className='flex-column '>
					<div className='flex-column gap-medium'>
						<span className='textSizeL'>Регионы поставки</span>
						<div style={{ display: 'flex', gap: 8 }}>
							<span>Кировская</span>
							<span>Архангельская</span>
							<span>Костромская</span>
						</div>
					</div>
					<Line lineWidth='100%' />
					<div className='flex-column gap-large'>
						<span className='textSizeL'>Поставляемые материалы:</span>
						<div>
							<span style={{ fontSize: 14, fontWeight: 600 }}>Отделочные материалы</span>
						</div>
						<div>
							<span style={{ fontSize: 14, fontWeight: 600 }}>Строительные материалы</span>
						</div>
						<div>
							<span style={{ fontSize: 14, fontWeight: 600 }}>Сантехника</span>
						</div>
						<div>
							<span style={{ fontSize: 14, fontWeight: 600 }}>Кровля и фасад</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CategoryVendorProfile

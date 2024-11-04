import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import arrow from '../../../../../assets/images/createOrder_img/arrow-left-02.svg'
import { ROUTES_CATEGORY } from '../../../../../routes/routes'
import { RootState } from '../../../../../store/store'
import UserLocation from '../../../../Navbar/UserLocation/UserLocation'
import CityAndRadius from '../../../../SearchOrder/SearchOrderHeader/CityAndRadius/CityAndRadius'
import Field from '../../../../ui/Field/Field'
import FilterVendor from '../../../CategoryType/CategoryVendorPage/FilterVendor/FilterVendor'
import PriceFromTo from '../ui/PriceFromTo'
import CardMasters from './CardMasters/CardMasters'
import MastersProfileIcon from './CardMasters/CardMastersDetail/ui/MastersProfileIcon'
import CardVakancy from './CardVakancy/CardVakancy'
import styles from './ShowMastersOrVakancy.module.scss'

const ShowMastersOrVakancy: React.FC = () => {
	const { isVakancy } = useSelector((state: RootState) => state.currentPageMastersType)
	const navigate = useNavigate()
	const [openMap, setOpenMap] = useState(false)
	return (
		<>
			{openMap && <UserLocation isOpenMap={openMap} handleCloseMap={() => setOpenMap(false)} />}
			<div className={styles['overlay_showMastersorVak']} style={{ paddingTop: 165, display: 'flex', justifyContent: 'center' }}>
				<div className={styles.showMastersOrVakancy}>
					<div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
						<div style={{ display: "flex", gap: 32, position: 'absolute', top: -60 }}>
							<img onClick={() => navigate(ROUTES_CATEGORY.workersAndMasters)} style={{ cursor: "pointer" }} src={arrow} alt="arrow" />
							<span className='textSizeL'>БИРЖА СПЕЦИАЛИСТОВ</span>
						</div>
						{isVakancy ? <MastersProfileIcon /> : null}
						<CityAndRadius
							setOpenSearchOrderMap={setOpenMap} />
						<Field placeholder='Должность' style={{ width: !isVakancy ? 368 : 162 }} />
						<PriceFromTo />
						<FilterVendor countStyle={{ top: -10, left: 130 }} style={{ backgroundColor: '#FFFF', borderRadius: 12, padding: 8, whiteSpace: 'nowrap' }} />
					</div>
					<div className={styles.showMastersOrVakancy_cards}>
						<div className='flex-column gap-medium' style={{ overflowY: 'scroll', height: 480 }}>
							{!isVakancy ? <>
								<CardMasters />
								<CardMasters />
								<CardMasters />
								<CardMasters />
							</> :
								<>
									<CardVakancy />
									<CardVakancy />
									<CardVakancy />
									<CardVakancy />
								</>}

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ShowMastersOrVakancy

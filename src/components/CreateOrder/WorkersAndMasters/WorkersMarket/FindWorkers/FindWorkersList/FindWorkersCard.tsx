import React, { useState } from 'react'
import img from '../../../../../../assets/images/other/indikator.svg'
import more_vertical from '../../../../../../assets/images/other/more-vertical-circle-01 (1).svg'
import styles from '../../../WorkersAndMaterials.module.scss'

import IconSignature from '../../../../../Profile/ui/IconSignature'
import CardOrderUser from '../../../../../SearchOrder/CardOrderInfo/CardOrderUser/CardOrderUser'
import SignsCardReviews from '../../../../../Signs/SignsCard/modal/user/SignsCardReviews'
import FindWorkersCardDetail from './FindWorkersCardDetail/FindWorkersCardDetail'


const text = 'Доброго времени суток. Меня зовут Руслан. Предоставляю услуги грузчиков, разнорабочихДоброго времени суток. Меня зовут Руслан. Предоставляю услуги грузчиков, разнорабочихДоброго времени суток. Меня зовут Руслан. Предоставляю услуги грузчиков, разнорабочихДоброго времени суток. Меня зовут Руслан. Предоставляю услуги грузчиков, разнорабочих'
const FindWorkersCard: React.FC = () => {

	const [openProfileDetail, setOpenProfileDetail] = useState(false)

	const handleCloseDetail = () => {
		setOpenProfileDetail(false)
	}


	return (
		<>
			<FindWorkersCardDetail stateValue={openProfileDetail} onClose={handleCloseDetail} />
			<div className={styles.findWorkersCard}>
				<div onClick={() => setOpenProfileDetail(true)} style={{ display: 'flex', gap: 18, cursor: 'pointer' }}>
					<img src={img} alt="indikator" />
					<CardOrderUser lastVisit='Был вчера' userName='Андрей К.' />
					<div className='flex-column gap-small'>
						<IconSignature >
							<span style={{ fontWeight: 800, fontSize: 16 }}> 4,7</span>
						</IconSignature>
						<SignsCardReviews reviewsCount='7' />
					</div>
					<span style={{ overflowY: 'hidden', height: 42 }}>{text}
					</span>
					<img src={more_vertical} alt="more" />
				</div>
			</div>
		</>
	)
}

export default FindWorkersCard

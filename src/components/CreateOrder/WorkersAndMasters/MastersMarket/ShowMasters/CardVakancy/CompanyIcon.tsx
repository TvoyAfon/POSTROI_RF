import React from 'react'
import checkmark_gray from '../../../../../../assets/images/other/checkmark-gray.svg'
import vakancy_img from '../../../../../../assets/images/other/vakancy_img.svg'
import { ICompanyIcon } from '../../../../../../interface/categoryCard.props'
import Rating from '../../../../../Profile/MyProfile/ui/Rating'
import RewievsAndQuestion from '../../../../../SearchOrder/CardOrderInfo/RewievsAndQuestions.tsx/RewievsAndQuestion'

const CompanyIcon: React.FC<ICompanyIcon> = ({ isCardInDetail = false }) => {
	return (
		<div style={!isCardInDetail ? { display: 'flex', gap: 16 } : { display: 'flex', flexDirection: 'column', gap: 32 }}>
			<div className={isCardInDetail ? 'flex-column gap-medium' : 'flex-column gap-verySmall'}>
				<img style={{ width: 40, height: 24 }} src={vakancy_img} alt="" />
				<span style={{ fontSize: 16, fontWeight: 800 }}>ООО “Стройтрест”</span>
				{!isCardInDetail && <span style={{ fontSize: 14, fontWeight: 400 }}>Ростов на Дону</span>}
			</div>
			{!isCardInDetail ? <img style={{ width: 20, height: 20 }} src={checkmark_gray} alt="" /> :
				<div style={{ display: "flex", gap: 32, alignItems: 'center' }}>
					<Rating rating={5} />
					<RewievsAndQuestion onlyRewievs={true} />
				</div>
			}
			{isCardInDetail && <span style={{ fontSize: 14, fontWeight: 400 }}>Ростов на Дону</span>}
		</div>
	)
}

export default CompanyIcon

import React from 'react'
import profile_icon from '../../../../../../../assets/images/createOrder_img/findworker_img.png'
import checkmark_svg from '../../../../../../../assets/images/other/checkmark-circle-02 (1).svg'
import loc_svg from '../../../../../../../assets/images/other/location-06.svg'
import { IDefaultModal } from '../../../../../../../interface/modal.props'
import IconSignature from '../../../../../../Profile/ui/IconSignature'
import Reviews from '../../../../../../Profile/UserProfile/ProfileComponents/Reviews/Reviews'
import SignsCardReviews from '../../../../../../Signs/SignsCard/modal/user/SignsCardReviews'
import CloseButton from '../../../../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../../../../ui/Modal/ModalContainer'

const FindWorkersCardDetail: React.FC<IDefaultModal> = ({ onClose, stateValue }) => {


	return (
		<>
			{stateValue && <ModalContainer isOnOverlay={true} zIndex={11} style={{ width: 1200, marginTop: 360, padding: '32px 32px 16px 32px' }}>
				<CloseButton style={{ float: 'right' }} onClick={onClose} />
				<div className='flex-column gap-medium-large'>
					<section style={{ display: 'flex', gap: 32 }}>
						<img style={{ width: 180, height: 228 }} src={profile_icon} alt="profile_icon" />
						<div className='flex-column gap-medium-large'>
							<div className='flex-column gap-small'>
								<span className='textSizeL'>ДМИТРИЙ Ш.</span>
								<span>Был на сайте позавчера</span>
							</div>
							<div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
								<IconSignature >
									<span style={{ fontWeight: 800, fontSize: 16 }}> 4,7</span>
								</IconSignature>
								<SignsCardReviews reviewsCount='7' />
							</div>
							<div className='flex-column gap-small'>
								<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
									<img src={loc_svg} alt="" />
									<span style={{ fontWeight: 700 }}>Кременчуг-Констаниновское</span>
								</div>
								<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
									<img src={checkmark_svg} alt="" />
									<span>Телефон подтвержден</span>
								</div>
								<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
									<img src={checkmark_svg} alt="" />
									<span>E-mail подтвержден</span>
								</div>
								<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
									<img src={checkmark_svg} alt="" />
									<span>Паспорт подтвержден</span>
								</div>
							</div>
						</div>
					</section>
					<div className='flex-column gap-small'>
						<span className='textSizeL'>О себе</span>
						<span>Не имею вредных привычек: не пью, не ворую, на каждую работу гарантия на год с договором</span>
					</div>
					<div className='flex-column gap-small'>
						<span className='textSizeL'>Опыт</span>
						<span>На сервисе с мая 2024 г. (1 год)</span>
					</div>
					<Reviews />
				</div>
			</ModalContainer>}</>
	)
}

export default FindWorkersCardDetail

import { useNavigate } from 'react-router-dom'
import checkmarkIcon from '../../../../assets/images/profile/checkmark-badge.svg'
import locationIcon from '../../../../assets/images/profile/location.svg'
import messageIcon from '../../../../assets/images/profile/message.svg'
import ratingStarCheckedIcon from '../../../../assets/images/profile/rating-star-checked.svg'
import Avatar from '../../../ui/Avatar/Avatar'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import IconSignature from '../../ui/IconSignature'
import Property from '../../ui/Property/Property'
import styles from '../UserProfile.module.scss'

interface IHeader {
	avatar: string,
	firstName?: string,
	lastName?: string,
	patronymic?: string,
	city?: string,
	phone?: string,
	email?: string,
	passportCheck: boolean | null | undefined
}


const Header: React.FC<IHeader> = ({ avatar, firstName, lastName, patronymic, city, phone, email, passportCheck }) => {

	const nav = useNavigate()
	return (
		<div className={styles['profile__info-header']}>
			<Avatar src={avatar} style={{
				width: '180px',
				height: '180px'
			}} />
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '16px'
			}}>
				<Property text='Был на сайте 16.04.2024 в 16:38' header={`${lastName} ${firstName} ${patronymic}`}
					headerStyle={{
						textTransform: 'uppercase'
					}} textStyle={{
						fontWeight: 700,
						color: '#8E8E93'
					}} />
				<div style={{
					display: 'flex',
					gap: '24px'
				}}>
					<IconSignature
						icon={ratingStarCheckedIcon}
						signatureStyle={{
							fontSize: '20px',
							fontWeight: 600
						}}>
						4,3
					</IconSignature>
					<IconSignature
						icon={messageIcon}
						style={{
							textTransform: 'uppercase',
							fontWeight: 700,
							fontSize: '16px'
						}}>
						45 Отзывов
					</IconSignature>
				</div>
				<IconSignature
					icon={locationIcon}
					signatureStyle={{
						fontWeight: 600,
						marginTop: '2px'
					}}>
					{city}
				</IconSignature>
				{phone && <IconSignature icon={checkmarkIcon} signatureStyle={{ marginTop: '2px' }}>
					Телефон подтверджён
				</IconSignature>}
				{email && <IconSignature icon={checkmarkIcon} signatureStyle={{
					marginTop: '2px'
				}}>
					E-mail подтверджён
				</IconSignature>}
				{passportCheck && <IconSignature icon={checkmarkIcon} signatureStyle={{
					marginTop: '2px'
				}}>
					Паспорт проверен
				</IconSignature>}
			</div>
			<CloseButton 
			onClick={() => nav(-1)}
			style={{
				marginLeft: 'auto'
			}} />
		</div>
	)
}

export default Header
import { CSSProperties } from 'react'
import { useSelector } from 'react-redux'
import yandexIcon from '../../../../assets/images/auth_images/image 40.png'
import mailRuIcon from '../../../../assets/images/auth_images/image 42.png'
import telegramLogo_img from '../../../../assets/images/other/TG LOGO.svg'
import vkLogo_img from '../../../../assets/images/other/VK LogoType.svg'
import MailRuAuth from '../../../../services/auth/authSocials/MailRu/MailRuAuth'

import TelegramBind from '../../../../services/auth/authSocials/Telegram/TelegramBind'
import VkAuth from '../../../../services/auth/authSocials/Vk/VkAuth'
import YandexAuth from '../../../../services/auth/authSocials/Yandex/YandexAuth'
import { RootState } from '../../../../store/store'
import EmailConfirmModal from '../Modals/EmailConfirmModal'
import PhoneConfirmModal from '../Modals/PhoneConfirmModal'
import EditField from '../ui/EditField'

const RightSide: React.FC<{ style?: CSSProperties }> = ({ style }) => {
	const { user } = useSelector((state: RootState) => state.auth) // Основной профиль

	return (
		<div style={{
			display: 'flex',
			marginLeft: 60,
			flexDirection: 'column',
			gap: '16px',
			...style,
		}}>
			<span style={{
				fontWeight: 600,
				fontSize: '20px',
			}}>контакты</span>
			<PhoneConfirmModal>
				<EditField
					styleMain={{ gap: 0 }}
					flexDirection
					name='Телефон'
					textField={user?.phone}
					buttonText={user?.phone ? 'Подтвержден' : 'Подтвердить'}
					textStyle={{ fontWeight: 700 }}
				/>
			</PhoneConfirmModal>
			<EmailConfirmModal>
				<EditField
					styleMain={{ gap: 0, paddingBottom: 16 }}
					flexDirection
					name='E-mail'
					buttonText={user?.email ? 'Подтвержден' : 'Подтвердить'}
					textField={user?.yandex_id ? ' ' : user?.email}
					textStyle={{ fontWeight: 700 }}
				/>
			</EmailConfirmModal>
			<section style={{ position: 'relative' }} className='flex-column gap-medium'>
				<div style={{ display: 'flex', gap: 16 }}>
					{!user?.mail_id ? (
						<div style={{ display: 'flex', gap: 8 }}>
							<img src={mailRuIcon} alt="Mail.ru icon" />
							<MailRuAuth isBind={true} >
								<span style={{ fontSize: 14, color: '#7099ED', cursor: 'pointer' }}>Привязать</span>
							</MailRuAuth>
						</div>
					) : (
						<div style={{ display: 'flex', gap: 8 }}>
							<img src={mailRuIcon} alt="Mail.ru confirmed" />
							<span style={{ fontSize: 14, color: '#7099ED' }}>Подтвержден</span>
						</div>
					)}
				</div>
				{!user?.telegram_id ? (
					<TelegramBind />
				) : (
					<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
						<img src={telegramLogo_img} alt="Telegram logo" />
						<span style={{ fontSize: 14, color: '#7099ED' }}>Подтвержден</span>
					</div>
				)}
				{!user?.yandex_id ? (
					<div style={{ display: 'flex', gap: 8, alignItems: 'center', position: 'relative' }}>
						<YandexAuth
							isBindYandex={true}
							style={{ left: -9, bottom: -10 }} />
						<span style={{ fontSize: 14, color: '#7099ED', cursor: 'pointer', paddingLeft: 28 }}>Привязать</span>
					</div>
				) : (
					<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
						<img src={yandexIcon} alt="Yandex" />
						<span style={{ fontSize: 14, color: '#7099ED' }}>Подтвержден</span>
					</div>
				)}
				{!user?.vk_id ? (
					<div>
						<VkAuth isBindVk={true} />
					</div>
				) : (
					<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
						<img src={vkLogo_img} alt="Yandex" />
						<span style={{ fontSize: 14, color: '#7099ED' }}>Подтвержден</span>
					</div>)}
			</section>
		</div>
	)
}

export default RightSide
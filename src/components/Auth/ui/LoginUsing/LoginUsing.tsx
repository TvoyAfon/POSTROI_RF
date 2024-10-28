import gosLogo_img from '../../../../assets/images/other/gosusluigi_svg.svg'
import MailRuAuth from '../../../../services/auth/authSocials/MailRu/MailRuAuth'

import emailLogo_img from '../../../../assets/images/other/mailru_svg.svg'
import TelegramButton from '../../../../services/auth/authSocials/Telegram/TelegramAuth'
import VkAuth from '../../../../services/auth/authSocials/Vk/VkAuth'
import YandexAuth from '../../../../services/auth/authSocials/Yandex/YandexAuth'

import styles from './LoginUsing.module.scss'

const LoginUsing = () => {
	return (
		<div>
			<div style={{ display: 'flex', flexDirection: 'row', columnGap: '10px' }}>
				<hr style={{ width: '145px' }} />
				<span>Или с помощью</span>
				<hr style={{ width: '145px' }} />
			</div>
			<div className={styles.logo}>
				<div>
					<VkAuth />
					<YandexAuth />
					<TelegramButton />
				</div>
				<img style={{ zIndex: 6, width: 20, height: 20 }} src={gosLogo_img} alt="gosLogo" />
				<MailRuAuth>
					<img src={emailLogo_img} alt="email" />
				</MailRuAuth>
			</div>
		</div>
	)
}

export default LoginUsing
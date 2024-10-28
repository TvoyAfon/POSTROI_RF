import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrow_left from '../../../../../../../assets/images/createOrder_img/arrow-left-02.svg'
import { ROUTES_PATH } from '../../../../../../../routes/routes'
import Button from '../../../../../../ui/Button/Button'
import Line from '../../../../../../ui/Line/Line'
import styles from './VendorRequesites.module.scss'

const VendorRequesites: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className={styles['vendorRequesites_overlay']} style={{ display: 'flex', justifyContent: 'center', paddingTop: 150, paddingBottom: 32 }}>
			<div className={styles.vendorRequesites}>
				<div style={{ position: 'absolute', top: -50, left: 10, display: 'flex', gap: 32 }}>
					<img onClick={() => navigate(`${ROUTES_PATH.vendorsProfile}`)} style={{ cursor: 'pointer' }} src={arrow_left} alt="arrow" />
					<span className='textSizeL'>РЕКВИЗИТЫ</span>
				</div>
				<section className='flex-column gap-large'>
					<div style={{ display: 'flex', gap: 32 }}>
						<Button style={{ backgroundColor: "#8E8E93" }}>Отправить реквизиты</Button>
						<Button onClick={() => navigate(`${ROUTES_PATH.vendorsProfileEditRequisistes}`)} >Редактировать</Button>
					</div>
					<div style={{ display: 'flex', gap: 16 }}>
						<span>Организационно-правовая форма:</span>
						<span style={{ fontSize: 16, fontWeight: 800 }}>Общество с ограниченой отвественорстью</span>
					</div>
					<Line lineWidth='100%' />
					<div style={{ display: 'flex', gap: 16 }}>
						<span>Полное наименование:</span>
						<span style={{ fontSize: 16, fontWeight: 800 }}>ООО Торговая компания “Альфа”</span>
					</div>
					<Line lineWidth='100%' />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
							<span>ИНН</span>
							<span style={{ fontSize: 16, fontWeight: 800 }}>1234567890</span>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
							<span>КПП</span>
							<span style={{ fontSize: 16, fontWeight: 800 }}>1234567890</span>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
							<span>ОГРН</span>
							<span style={{ fontSize: 16, fontWeight: 800 }}>1234567890</span>
						</div>
					</div>
					<Line lineWidth='100%' />
					<div style={{ display: 'flex', gap: 16 }}>
						<span>Дата создания организации:</span>
						<span style={{ fontSize: 16, fontWeight: 800 }}>17 апреля 2009</span>
					</div>
					<div style={{ display: 'flex', gap: 16 }}>
						<span>Система налогообложения:</span>
						<span style={{ fontSize: 16, fontWeight: 800 }}>ОСН</span>
					</div>
					<Line lineWidth='100%' />
					<div style={{ display: 'flex', gap: 16 }}>
						<span>Контактный телефон:</span>
						<span style={{ fontSize: 16, fontWeight: 800 }}>+7 123 356 78 90</span>
					</div>
					<div style={{ display: 'flex', gap: 16 }}>
						<span>E-mail:</span>
						<span style={{ fontSize: 16, fontWeight: 800 }}>qpieqweii@adaksdald.com</span>
					</div>
					<Line lineWidth='100%' />
					<div style={{ display: 'flex', gap: 16 }}>
						<span>Юридический адрес:</span>
						<span style={{ fontSize: 16, fontWeight: 800 }}>641776, Курганская обл, Половинскйи район, с. Булдак, ул. Школьная, дом. № 14 </span>
					</div>
					<div style={{ display: 'flex', gap: 16 }}>
						<span>Фактический адрес:</span>
						<span style={{ fontSize: 16, fontWeight: 800 }}>Совпадает с юридическим.</span>
					</div>
				</section>
			</div>
		</div>
	)
}

export default VendorRequesites

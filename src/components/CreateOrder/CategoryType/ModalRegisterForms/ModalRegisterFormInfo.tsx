import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrow from '../../../../assets/images/createOrder_img/arrow-left-02.svg'
import { arrInfoSection1 } from '../../../../common/createOrderRegisterModal'
import { IModalRegisterInfo } from '../../../../interface/modal.props'
import { ROUTES_CATEGORY } from '../../../../routes/routes'
import Button from '../../../ui/Button/Button'
import Field from '../../../ui/Field/Field'
import Line from '../../../ui/Line/Line'
import RadioButton from '../../../ui/RadioButton/RadioButton'
import ActualAddress from './AddressType/ActualAddress'
import LegalAddress from './AddressType/LegalAddress'
import styles from './ModalRegisterForms.module.scss'

const ModalRegisterFormInfo: React.FC<IModalRegisterInfo> = () => {

	const navigate = useNavigate()

	return (
		<div className={styles['modal_container_overlay']} style={{ display: 'flex', justifyContent: 'center', paddingTop: 150, marginBottom: 32 }}>
			<div className={styles.modal_container}>
				<div style={{ display: 'flex', gap: 32, position: 'absolute', top: '-2%', left: '0%' }}>
					<img onClick={() => navigate(ROUTES_CATEGORY.vendorsandmaterials)} style={{ cursor: 'pointer' }} src={arrow} alt="arrow" />
					<span className='textSizeL'>РЕГИСТРАЦИЯ ПОСТАВЩИКА</span>
				</div>
				{arrInfoSection1.map((field, index) => (
					<div key={index} style={{ display: 'flex', flexDirection: 'column', paddingBottom: 16 }}>
						<span style={{ fontSize: 16, fontWeight: 800, color: '#8E8E93' }}>{field}</span>
						<Field style={{ width: '100%' }} />
					</div>
				))}
				<section className='flex-column gap-medium' style={{ color: '#8E8E93', fontSize: 16, fontWeight: 800, paddingBottom: 16 }}>
					<span style={{ fontSize: 16, fontWeight: 800, color: '#8E8E93' }}>Система налогообложения*</span>
					<RadioButton label='ОСН' />
					<RadioButton label='УСН' />
					<div>
						<span style={{ fontSize: 16, fontWeight: 800, color: '#8E8E93' }}>Контактный телефон:</span>
						<Field placeholder='Пример заполнения: +7 123 4567890' style={{ width: '100%' }} />
					</div>
					<div>
						<span style={{ fontSize: 16, fontWeight: 800, color: '#8E8E93' }} >E-mail*</span>
						<Field style={{ width: '100%' }} />
						<span style={{ fontSize: 16, fontWeight: 300 }}>На указаный E-mail будет выслан код для регистрации на сайте.</span>
					</div>
					<div>
						<span style={{ fontSize: 16, fontWeight: 700, color: '#262626' }} >Сайт</span>
						<Field placeholder='www' style={{ width: '100%' }} /></div>
				</section>
				<Line lineWidth='100%' />
				<LegalAddress />
				<Line lineWidth='100%' />
				<ActualAddress />
				<Button style={{ width: 218, display: 'flex' }}>Зарегестрироваться</Button>
			</div>
		</div>
	)
}

export default ModalRegisterFormInfo

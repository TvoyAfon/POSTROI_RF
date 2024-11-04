import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrow from '../../../../../../../assets/images/createOrder_img/arrow-left-02.svg'
import { arrInfoSection1 } from '../../../../../../../common/createOrderRegisterModal'
import { ROUTES_CATEGORY } from '../../../../../../../routes/routes'
import Button from '../../../../../../ui/Button/Button'
import Field from '../../../../../../ui/Field/Field'
import Line from '../../../../../../ui/Line/Line'
import RadioButton from '../../../../../../ui/RadioButton/RadioButton'
import ActualAddress from '../../../../ModalRegisterForms/AddressType/ActualAddress'
import LegalAddress from '../../../../ModalRegisterForms/AddressType/LegalAddress'
import styles from '../../../../ModalRegisterForms/ModalRegisterForms.module.scss'

const VendorEditRequesites: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div style={{ display: 'flex', justifyContent: 'center', paddingTop: 150, marginBottom: 32 }}>
			<div className={styles.modal_container}>
				<div style={{ display: 'flex', gap: 32, position: 'absolute', top: '-2%', left: '0%' }}>
					<img onClick={() => navigate(ROUTES_CATEGORY.vendorsProfileRequisistes)} style={{ cursor: 'pointer' }} src={arrow} alt="arrow" />
					<span className='textSizeL'>РЕДАКТИРОВАНИЕ РЕКВИЗИТОВ</span>
				</div>
				{arrInfoSection1.map((field, index) => (
					<div key={index} className='flex-column gap-medium'>
						<span style={{ fontSize: 16, fontWeight: 800, color: '#8E8E93' }}>{field}</span>
						<Field style={{ width: '100%' }} />
					</div>
				))}
				<section className='flex-column gap-medium' style={{ color: '#8E8E93', fontSize: 16, fontWeight: 800, paddingBottom: 16 }}>
					<span>Система налогообложения*</span>
					<RadioButton label='ОСН' />
					<RadioButton label='УСН' />
					<span>Контактный телефон:</span>
					<Field placeholder='Пример заполнения: +7 123 4567890' style={{ width: '100%' }} />
					<span >E-mail*</span>
					<Field style={{ width: '100%' }} />
					<span style={{ fontSize: 16, fontWeight: 300 }}>На указаный E-mail будет выслан код для регистрации на сайте.</span>
					<span style={{ fontSize: 16, fontWeight: 700, color: '#262626' }} >Сайт</span>
					<Field placeholder='www' style={{ width: '100%' }} />
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

export default VendorEditRequesites

import React from 'react'
import { useSelector } from 'react-redux'

import { IModalSMS } from '../../../../interface/modal.props'

import { RootState } from '../../../../store/store'
import AuthRegisterDone from '../../../Auth/AuthRegister/AuthRegisterDone/AuthRegisterDone'
import ErrorSignature from '../../../Auth/ui/ErrorSignature'
import Button from '../../../ui/Button/Button'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import CodeInput from '../../../ui/CodeInput/CodeInput'
import Loader from '../../../ui/Loader/Loader'
import ModalContainer from '../../../ui/Modal/ModalContainer'
import styles from '../WorkersAndMaterials.module.scss'


const WorkersAndMastersModalSms: React.FC<IModalSMS> = ({ onClose, phoneValue, handleСontinue, handleCloseModal }) => {

	const { isOpenWorkerDone, isOpenMasterDone } = useSelector((state: RootState) => state.openWorkerDone)

	return (
		<>
			{isOpenWorkerDone || isOpenMasterDone ? <AuthRegisterDone style={{ top: 430, left: '49%' }} closeModal={handleCloseModal} /> :
				<>
					<ModalContainer style={{
						boxShadow: 'rgba(0, 0, 0, 0.08) 0px 10px 14px 0px, rgba(0, 0, 0, 0.05) 0px 2px 2px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px',
						border: '1px solid rgba(0, 0, 0, 0.2)'
					}} zIndex={12}>
						<div className={styles.workersModalSms}>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<span className='textSizeL'>РЕГИСТРАЦИЯ</span>
								<CloseButton onClick={onClose} />
							</div>
							<CodeInput fields={4} name='code-inpt' inputMode='tel' />
							<span style={{ textAlign: 'center', color: '#8E8E93' }}>Введите код из смс сообщения отправленого на номер <br /> {phoneValue}</span>
							<Button style={{
								display: 'flex',
								justifyContent: 'center'
							}} onClick={handleСontinue}>
								{true ? <Loader color='white' /> : 'Продолжить'}
							</Button >
							{
								true
								&&
								<ErrorSignature style={{
									textAlign: 'center',
									marginTop: '10px'
								}}>
									Неверный код
								</ErrorSignature>
							}
						</div>
					</ModalContainer>
				</>}
		</>
	)
}

export default WorkersAndMastersModalSms

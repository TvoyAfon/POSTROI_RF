import { FC } from 'react'
import arrowRightIcon from '../../../../../../assets/images/chat_images/arrow-right.svg'
import Button from '../../../../../ui/Button/Button'
import BaseModal from '../../../../../ui/Modal/BaseModal'
import ModalHeader from '../../../../../ui/Modal/ModalHeader'
import Textarea from '../../../../../ui/Textarea/Textarea'
import { IModalProps } from '../props'

const Report: FC<IModalProps> = ({ isOpen, onClose }) => {
	return (
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
			style={{
				flexDirection: 'column',
				gap: '32px',
				width: '560px'
			}}
		>
			<ModalHeader onClose={onClose} text='Жалоба на пользователя' style={{
				textTransform: 'none',
				marginTop: '2px'
			}} />
			<Textarea placeholder='Опишите ситуацию' style={{
				width: '496px',
				height: '204px',
				fontSize: '16px'
			}}></Textarea>
			<Button rightIcon={arrowRightIcon} style={{
				marginLeft: 'auto'
			}}>
				Отправить
			</Button>
		</BaseModal>
	)
}

export default Report
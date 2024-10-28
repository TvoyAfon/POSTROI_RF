import React from 'react'
import { IDefaultModal } from '../../../../interface/modal.props'
import Button from '../../../ui/Button/Button'
import Loader from '../../../ui/Loader/Loader'
import ModalContainer from '../../../ui/Modal/ModalContainer'

interface ISignsCardDeleteConfirm extends IDefaultModal {
	isLoading?: boolean,
	isOverlay?: boolean
}

const SignsCardDeleteConfirm: React.FC<ISignsCardDeleteConfirm> = ({ onClose, onDelete, cardType, isLoading = false, isOverlay = true }) => {

	return (
		<ModalContainer style={{ width: 430, position: "fixed" }} isOnOverlay={isOverlay} zIndex={13}>
			<div className='flex-column'>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className='flex-column gap-small' style={{
						textTransform: 'uppercase'
					}}>
						<span style={{ fontSize: 20, fontWeight: 600, textAlign: 'center' }}>Вы точно хотите удалить {cardType}?</span>
					</div>
				</div>
				<div style={{ display: 'flex', gap: '32px', justifyContent: 'center' }}>
					<Button variant='gray' style={{ width: 150 }} onClick={onClose}>Отмена</Button>
					<Button onClick={onDelete} style={{ width: 150 }}>
						{
							isLoading
								? <Loader color='#fff' />
								: 'Удалить'
						}

					</Button>
				</div>
			</div>
		</ModalContainer>
	)
}

export default SignsCardDeleteConfirm

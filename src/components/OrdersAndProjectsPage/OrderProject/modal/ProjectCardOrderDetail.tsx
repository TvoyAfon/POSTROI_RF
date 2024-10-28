import React from 'react'
import useStopScrolling from '../../../../hooks/useStopScrolling'
import { IDefaultModal } from '../../../../interface/modal.props'
import CloseButton from '../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../ui/Modal/ModalContainer'

const ProjectCardOrderDetail: React.FC<IDefaultModal> = ({ onClose, stateValue }) => {
	useStopScrolling(stateValue!)
	return (
		<>
			{stateValue &&
				<ModalContainer zIndex={11} style={{ width: 650, height: 650, position: 'fixed', top: '50%' }} isOnOverlay={true}>
					<div className='flex-column gap-large'>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span className='textSizeL'>ГРУЗОВАЯ ГАЗЕЛЬ 001</span>
							<CloseButton onClick={onClose} />
						</div>
					</div>
				</ModalContainer>}
		</>
	)
}

export default ProjectCardOrderDetail

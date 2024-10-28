import React from 'react'
import CloseButton from '../../../../ui/CloseButton/CloseButton'
import ModalContainer from '../../../../ui/Modal/ModalContainer'

const SearchOrderFilterDetail: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	return (
		<ModalContainer isOnOverlay={true} zIndex={11}>
			<div>
				<CloseButton onClick={onClose} />
			</div>
		</ModalContainer>
	)
}

export default SearchOrderFilterDetail

import { FC } from 'react'
import addCircleIcon from '../../../../assets/images/chat_images/add-circle-gray.svg'
import Button, { IButton } from '../../../ui/Button/Button'
import CreateGroupModal from '../Conversation/Modals/CreateGroup/CreateGroupModal'

interface ICreateGroupProps extends IButton {
	projectId?: number
}

const CreateGroup: FC<ICreateGroupProps> = ({
	style = {},
	projectId,
	variant = 'total-white',
	...props
}) => {
	return (
		<CreateGroupModal projectId={projectId}>
			<Button icon={addCircleIcon} variant={variant} style={{
				padding: '16px',
				fontWeight: 700,
				color: '#8E8E93',
				justifyContent: 'normal',
				gap: '16px',
				...style
			}} {...props}>Создать группу</Button>
		</CreateGroupModal>
	)
}

export default CreateGroup
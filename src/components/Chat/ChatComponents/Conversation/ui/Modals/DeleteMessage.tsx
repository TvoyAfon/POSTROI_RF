import { FC, useState } from 'react'
import { messageService } from '../../../../../../services/chat/message'
import ErrorSignature from '../../../../../Auth/ui/ErrorSignature'
import Button from '../../../../../ui/Button/Button'
import Loader from '../../../../../ui/Loader/Loader'
import BaseModal from '../../../../../ui/Modal/BaseModal'

interface IDeleteMessage {
	messageId?: number
	isOpen: boolean
	onClose: () => void
}

const DeleteMessage: FC<IDeleteMessage> = ({ messageId, isOpen, onClose }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isDeleteFailed, setIsDeleteFailed] = useState<boolean>(false)

	const handleDelete = async () => {
		if (!messageId) return

		try {
			setIsLoading(true)
			await messageService.deleteMessage(messageId)

			onClose()
		} catch (error: any) {
			if (error.message.includes("Can't send message")) {
				setIsDeleteFailed(true)
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<BaseModal isOpen={isOpen}>
			<div style={{
				display: 'flex',
				flexDirection: 'column', gap: '32px',
				width: '436px',
				textAlign: 'center'
			}}>
				<span style={{
					fontWeight: 600,
					fontSize: '20px',
					textTransform: 'uppercase'
				}}>Удалить сообщение?</span>

				<div style={{
					display: 'flex',
					gap: '32px',
					justifyContent: 'center'
				}}>
					<Button onClick={onClose} variant='orange' style={{
						width: '170px',
						fontSize: '14px',
						fontWeight: 400
					}}>
						Отмена
					</Button>
					<Button onClick={handleDelete} style={{
						width: '170px',
						fontSize: '14px',
						fontWeight: 400
					}}>
						{
							isLoading
								?
								<Loader color='#fff' />
								:
								'Удалить'
						}
					</Button>
				</div>
				{
					isDeleteFailed
					&&
					<ErrorSignature style={{
						marginTop: '10px'
					}}>
						Удалить сообщение у всех можно только в течении часа после отправки.
					</ErrorSignature>
				}
			</div>
		</BaseModal>
	)
}

export default DeleteMessage
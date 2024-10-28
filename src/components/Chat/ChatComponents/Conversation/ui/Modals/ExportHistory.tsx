import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { exportService } from '../../../../../../services/chat/export'
import { RootState } from '../../../../../../store/store'
import Button from '../../../../../ui/Button/Button'
import Loader from '../../../../../ui/Loader/Loader'
import BaseModal from '../../../../../ui/Modal/BaseModal'
import { IModalProps } from '../../Modals/props'

const ExportHistory: FC<IModalProps> = ({ isOpen, onClose }) => {
	const { selectedChatId } = useSelector((state: RootState) => state.chat)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleExport = async () => {
		try {
			if (!selectedChatId) return

			setIsLoading(true)
			await exportService.exportChatHistory(selectedChatId)

			setIsLoading(false)
			onClose && onClose()
		} catch (error) {
		}
	}

	return (
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
		>
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
				}}>
					Экспортировать историю?
				</span>
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
					<Button onClick={handleExport} style={{
						width: '170px',
						fontSize: '14px',
						fontWeight: 400
					}}>
						{
							isLoading
								? <Loader color='#fff' />
								: 'Экспортировать'
						}

					</Button>
				</div>
			</div>
		</BaseModal>
	)
}

export default ExportHistory
import { useModal } from '../../../../../../hooks/useModal'
import AddToChat from '../../Modals/AddToChat/AddToChat'
import MoveToArchive from '../../Modals/MoveToArchive/MoveToArchive'
import Report from '../../Modals/Report/Report'
import DeleteContact from '../Modals/DeleteContact'
import ExportHistory from '../Modals/ExportHistory'

export const usePopupGeneralModals = () => {
	const exportHistoryModal = useModal()
	const reportModal = useModal()
	const archiveModal = useModal()
	const addToChatModal = useModal()
	const deleteContactModal = useModal()

	return {
		modals: [
			{
				state: exportHistoryModal,
				component: ExportHistory
			},
			{
				state: reportModal,
				component: Report
			},
			{
				state: archiveModal,
				component: MoveToArchive
			},
			{
				state: addToChatModal,
				component: AddToChat
			},
			{
				state: deleteContactModal,
				component: DeleteContact
			},
		],
		exportHistoryModal,
		reportModal,
		addToChatModal,
		deleteContactModal,
		archiveModal
	}
}
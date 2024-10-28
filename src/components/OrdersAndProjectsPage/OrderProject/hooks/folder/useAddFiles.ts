
import { useDispatch } from 'react-redux'
import { projectService } from '../../../../../services/project/project.service'
import { setTriggerAddFiles } from '../../../../../store/slices/other/triggerFetch'

export const useAddFiles = (folder_id: number, project_id: number) => {
	const dispatch = useDispatch()
	const addFiles = async (file_data: File | undefined) => {
		if (!file_data) {
			alert('Файл не выбран.')
			return
		}

		try {
			const formData = new FormData()
			formData.append('file_data', file_data)
			await projectService.addFile(folder_id, project_id, formData)
			dispatch(setTriggerAddFiles())
		} catch (error) {
			alert('Не удалось загрузить файл')
		}
	}

	return { addFiles }
}
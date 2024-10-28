import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { projectService } from '../../../../../services/project/project.service'
import { RootState } from '../../../../../store/store'
import { IFolderData } from '../../types/projectTypes'


export const useGetFolderById = (folder_id: number, project_id: number) => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [folderData, setFolderData] = useState<IFolderData>()
	const { triggerRenameFolder } = useSelector((state: RootState) => state.triggerFetch)

	useEffect(() => {
		const getFolder = async () => {
			try {
				setError(false)
				setLoading(true)
				const response: IFolderData = await projectService.getFolderById(folder_id, project_id)
				setFolderData(response)
			} catch (error) {
				setError(true)
				setLoading(false)
			}
			finally {
				setLoading(false)
			}
		}
		getFolder()
	}, [triggerRenameFolder])
	return { loading, error, folderData }
}
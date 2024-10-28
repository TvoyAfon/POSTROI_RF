import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { projectService } from '../../../../../services/project/project.service'
import { RootState } from '../../../../../store/store'
import { IFilesInProject } from '../../types/projectTypes'

export const useGetFiles = (folder_id: number, project_id: number) => {
	const [loading, setLoading] = useState(false)
	const [files, setFiles] = useState<IFilesInProject[]>()
	const { triggerAddFiles } = useSelector((state: RootState) => state.triggerFetch)

	useEffect(() => {
		const getFiles = async () => {
			try {
				setLoading(true)
				const response: IFilesInProject[] = await projectService.getFiles(folder_id, project_id)
				setFiles(response)
			} catch (error) {
				setLoading(false)
			}
			finally {
				setLoading(false)
			}
		}
		getFiles()
	}, [triggerAddFiles])
	return { loading, files }
} 

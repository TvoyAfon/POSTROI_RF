import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { projectService } from '../../../../../services/project/project.service'
import { RootState } from '../../../../../store/store'
import { IFolderProject } from '../../types/projectTypes'

export const useGetFolders = (project_id: number) => {

	const [loading, setLoading] = useState(false)
	const [folders, setFolders] = useState<IFolderProject[]>([])
	const { triggerCreateFolder, triggerDeleteFolder } = useSelector((state: RootState) => state.triggerFetch)

	useEffect(() => {
		const getFolders = async () => {
			try {
				setLoading(true)
				const response: IFolderProject[] = await projectService.getFolders(project_id)
				setFolders(response)
			} catch (error) {
				setLoading(false)
			}
			finally {
				setLoading(false)
			}
		}
		getFolders()
	}, [triggerCreateFolder, triggerDeleteFolder, project_id])
	return { loading, folders }
}
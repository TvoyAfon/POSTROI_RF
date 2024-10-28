import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { projectService } from '../../../../services/project/project.service'
import { RootState } from '../../../../store/store'
import { IProjectCardById } from '../types/projectTypes'

export const useGetProjectById = (project_id: number) => {
	const [error, setError] = useState(false)
	const [data, setData] = useState<IProjectCardById | null>(null)
	const [loadingById, setLoading] = useState(false)
	const { triggerConfirmNameProject, triggerUpdatePhoto } = useSelector((state: RootState) => state.triggerFetch)

	useEffect(() => {
		const getProjectById = async () => {
			try {
				setError(false)
				setLoading(true)
				const response: IProjectCardById = await projectService.getProjectById(project_id)
				setData(response)
			} catch (error) {
				setLoading(false)
				setError(true)
				console.log('Не удалось получить данные', error)
			}
			finally {
				setLoading(false)
			}
		}
		getProjectById()
	}, [triggerConfirmNameProject, triggerUpdatePhoto])

	return { error, data, loadingById }
}


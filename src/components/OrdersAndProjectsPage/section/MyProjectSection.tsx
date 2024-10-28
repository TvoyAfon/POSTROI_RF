import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addProjects } from '../../../store/slices/ProjectsSlice/ProjectsSlice'
import { setCountProjects } from '../../../store/slices/other/countProjects'
import Loader from '../../ui/Loader/Loader'
import OrderProjectCard from '../OrderProject/OrderProjectCard'
import { IProjectCard } from '../OrderProject/types/projectTypes'

const MyProjectSection: React.FC<{ data: any, isLoading: boolean }> = ({ data, isLoading }) => {


	const projects: IProjectCard[] = data
	const dispatch = useDispatch()

	useEffect(() => {
		if (!projects?.length) return
		dispatch(setCountProjects(projects.length))
		dispatch(addProjects(projects))
	}, [projects])

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
			{!isLoading ? (
				projects.length ? (
					projects.map(project => (
						<OrderProjectCard
							key={project.project_id}
							project={project} />
					))
				) : (
					<div style={{ textAlign: 'center' }} className='textSizeL'>Нет проектов</div>
				)
			) : (
				<Loader text='Загрузка проектов...' />
			)}
		</div>
	)
}

export default MyProjectSection
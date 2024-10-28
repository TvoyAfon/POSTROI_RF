import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import arrow_back from '../../../../assets/images/createOrder_img/arrow-left-02.svg'
import { ROUTES_AUTHED_NAVBAR } from '../../../../routes/routes'
import { projectService } from '../../../../services/project/project.service'
import AddSmthCard from '../../../ui/AddSmthCard/AddSmthCard'
import Loader from '../../../ui/Loader/Loader'
import ProjectAddOrder from '../card/ProjectAddOrder'
import ProjectCardForOrder from '../card/ProjectCardforOrder'
import ProjectCardGroup from '../card/ProjectCardGroup'
import ProjectParticipantCard from '../card/ProjectParticipant/ProjectParticipantCard'
import { useGetProjectById } from '../hooks/useGetProjectById'
import styles from '../OrderProject.module.scss'
import { IFolderProject } from '../types/projectTypes'
import Directory from './Directory/Directory'
import HeaderProject from './HeaderProject'
const NewOrderProject: React.FC = () => {
	const { id } = useParams()
	const nav = useNavigate()
	const { loadingById } = useGetProjectById(Number(id))

	const { data, isLoading } = useQuery({
		queryKey: ['folders'],
		queryFn: () => projectService.getFolders(Number(id)),
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	})

	const folders: IFolderProject[] = data

	const renderSection = (title: string, children: React.ReactNode) => (
		<div className='flex-column gap-small'>
			<span className='textSizeL'>{title}</span>
			<section style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
				{children}
			</section>
		</div>
	)

	return (
		<div className={styles['newOrderProject_overlay']} style={{ display: 'flex', justifyContent: 'center' }}>
			<div className={styles['newOrderProject']}>
				{loadingById ? <Loader style={{ position: 'absolute', right: '48%' }} text='Обновление...' /> : null}
				<img onClick={() => nav(ROUTES_AUTHED_NAVBAR.ordersAndProjects)} style={{ width: 20, height: 20, cursor: 'pointer' }} src={arrow_back} alt="arrow" />
				<HeaderProject id={Number(id)} />

				{renderSection('Заказы', (
					<>
						<ProjectCardForOrder />
						<ProjectAddOrder />
					</>
				))}

				{renderSection('Участники проекта', (
					<>
						<ProjectParticipantCard />
						<AddSmthCard
							projectId={Number(id)}
							isCurrentModal='participant'
							addText='Добавить участника' />
					</>
				))}

				{renderSection('Группы проекта', (
					<>
						<ProjectCardGroup />
						<AddSmthCard isCurrentModal='group' addText='Добавить группу' />
					</>
				))}

				{renderSection('Файлы и документы проекта', (
					<>
						{
							!isLoading ? (
								folders && folders.length !== 0 ? (
									folders.map(folder => (
										<Directory
											projectId={Number(id)}
											folder={folder}
											key={folder.folder_id} />
									))
								) : null
							) : (
								<Loader text='Загрузка папок...' />
							)
						}

						<AddSmthCard
							projectId={Number(id)}
							isCurrentModal='projectFolder'
							circleStyle={{ position: 'absolute' }}
							addText=''
							style={{ width: 78 }} />
					</>
				))}
			</div>
		</div>
	)
}

export default NewOrderProject
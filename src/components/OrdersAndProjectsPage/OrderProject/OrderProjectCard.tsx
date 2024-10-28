import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import pattern from '../../../assets/images/other/patterns 4.svg'
import settings_project from '../../../assets/images/other/settings-02 (1).svg'
import { useModal } from '../../../hooks/useModal'
import { ROUTES_CATEGORY } from '../../../routes/routes'
import { setTriggerDeleteProject } from '../../../store/slices/other/triggerFetch'
import SignsCardDeleteConfirm from '../../Signs/SignsCard/modal/SignsCardDeleteConfirm'
import { useDeleteProject } from './hooks/useDeleteProject'
import ProjectCardPopup from './modal/projectCardPopup/ProjectCardPopup'
import styles from './OrderProject.module.scss'
import { IProjectCard } from './types/projectTypes'

const OrderProjectCard: React.FC<{ project: IProjectCard }> = ({ project }) => {
	const { handleClose, handleOpen, isOpen } = useModal()
	const [openDelete, setOpenDelete] = useState(false)
	const { deleteProject, error } = useDeleteProject(project.project_id)
	const nav = useNavigate()
	const dispatch = useDispatch()

	const handleDeleteProject = async () => {
		if (!error) setOpenDelete(false)
		if (error) return
		await deleteProject()
		dispatch(setTriggerDeleteProject())
	}


	const handleOpenPopup = (e: React.MouseEvent<HTMLImageElement>) => {
		e.stopPropagation()
		handleOpen()
	}
	return (
		<div
			onClick={!isOpen && !openDelete ?
				() => nav(`${ROUTES_CATEGORY.ordersAndProjectsNewProject.replace(':id', String(project.project_id))}`) : undefined}
			style={{ backgroundColor: project.is_finished ? '#4F4F55' : '#7099ED' }}
			className={styles.projectCard}>
			<img style={{ width: 85, height: 78 }}
				src={project.preview_image === null ? pattern : project.preview_image as string}
				alt='project_img' />
			<div
				className='flex-column gap-small'
				style={{ padding: 8 }}>
				<span
					className='textSizeL'
					style={{ color: 'white', whiteSpace: 'nowrap' }}>{project.name}
				</span>
				<img
					onClick={handleOpenPopup}
					src={settings_project}
					alt="settings" />
				<span
					style={{
						color: '#fff',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						width: 500
					}}>{project.description}
				</span>
			</div>
			{isOpen &&
				<ProjectCardPopup
					onOpenModalConfirm={() => setOpenDelete(true)}
					project_id={project.project_id}
					onClose={handleClose} />}
			{
				openDelete &&
				<SignsCardDeleteConfirm
					cardType={project.name}
					onDelete={handleDeleteProject}
					onClose={() => setOpenDelete(false)} />
			}
		</div>
	)
}

export default OrderProjectCard

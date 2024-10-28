import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import edit_img from '../../../../assets/images/createOrder_img/pencil-edit-02.svg'
import { projectService } from '../../../../services/project/project.service'
import { setTriggerConfirmNameProject } from '../../../../store/slices/other/triggerFetch'
import { RootState } from '../../../../store/store'
import CardOrderUser from '../../../SearchOrder/CardOrderInfo/CardOrderUser/CardOrderUser'
import Button from '../../../ui/Button/Button'
import Field from '../../../ui/Field/Field'
import { useUpdateProject } from '../hooks/useUpdateProject'
import ImageProject from './ImageProject'


const HeaderProject: React.FC<{ id: number }> = ({ id }) => {
	const [openEditName, setOpenEditName] = useState(false)
	const [openEditDesc, setOpenEditDesc] = useState(false)

	const { data } = useQuery({
		queryKey: ['dataProjects', id],
		queryFn: () => projectService.getProjectById(id),
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	})

	const dispatch = useDispatch()
	const { user } = useSelector((state: RootState) => state.auth)
	const [changeFields, setChangeFields] = useState({
		name: '',
		description: ''
	})

	const handleChangeFields = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target
		setChangeFields(prev => ({
			...prev,
			[name]: value
		}))
	}
	const { updateProject } = useUpdateProject(id, {
		name: openEditName ? changeFields.name : undefined,
		description: openEditDesc ? changeFields.description : undefined
	})

	const handleConfirmName = async () => {

		try {
			await updateProject()
			setOpenEditName(false)

		} catch (error) {
			alert('Не удалось изменить название')
		}
		dispatch(setTriggerConfirmNameProject())
	}

	const handleDescription = async () => {
		try {
			await updateProject()
			setOpenEditDesc(false)

		} catch (error) {
			alert('Не удалось изменить описание')
		}
		dispatch(setTriggerConfirmNameProject())
	}

	return (

		<div style={{ display: 'flex', gap: 24 }}>
			<ImageProject
				prewiev_photo={data?.preview_image}
				project_id={id} />
			<div style={{ gap: 20 }} className='flex-column'>
				{!openEditName ?
					<div style={{ display: 'flex', gap: 8 }}>
						<span className='textSizeL'>{data?.name}</span>
						<img onClick={() => setOpenEditName(true)} style={{ cursor: 'pointer' }} src={edit_img} alt="edit" />
						<span style={{ fontSize: 14, color: '#8E8E93' }}>Придумайте название для вашего проекта</span>
					</div> : <div style={{ display: "flex", gap: 10 }}>
						<Field
							name='name'
							value={changeFields.name}
							onChange={handleChangeFields}
							style={{ width: 790 }} />
						<Button
							style={{ height: 40 }}
							onClick={handleConfirmName}>Подтвердить</Button>
					</div>
				}
				{!openEditDesc ? <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ fontSize: 16 }}>{data?.description}</span>
					<img
						onClick={() => setOpenEditDesc(true)}
						style={{ cursor: 'pointer' }}
						src={edit_img}
						alt="edit" />
					<span style={{ fontSize: 14, color: '#8E8E93' }}>Краткое описание проекта</span>
				</div> :
					<div style={{ display: "flex", gap: 10 }}>
						<Field
							name='description'
							value={changeFields.description}
							onChange={handleChangeFields}
							style={{ width: 790 }} />
						<Button
							style={{ height: 40 }}
							onClick={handleDescription}>Подтвердить</Button>
					</div>
				}
				<div style={{ backgroundColor: '#F4F3F1', padding: 7, borderRadius: 8, width: 950 }}>
					<CardOrderUser
						lastVisit='На сайте'
						userAvatar={user?.profile_photo as string}
						userName={`${user?.first_name} 
						${user?.last_name ?
								user.last_name[0] + '.' : ''}`} />
				</div>
			</div>
		</div>

	)
}

export default HeaderProject

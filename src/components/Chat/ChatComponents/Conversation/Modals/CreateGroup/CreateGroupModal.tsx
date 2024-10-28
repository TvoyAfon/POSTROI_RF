import { FC, FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { useModal } from '../../../../../../hooks/useModal'
import { PropsWithJsxElement } from '../../../../../../interface/modal.props'
import { groupService } from '../../../../../../services/chat/group'
import { RootState } from '../../../../../../store/store'
import Button from '../../../../../ui/Button/Button'
import Field from '../../../../../ui/Field/Field'
import Loader from '../../../../../ui/Loader/Loader'
import BaseModal from '../../../../../ui/Modal/BaseModal'
import ModalHeader from '../../../../../ui/Modal/ModalHeader'
import ColorSelector from '../../ui/ColorSelector'
import InviteToGroup from '../InviteToGroup/InviteToGroup'

interface ICreateGroupModal extends PropsWithJsxElement {
	projectId?: number
}

const CreateGroupModal: FC<ICreateGroupModal> = ({ projectId, children }) => {
	const { handleOpen, handleClose, isOpen } = useModal()
	const [groupName, setGroupName] = useState<string>('')
	const { user } = useSelector((state: RootState) => state.auth)
	const [invitedIds, setInvitedIds] = useState<number[]>([])
	const [groupColor, setGroupColor] = useState<string>('#231F20')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!groupName.trim() || !user) return

		try {
			setIsLoading(true)
			await groupService.createGroup(
				{
					type_n: 'services',
					type_number: 23,
					status: 'open',
					group_name: groupName,
					invited_users_ids: invitedIds,
					member_owner_id: Number(user?.id),
					group_color: groupColor,
					project_id: projectId
				}
			)
		} catch (error) {

		}
		finally {
			setIsLoading(false)
			handleClose()
		}
	}

	const handleChangeContacts = (ids: number[]) => setInvitedIds(ids)

	return (
		<>
			<children.type {...children.props} onClick={handleOpen} />
			<BaseModal
				style={{
					flexDirection: 'column',
					gap: '32px',
					width: '850px'
				}}
				isOpen={isOpen}
				onClose={handleClose}
			>
				<ModalHeader onClose={handleClose} text='новая группа' style={{
					marginTop: '5px'
				}} />
				<form onSubmit={handleSubmit} style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '32px'
				}}>
					<Field
						value={groupName}
						onChange={e => setGroupName(e.target.value)}
						label='Название группы'
						placeholder='Название'
						style={{ width: '100%' }}
					/>
					<ColorSelector
						selectedColor={groupColor}
						changeColor={color => setGroupColor(color)}
						title='Цвет группы'
					/>
					<div style={{
						display: 'flex',
						gap: '32px',
					}}>
						<InviteToGroup onChangeContacts={handleChangeContacts}>
							<Button type='button' variant='gray' style={{
								fontSize: '14px',
								width: '300px'
							}}>
								Пригласить в группу
							</Button>
						</InviteToGroup>
						<Button style={{
							width: '100%',
							fontSize: '14px'
						}}>
							{
								isLoading
									? <Loader color='#fff' />
									: 'Создать'
							}
						</Button>
					</div>
				</form>
			</BaseModal>
		</>
	)
}

export default CreateGroupModal
import { FC, useEffect, useState } from 'react'
import { useModal } from '../../../../../../hooks/useModal'
import { PropsWithJsxElement } from '../../../../../../interface/modal.props'
import { IUserInfo } from '../../../../../../services/auth/common/types'
import { contactsService } from '../../../../../../services/chat/contacts'
import NoAvatar from '../../../../../Profile/ui/NoAvatar'
import Button from '../../../../../ui/Button/Button'
import CheckboxButton from '../../../../../ui/CheckboxButton/CheckboxButton'
import BaseModal from '../../../../../ui/Modal/BaseModal'
import ModalHeader from '../../../../../ui/Modal/ModalHeader'
import NoContacts from '../../../ChatList/ui/NoContacts'

interface InviteToGroupProps extends PropsWithJsxElement {
	onChangeContacts?: (ids: any) => void
	exceptions?: number[]
}

export interface IContact extends IUserInfo {
	isSelected?: boolean
}

const InviteToGroup: FC<InviteToGroupProps> = ({ children, onChangeContacts, exceptions }) => {
	const { handleClose, handleOpen, isOpen } = useModal()
	const [contacts, setContacts] = useState<IContact[]>([])

	useEffect(() => {
		(async () => {
			try {
				const data = await contactsService.getMyContacts()
				if (!data) return

				setContacts(data.contacts)
			} catch (error: any) { }
		})()
	}, [])

	const handleSubmit = () => {
		const contactsIds = contacts
			.map(item => item.isSelected && item.id)
			.filter(item => item !== false && item !== undefined)

		onChangeContacts && onChangeContacts(contactsIds)
		handleClose()
	}

	const handleSelect = (id: number) => {
		setContacts(prev => prev.map(item => {
			if (item.id !== id) return item

			return {
				...item,
				isSelected: !item.isSelected
			}
		}))
	}

	const handleSelectAll = (state: boolean) => {
		setContacts(prev => prev.map(item => {
			return {
				...item,
				isSelected: state
			}
		}))
	}

	return (
		<>
			<children.type {...children.props} onClick={handleOpen} />
			<BaseModal
				isOpen={isOpen}
				onClose={handleClose}
				style={{
					flexDirection: 'column',
					gap: '32px',
					width: '400px'
				}}
			>
				<ModalHeader onClose={handleClose} text='Пригласить в группу' style={{
					marginTop: '5px'
				}} />
				{
					!contacts.length
						?
						<NoContacts />
						:
						<>
							<CheckboxButton label='Все' onChange={handleSelectAll} />
							{
								contacts.map(item => (
									!exceptions?.includes(item.id)
									&&
									<div key={item.id} style={{
										display: 'flex',
										justifyContent: 'space-between'
									}}>
										<div style={{
											gap: '16px',
											display: 'flex'
										}}>
											<NoAvatar
												name={item.first_name}
												photoURL={item.profile_photo}
											/>
											<b style={{
												marginTop: '9px'
											}}>{item.first_name}</b>
										</div>
										<CheckboxButton onClick={() => handleSelect(item.id)} checked={Boolean(item.isSelected)} style={{
											width: '18px',
											height: '18px',
											marginTop: '9px'
										}} />
									</div>
								))
							}
						</>
				}
				<Button onClick={handleSubmit}>Подтвердить</Button>
			</BaseModal>
		</>
	)
}

export default InviteToGroup
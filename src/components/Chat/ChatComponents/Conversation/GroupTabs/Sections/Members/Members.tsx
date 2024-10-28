import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import addTeamIcon from '../../../../../../../assets/images/chat_images/add-team.svg'
import { groupService } from '../../../../../../../services/chat/group'
import { RootState } from '../../../../../../../store/store'
import InviteToGroup from '../../../Modals/InviteToGroup/InviteToGroup'
import MemberItem from './MemberItem'

const Members = () => {
	const { isFullScreen, selectedChatId, chatList } = useSelector((state: RootState) => state.chat)

	const data = useMemo(() => chatList.find(c => c.chat_id === selectedChatId), [chatList, selectedChatId])

	const handleInvite = async (contactsIds: number[]) => {
		console.log(selectedChatId)
		if (!selectedChatId) return

		try {
			console.log(contactsIds)
			await groupService.addToChat({
				chat_id: selectedChatId,
				contact_ids: contactsIds
			})
			console.log('test1')
		} catch (error) {

		}
	}

	return (
		<div style={{
			marginTop: !isFullScreen ? '16px' : '0px'
		}}>
			<InviteToGroup
				exceptions={data?.chat_members}
				onChangeContacts={handleInvite}
			>
				<div style={{
					display: 'flex',
					gap: '16px',
					color: '#7099ED',
					cursor: 'pointer',
					padding: '8px 16px 8px 16px',
				}}>
					<img src={addTeamIcon} alt="" />
					<span>Добавить участника</span>
				</div>
			</InviteToGroup>

			<div className='flex-column gap-small'>
				{
					data?.members?.map((member, index) => (
						<MemberItem member={member} key={index} chatData={data} />
					))
				}
			</div>
		</div>
	)
}

export default Members
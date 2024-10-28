import { FC, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../../hooks/useModal'
import { useOutsideClick } from '../../../../hooks/useOutside'
import { PropsWithJsxElement } from '../../../../interface/modal.props'
import { userService } from '../../../../services/user/user.service'
import { changeUser } from '../../../../store/slices/AuthSlice/AuthSlice'
import { RootState } from '../../../../store/store'
import ErrorSignature from '../../../Auth/ui/ErrorSignature'
import Button from '../../../ui/Button/Button'
import CheckboxButton from '../../../ui/CheckboxButton/CheckboxButton'
import Loader from '../../../ui/Loader/Loader'
import BaseModal from '../../../ui/Modal/BaseModal'
import ModalHeader from '../../../ui/Modal/ModalHeader'

const ContractWorkModal: FC<PropsWithJsxElement> = ({ children }) => {
	const { isOpen, handleClose, handleOpen } = useModal()
	const { user } = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch()
	const [isContract, setIsContract] = useState(user?.contract || false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const handleApply = async () => {
		if (!user) return
		dispatch(changeUser({
			...user,
			contract: !user.contract
		}))
		try {
			setError(false)
			setLoading(true)
			if (!user?.id) return
			await userService.editContract(user?.id, isContract)
			handleClose()
		} catch (error) {
			setError(true)
		}
		finally {
			setLoading(false)
		}
	}

	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, handleClose)

	const handleClick = () => {
		setIsContract(prev => !prev)
	}
	return (
		<>
			<children.type {...children.props} onEdit={handleOpen} />
			<BaseModal ref={ref} isOpen={isOpen}>
				<div style={{
					display: 'flex',
					flexDirection: 'column', gap: '32px',
					width: '365px'
				}}>
					<ModalHeader text='Работа по договору' onClose={handleClose} />
					<CheckboxButton
						checked={isContract}
						onClick={() => handleClick()}
						label='Работа по договору' />
					<Button onClick={handleApply}>{loading ? <Loader textStyle={{ color: 'white' }} /> : 'Подтвердить'}</Button>
					{error && <ErrorSignature>Не удалось изменить</ErrorSignature>}
				</div>
			</BaseModal>
		</>
	)
}

export default ContractWorkModal
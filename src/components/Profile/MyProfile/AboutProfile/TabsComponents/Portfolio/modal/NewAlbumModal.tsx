
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IDefaultModal } from '../../../../../../../interface/modal.props'
import { portfolioSevice } from '../../../../../../../services/user/userPortfolio.service'
import { setTriggerFetch } from '../../../../../../../store/slices/other/triggerFetch'
import { RootState } from '../../../../../../../store/store'
import ErrorSignature from '../../../../../../Auth/ui/ErrorSignature'
import Button from '../../../../../../ui/Button/Button'
import CloseButton from '../../../../../../ui/CloseButton/CloseButton'
import Field from '../../../../../../ui/Field/Field'
import Loader from '../../../../../../ui/Loader/Loader'
import ModalContainer from '../../../../../../ui/Modal/ModalContainer'

const NewAlbumModal: React.FC<IDefaultModal> = ({ onClose, stateValue }) => {
	const [nameAlbum, setNameAlbum] = useState('')
	const [error, setError] = useState('')
	const { user } = useSelector((state: RootState) => state.auth)
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNameAlbum(e.target.value)
	}

	const handleCreateAlbum = async () => {
		try {
			setLoading(true)
			if (!nameAlbum) {
				setError('Название альбома не может быть пустым')
				return
			}

			if (user?.id) {
				await portfolioSevice.createAlbum(user.id, nameAlbum)
				if (nameAlbum.length > 5 && nameAlbum.length <= 20) {
					setError('') // Clear previous errors

					setNameAlbum('')
					dispatch(setTriggerFetch())
					onClose && onClose()
				} else {
					setError('Название альбома должно быть от 5 до 20 символов')
				}
			}
		} catch (error) {
			setLoading(false)
			console.log('Не удалось создать альбом', error)
			setError('Не удалось создать альбом.')
		}
		finally {
			setLoading(false)
		}
	}

	return (
		<>
			{stateValue &&
				<ModalContainer style={{ position: 'fixed' }} zIndex={11} isOnOverlay>
					<div style={{ position: 'relative' }} className='flex-column'>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span className='textSizeL'>Новый альбом</span>
							<CloseButton onClick={onClose} />
						</div>
						<Field value={nameAlbum} onChange={handleChange} placeholder='Название нового альбома' />
						<Button onClick={handleCreateAlbum}>{loading ? <Loader color='white' /> : 'Создать'}</Button>
						{error && <ErrorSignature style={{ textAlign: 'center' }}>{error}</ErrorSignature>}
					</div>
				</ModalContainer>}
		</>
	)
}

export default NewAlbumModal
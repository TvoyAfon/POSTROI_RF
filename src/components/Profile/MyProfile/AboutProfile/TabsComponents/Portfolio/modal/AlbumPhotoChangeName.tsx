import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { portfolioSevice } from '../../../../../../../services/user/userPortfolio.service'
import { setTriggerForAlbum } from '../../../../../../../store/slices/other/triggerFetch'
import { RootState } from '../../../../../../../store/store'
import ErrorSignature from '../../../../../../Auth/ui/ErrorSignature'
import Button from '../../../../../../ui/Button/Button'
import CloseButton from '../../../../../../ui/CloseButton/CloseButton'
import Field from '../../../../../../ui/Field/Field'
import Loader from '../../../../../../ui/Loader/Loader'
import ModalContainer from '../../../../../../ui/Modal/ModalContainer'

interface IAlbumPhotoChangeName {
	photoLink: string,
	albumId: number,
	onClose: () => void,
	stateValue: boolean
}

const AlbumPhotoChangeName: React.FC<IAlbumPhotoChangeName> = ({ onClose, stateValue, albumId, photoLink }) => {
	const { user } = useSelector((state: RootState) => state.auth)
	const [name, setName] = useState('')
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	const handleSubmit = async () => {
		try {
			if (user?.id) {
				setLoading(true)
				setError(false)
				await portfolioSevice.renamePhoto(
					user.id,
					albumId,
					photoLink,
					name,
				)
			}
			dispatch(setTriggerForAlbum())
			onClose && onClose()
		} catch (error) {
			setError(true)
			setLoading(false)
		}
		finally {
			setLoading(false)
		}

	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}
	return (
		<>
			{stateValue && <ModalContainer style={{ position: 'fixed', width: 500 }} zIndex={12} >
				<div className='flex-column'>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span className='textSizeL'>Введите новое название </span>
						<CloseButton onClick={onClose} />
					</div>
					<Field value={name} onChange={handleChange} placeholder='Введите имя' />
					<Button onClick={handleSubmit}>{loading ? <Loader color='white' /> : 'Подтвердить'}</Button>
					{error && <ErrorSignature>Не удалось сменить название фото</ErrorSignature>}
				</div>
			</ModalContainer>}
		</>
	)
}

export default AlbumPhotoChangeName

import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { portfolioSevice } from '../../../../../../../services/user/userPortfolio.service'
import { setTriggerFetch } from '../../../../../../../store/slices/other/triggerFetch'
import { RootState } from '../../../../../../../store/store'
import ErrorSignature from '../../../../../../Auth/ui/ErrorSignature'
import Button from '../../../../../../ui/Button/Button'
import Loader from '../../../../../../ui/Loader/Loader'
import ModalContainer from '../../../../../../ui/Modal/ModalContainer'

const AlbumDeleteConfirm: React.FC<{ stateValue: boolean, onClose: () => void, albumId: number }> = ({ stateValue, onClose, albumId }) => {

	const { user } = useSelector((state: RootState) => state.auth)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const dispatch = useDispatch()

	const handleDeleteAlbum = async () => {
		try {
			if (user?.id) {
				setLoading(true)
				await portfolioSevice.deleteAlbum(user?.id, albumId)
				dispatch(setTriggerFetch())
			}
			onClose && onClose()
		} catch (error) {
			setError(true)
			setLoading(false)
			console.log('Не удалось удалить альбом', error)
		}
		finally {
			setLoading(false)
		}

	}

	return (
		<>
			{stateValue && <ModalContainer style={{ position: 'fixed', width: 400 }} zIndex={11}>
				<div className='flex-column'>
					<span className='textSizeL'>Вы действительно хотите удалить альбом?</span>
					<div style={{ display: 'flex', justifyContent: 'space-between', gap: 32 }}>
						<Button onClick={handleDeleteAlbum} style={{ backgroundColor: 'gray' }}>{loading ? <Loader color='white' /> : 'Подтвердить'}</Button>
						<Button onClick={onClose}>Отменить</Button>
						{error && <ErrorSignature>Не удалось удалить альбом</ErrorSignature>}
					</div>
				</div>
			</ModalContainer>}
		</>
	)
}

export default AlbumDeleteConfirm

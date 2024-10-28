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


const ChangeAlbumNameModal: React.FC<{ onClose: () => void, stateValue: boolean, albumId: number }> = ({ onClose, stateValue, albumId }) => {
	const [nameVal, setNameVal] = useState('')
	const { user } = useSelector((state: RootState) => state.auth)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const dispatch = useDispatch()


	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.value
		setNameVal(name)
	}

	const handleSubmit = async () => {

		try {
			if (user?.id) {
				setLoading(true)
				await portfolioSevice.changeAlbumName(
					user?.id,
					albumId,
					nameVal,
				)
			}
			dispatch(setTriggerForAlbum())
			onClose()
		} catch (error) {
			setError(true)
			setLoading(false)
			console.log('Не удалось изменить имя', error)
		}
		finally {
			setLoading(false)
		}

	}
	return (

		<>
			{stateValue && <ModalContainer style={{ zIndex: 11, width: 450, position: "fixed" }} >
				<div className='flex-column'>
					<div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
						<span className='textSizeL'>Переименовать альбом</span>
						<CloseButton onClick={onClose} />
					</div>
					<Field onChange={handleChange} value={nameVal} placeholder='Введите название альбома' style={{ width: '100%' }} />
					<Button onClick={handleSubmit}>{loading ? <Loader color='white' /> : 'Подтвердить'}</Button>
					{error && <ErrorSignature>Не удалось изменить название альбома</ErrorSignature>}
				</div>
			</ModalContainer>}
		</>
	)
}

export default ChangeAlbumNameModal

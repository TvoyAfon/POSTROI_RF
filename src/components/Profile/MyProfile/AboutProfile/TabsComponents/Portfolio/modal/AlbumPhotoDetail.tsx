import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import delete_img from '../../../../../../../assets/images/other/deletePhoto_gray.svg'
import settings_img from '../../../../../../../assets/images/other/settings_forImgWhite.svg'
import edit_img from '../../../../../../../assets/images/profile/edit.svg'
import { useOutsideClick } from '../../../../../../../hooks/useOutside'
import { portfolioSevice } from '../../../../../../../services/user/userPortfolio.service'
import { setTriggerForAlbum } from '../../../../../../../store/slices/other/triggerFetch'
import { RootState } from '../../../../../../../store/store'
import ErrorSignature from '../../../../../../Auth/ui/ErrorSignature'
import Button from '../../../../../../ui/Button/Button'
import CloseButton from '../../../../../../ui/CloseButton/CloseButton'
import Loader from '../../../../../../ui/Loader/Loader'
import ModalContainer from '../../../../../../ui/Modal/ModalContainer'
import AlbumPhotoChangeName from './AlbumPhotoChangeName'


interface IAlbumPhotoDetail {
	onClose: () => void,
	stateValue: boolean,
	photoLink: string,
	albumId: number,
	photoName: string
}

const AlbumPhotoDetail: React.FC<IAlbumPhotoDetail> = ({ onClose, stateValue, photoLink, albumId, photoName }) => {
	const [openChange, setOpenChange] = useState(false)
	const { user } = useSelector((state: RootState) => state.auth)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const dispatch = useDispatch()

	useOutsideClick(ref, onClose)

	const onCloseChange = () => {
		setOpenChange(false)
	}

	const handleDeletePhoto = async () => {
		try {
			setLoading(true)
			setError(false)
			if (user?.id && photoLink) {
				await portfolioSevice.deletePhoto(
					user.id,
					albumId,
					photoLink
				)
				dispatch(setTriggerForAlbum())
			}
			onClose && onClose()
		} catch (error) {
			setError(true)
			setLoading(false)
			console.log('Не удалось удалить фото', error)
		}
		finally {
			setLoading(false)
		}
	}

	const handleChangeCover = () => {

	}

	return (
		<div ref={ref}>
			<AlbumPhotoChangeName albumId={albumId} onClose={onCloseChange} photoLink={photoLink} stateValue={openChange} />
			{stateValue && <ModalContainer style={{ position: 'fixed', width: 1200 }} zIndex={11}>
				<div className='flex-column'>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
							<span className='textSizeL'>{photoName}</span>
							<img onClick={() => setOpenChange(true)} style={{ cursor: 'pointer' }} src={edit_img} alt="edit" />
						</div>
						<CloseButton onClick={onClose} />
					</div>
					<div style={{ display: 'flex', gap: 32 }}>
						<img style={{ width: 900, height: 600, borderRadius: 32 }} src={photoLink} alt={photoLink} />
						<div className='flex-column'>
							<div className='flex-column gap-medium'>
								<span className='textSizeL'>В альбомах</span>
							</div>
							<div style={{ marginTop: 'auto' }} className='flex-column gap-medium'>
								<Button onClick={handleChangeCover} style={{ backgroundColor: '#383940' }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
										<img src={settings_img} alt="st" />
										<span> Разместить на обложке</span>
									</div></Button>
								<Button onClick={onClose} >Сохранить</Button>
								<Button onClick={handleDeletePhoto} style={{ backgroundColor: '#F4F3F1' }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
										<img src={delete_img} alt="delete" />
										<span style={{ color: '#8E8E93' }}>{loading ? <Loader /> : 'Удалить'}</span>
									</div>
								</Button>
								{error && <ErrorSignature>Не удалось удалить фото</ErrorSignature>}
							</div>
						</div>
					</div>
				</div>
			</ModalContainer>}
		</div>
	)
}

export default AlbumPhotoDetail

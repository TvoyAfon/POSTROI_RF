import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import settings_3 from '../../../../../../../assets/images/other/delete_img.svg'
import settings_2 from '../../../../../../../assets/images/other/settings_forImg.svg'
import settings_1 from '../../../../../../../assets/images/other/settings_forImgWhite.svg'
import { useModal } from '../../../../../../../hooks/useModal'
import { portfolioSevice } from '../../../../../../../services/user/userPortfolio.service'
import { setTriggerForAlbum } from '../../../../../../../store/slices/other/triggerFetch'
import { RootState } from '../../../../../../../store/store'
import styles from '../Potrfolio.module.scss'
import AlbumPhotoDetail from './AlbumPhotoDetail'


const AlbumImagePopUp: React.FC<{ albumId: number, photoLink?: string, photoName: string }> = ({ albumId, photoLink, photoName }) => {

	const { handleClose, handleOpen, isOpen } = useModal()
	const { user } = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch()


	const handleDeletePhoto = async () => {

		try {
			if (user?.id && photoLink) {
				await portfolioSevice.deletePhoto(
					user.id,
					albumId,
					photoLink
				)
				dispatch(setTriggerForAlbum())
			}
		} catch (error) {
			console.log('Не удалось удалить фото', error)
		}
	}

	const settings = [
		{
			img: settings_1,
			onClick: () => console.log('settings1')
		},
		{
			img: settings_2,
			onClick: handleOpen
		},
		{
			img: settings_3,
			onClick: handleDeletePhoto
		},
	]

	return (
		<>
			{photoLink && <AlbumPhotoDetail
				photoName={photoName}
				albumId={albumId}
				photoLink={photoLink}
				stateValue={isOpen}
				onClose={handleClose} />}
			<div className={styles['albumImagePopUp']}>
				{settings.map((el, index) => (
					<img onClick={el.onClick} key={index} src={el.img} alt={el.img} />
				))}
			</div>
		</>
	)
}

export default AlbumImagePopUp

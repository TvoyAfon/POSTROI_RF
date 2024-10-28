import { FC } from 'react'
import alt_image from '../../../../../../assets/images/other/patterns 4.svg'
import photoIcon from '../../../../../../assets/images/profile/photo.svg'
import { useModal } from '../../../../../../hooks/useModal'
import { IAlbum } from '../../../../../../interface/portfolio.props'
import IconSignature from '../../../../ui/IconSignature'
import styles from './Album.module.scss'
import AlbumDetail from './AlbumDetail'

const Album: FC<IAlbum> = ({ album_id, album_name, count_files, preview_photo, checkMyAlbum }) => {
	const { handleClose, handleOpen, isOpen } = useModal()

	return (
		<>
			<AlbumDetail
				checkMyAlbum={checkMyAlbum}
				stateValue={isOpen}
				album_id={album_id}
				onClose={handleClose} />
			<div onClick={handleOpen} className={styles.album}>
				<div className={styles.preview}>
					<img src={preview_photo ? preview_photo : alt_image}
						alt={'photo_preview'} />
				</div>
				<div className={styles.info}>
					<b style={{
						color: '#fff'
					}}>{album_name}</b>
					<IconSignature icon={photoIcon} signatureStyle={{
						color: '#8E8E93',
						fontWeight: 300,
						marginTop: '2px'
					}}>
						{count_files}
					</IconSignature>
				</div>
			</div>
		</>
	)
}

export default Album
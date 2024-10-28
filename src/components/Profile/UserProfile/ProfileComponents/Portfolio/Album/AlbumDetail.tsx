import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import setting from '../../../../../../assets/images/other/settings-dark.svg'
import { useOutsideClick } from '../../../../../../hooks/useOutside'
import useStopScrolling from '../../../../../../hooks/useStopScrolling'
import { setTriggerAlbumClose } from '../../../../../../store/slices/other/triggerFetch'
import CloseButton from '../../../../../ui/CloseButton/CloseButton'
import Loader from '../../../../../ui/Loader/Loader'
import ModalContainer from '../../../../../ui/Modal/ModalContainer'
import useFetchAlbum from '../../../../MyProfile/AboutProfile/TabsComponents/Portfolio/hooks/useFetchCurrentAlbum'
import AlbumDetailPopup from '../../../../MyProfile/AboutProfile/TabsComponents/Portfolio/modal/AlbumDetailPopup'
import PortfolioCurrentImage from '../ui/PortfolioCurrentImage'
import PotrfolioPhotoLoader from '../ui/PotrfolioPhotoLoader'
import styles from './Album.module.scss'

export interface IAlbumDetail {
	album_id?: number,
	onClose: () => void,
	stateValue?: boolean,
	checkMyAlbum?: boolean
}

const AlbumDetail: React.FC<IAlbumDetail> = ({ album_id, onClose, stateValue, checkMyAlbum }) => {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const dispatch = useDispatch()
	useOutsideClick(ref, () => handleClose())
	useStopScrolling(stateValue!)

	const { album, loading } = useFetchAlbum(album_id!)
	const handleClose = () => {
		dispatch(setTriggerAlbumClose())
		onClose()
	}

	return (
		<>
			{stateValue && <ModalContainer
				style={{ width: 990, position: 'fixed' }}
				zIndex={11}
				isOnOverlay>
				<div className={styles['album_detail']} ref={ref} >
					<div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
						<span className='textSizeL'>{album?.album_name}</span>
						<div style={{ display: 'flex', gap: 8 }}>
							{checkMyAlbum &&
								<img
									onClick={() => setOpen(!open)}
									style={{ cursor: 'pointer' }}
									src={setting}
									alt="st" />}
							<CloseButton onClick={handleClose} />
							{open && album?.album_id && <AlbumDetailPopup albumId={album?.album_id} />}
						</div>
					</div>
					<section
						style={{ display: 'flex', gap: 8, flexWrap: 'wrap', height: 400, overflowY: 'scroll' }}>
						{!loading ? album?.files.map(el => (
							<PortfolioCurrentImage
							checkMyAlbum={checkMyAlbum}
								albumId={album.album_id}
								photoName={el.name}
								photoLink={el.link} />
						)) :
							<Loader
								style={{ position: 'absolute', top: 15, left: 400, fontSize: 16 }} />
						}
						{checkMyAlbum&& album?.album_id && <PotrfolioPhotoLoader
							albumId={album.album_id} />}
					</section>
				</div>
			</ModalContainer>}
		</>
	)
}

export default AlbumDetail

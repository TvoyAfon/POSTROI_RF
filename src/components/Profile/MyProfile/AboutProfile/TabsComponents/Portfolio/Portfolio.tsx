import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../../../../../hooks/useModal'
import { RootState } from '../../../../../../store/store'
import Button from '../../../../../ui/Button/Button'
import Albums from '../../../../UserProfile/ProfileComponents/Portfolio/Album/Albums'
import NewAlbumModal from './modal/NewAlbumModal'

const Portfolio = () => {
	const { handleClose, handleOpen, isOpen } = useModal()
	const { user } = useSelector((state: RootState) => state.auth)
	const nav = useNavigate()
	return (
		<>
			<NewAlbumModal stateValue={isOpen} onClose={handleClose} />
			<Albums >
				<Button onClick={handleOpen} variant='pale' style={{
					marginRight: 'auto'
				}}>Новый альбом</Button>
			</Albums>
			<Button onClick={() => nav(`/portfolio/${user?.id}`)} style={{
				marginRight: 'auto'
			}}>Смотреть всё портфолио</Button>
		</>
	)
}

export default Portfolio
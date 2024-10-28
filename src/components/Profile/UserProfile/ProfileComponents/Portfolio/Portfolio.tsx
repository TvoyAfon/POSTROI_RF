
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../../ui/Button/Button'

import Albums from './Album/Albums'

const Portfolio: React.FC<{isMyAlbums:boolean,userId?:number}> = ({isMyAlbums}) => {
  const {userId} = useParams()
	const nav = useNavigate()
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: ' 24px',
			marginBottom: 32
		}}>
			<span style={{
				fontWeight: 600,
				fontSize: '20px'
			}}>Портфолио</span>
			<Albums isMyAlbums={isMyAlbums}/>
			<Button 
			onClick={() => nav(`/portfolio/${userId}`)}
			style={{
				marginRight: 'auto'
			}}>Смотреть всё портфолио</Button>
		</div>
	)
}

export default Portfolio
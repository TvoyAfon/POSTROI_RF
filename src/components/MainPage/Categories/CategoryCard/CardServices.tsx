import { Link } from 'react-router-dom'
import { ICategoryCard } from '../../../../interface/categoryCard.props'
import styles from '../../MainPage.module.scss'
import tractor_img from '../../../../assets/images/mainpage_images/tracktor.svg'

const CardServices:React.FC<ICategoryCard> = ({onClick,to}) => {
	return (
		<Link
			onClick={onClick}
			to={to}
			className={styles.mainPage_categories_eqipment}>
			<div style={{ width: '175px', height: '68px', borderRadius: '8px', padding: '10px', position: 'relative' }}>
				<span style={{ position: 'absolute', lineHeight: '26px' }}>УСЛУГИ <br />СПЕЦТЕХНИКИ</span>
			</div>
			<img src={tractor_img} alt="car" />
		</Link>
	)
}

export default CardServices

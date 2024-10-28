import { FC } from 'react'
import Button from '../../../../../ui/Button/Button'
import styles from './Ads.module.scss'
import { IAd } from './data'

interface AdProps extends IAd {

}

const AdItem: FC<AdProps> = ({ image, name, price, description, address, category }) => {
	return (
		<div className={styles.ad}>
			<img src={image} alt="" className={styles['ad__file']} />
			<div className={styles['ad__content']}>
				<span style={{
					fontSize: '20px',
					fontWeight: 600,
					textTransform: 'uppercase',
					color:'#262626'
				}}>{name}</span>
				<div style={{
					display: 'flex',
					gap: '8px'
				}}>
					<span style={{
						color: '#262626'
					}}>От:</span>
					<b>{price} Р</b>
				</div>
				<span style={{
					width: '335px',
					color: '#262626'
				}}>
					{description}
				</span>
				<b>{address}</b>
				<b style={{
					color: '#8E8E93'
				}}>{category}</b>
			</div>
			<div className={styles['ad__actions']}>
				<Button>Редактировать</Button>
				<Button variant='gray'>Удалить</Button>
			</div>
		</div>
	)
}

export default AdItem
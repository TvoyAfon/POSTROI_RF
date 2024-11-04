import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../ui/Button/Button'
import styles from './ErrorPageAnimation.module.scss'

const ErrorPageAnimation: React.FC = () => {

	const nav = useNavigate()
	return (
		<div className={styles['overlay']}>
			<div className={styles['container']}>
				<div className={styles["crane-container"]}>
					<img src="https://i.postimg.cc/JhYnB3hd/crane.png" alt="crane" className={styles["crane-img"]} />
				</div>
				<div className={styles['container-404']}>
					<span className={styles["text-404"]}>4</span>
					<img src="https://i.postimg.cc/6Qpq3bBv/plaint.png" alt="plaint" className={styles['plaint-img']} />
					<span className={styles["text-404"]}>4</span>
					<img src="https://i.postimg.cc/8PLjnryj/bird.png" alt="bird" className={styles['bird-img']} />
					<span className={styles["box box-1"]}></span>
					<span className={styles['box box-2']}></span>
					<span className={styles['box box-3']}></span>
				</div>
			</div>
			<div className={styles["text-container"]}>
				<p style={{ color: '#282930' }}>Страница не найдена ...</p>
				<Button style={{ height: 60, fontSize: 20 }} onClick={() => nav('/')}>Вернуться домой</Button>
			</div>
		</div>
	)
}

export default ErrorPageAnimation

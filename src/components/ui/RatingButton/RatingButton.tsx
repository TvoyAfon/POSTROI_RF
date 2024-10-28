import React from 'react'
import styles from './RatingButton.module.scss'

const RatingButton:React.FC = () => {
	return (
		<div className={styles.buttonContainer}>
			<button>5</button>
			<hr />
			<button>4</button>
			<hr />
			<button>3</button>
			<hr />
			<button>2</button>
			<hr />
			<button>1</button>
		</div>
	)
}

export default RatingButton

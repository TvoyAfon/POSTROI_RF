import styles from './Typing.module.scss';

const Typing = () => {
    return (
        <div className={styles.container}>
            <span>Печатает</span>
            <div className={styles.typing}>
                <div className={styles['typing__dot']}></div>
                <div className={styles['typing__dot']}></div>
                <div className={styles['typing__dot']}></div>
            </div>
        </div>

    )
}

export default Typing
import React, { useState } from 'react'
import { IToggleButton } from '../../../interface/toggle-button.props'
import styles from './ToggleButton.module.scss'

const ToggleButton: React.FC<IToggleButton> = ({ label = '', onChange, isToggledByDefault = false, style = {}, labelStyle = {} }) => {
    const [isToggled, setIsToggled] = useState<boolean>(isToggledByDefault)
    const [click, setClick] = useState<boolean>(false)
    const handleToggle = () => {
        onChange && onChange(!isToggled)
        setIsToggled(!isToggled)
        setClick(true)
    }

    return (
        <div style={{
            display: 'flex',
            width: 'auto',
            gap: '8px',
            alignItems: 'center'
        }}>
            <div
                className={`${styles.toggle} ${isToggled ? styles.toggled : click && styles.default}`}
                style={style}
                onClick={handleToggle}
            >
                <div className={styles['toggle__round']}></div>
            </div>
            <span className={styles['toggle__label']} style={labelStyle}>{label}</span>
        </div>
    )
}

export default ToggleButton
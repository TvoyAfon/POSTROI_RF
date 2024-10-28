import React, { CSSProperties, useEffect, useState } from 'react'
import checkboxDefaultIcon from '../../../assets/images/other/checkBox_new.svg'
import checkboxToggledIcon from '../../../assets/images/other/checkbox_toggled_new.svg'
import { IToggleButton } from '../../../interface/toggle-button.props'

interface ICheckboxButton extends IToggleButton {
    checked?: boolean
    onClick?: () => void,
    labelStyle?: CSSProperties,
    changeToogle?: boolean,

}

const CheckboxButton: React.FC<ICheckboxButton> = ({ isToggledByDefault = false, style = {}, onChange, label = '', checked = false, onClick, labelStyle }) => {
    const [isToggled, setIsToggled] = useState<boolean>(isToggledByDefault)

    useEffect(() => {
        setIsToggled(checked)
    }, [checked])

    const handleToggle = () => {
        setIsToggled(!isToggled)
        onChange && onChange(!isToggled)
        onClick && onClick()
    }

    return (
        <div onClick={handleToggle}
            style={{
                cursor: 'pointer',
                display: 'flex',
                gap: '12px',
                fontWeight: 450,
                ...style
            }}>
            <img src={isToggled ? checkboxToggledIcon : checkboxDefaultIcon} alt="checkbox-img" />
            <span style={labelStyle}>{label}</span>
        </div>
    )
}

export default CheckboxButton

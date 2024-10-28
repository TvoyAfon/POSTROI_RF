import { FC, useState } from "react";
import searchIcon from '../../../../../assets/images/mainpage_images/magnifying-glass-solid.png';
import Field, { IFieldProps } from "../../../../ui/Field/Field";

const SearchField: FC<IFieldProps> = (props) => {
    const [isShowed, setIsShowed] = useState<boolean>(true);

    return (
        <div style={{
            position: 'relative'
        }}>
            {
                isShowed
                &&
                <img src={searchIcon} width='16' height='16' alt="" style={{
                    position: 'absolute',
                    top: '12px',
                    left: '15px'
                }} />
            }
            <Field onFocus={() => setIsShowed(false)} onBlur={() => setIsShowed(true)} {...props} />
        </div>
    )
}

export default SearchField
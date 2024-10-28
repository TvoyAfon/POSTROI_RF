import { FC } from "react";

interface IColorSelector {
    title?: string;
    colors?: string[];
    selectedColor: string;
    changeColor: (color: string) => void;
}

const ColorSelector: FC<IColorSelector> = ({
    title,
    selectedColor,
    changeColor,
    colors = ['#8E8E93', '#4C54CC', '#231F20', '#40B889', '#FFB31D', '#FF8B63']
}) => {
    return (
        <div style={{
            display: 'flex',
            gap: '32px'
        }}>
            {
                title
                &&
                <span style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#231F20'
                }}>
                    {title}
                </span>
            }
            <div style={{
                display: 'flex',
                gap: '10px',
                marginTop: '3px'
            }}>
                {
                    colors.map(color => (
                        <div key={color} onClick={() => changeColor(color)} style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: color,
                            cursor: 'pointer',
                            transform: `scale(${selectedColor === color ? '1.25' : '1'})`
                        }}></div>
                    ))
                }
            </div>
        </div>
    )
}

export default ColorSelector
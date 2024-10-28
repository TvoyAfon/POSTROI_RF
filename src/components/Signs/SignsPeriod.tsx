import React, { useEffect, useState } from 'react'
import polzunok_icon from '../../assets/images/signs/polzunok.png'
import { ISignsPeriod } from '../../interface/signsPeriod.props'

const PARENT_WIDTH = 240 // ширина родителя

const SignsPeriod: React.FC<ISignsPeriod> = ({ setDays }) => {
    const [position, setPosition] = useState<number>(PARENT_WIDTH / 2) // Начальное значение по центру
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [offset, setOffset] = useState<number>(0) // Хранит смещение при перетаскивании

    // Обработчик перемещения мыши во время перетаскивания
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return

        let newX = e.clientX - offset // Применяем смещение при перемещении

        // Ограничиваем перемещение ползунка в пределах ширины родителя
        if (newX < 0) {
            newX = 0
        } else if (newX > PARENT_WIDTH) {
            newX = PARENT_WIDTH
        }

        setPosition(newX)
        setDays(Math.ceil(newX / 8)) // Устанавливаем значение дней
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setOffset(e.clientX - position) // Вычисляем смещение для корректного перетаскивания
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

        // Очистка обработчиков событий при размонтировании компонента
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, position]) // Добавлено 'position' для правильной работы

    return (
        <div
            style={{
                width: PARENT_WIDTH,
                height: 20,
                borderRadius: 25,
                backgroundColor: '#383940',
                position: 'relative',
                cursor: 'pointer',
            }}
        >
            <div
                onMouseDown={handleMouseDown}
                style={{
                    position: 'absolute',
                    top: '180%', // центрирование ползунка
                    left: position,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    width: '30px',
                    height: '36px',
                    backgroundImage: `url('${polzunok_icon}')`,
                    backgroundSize: 'cover',
                    zIndex: 5,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    height: 20,
                    width: position,
                    backgroundColor: '#fff',
                    borderRadius: 25,
                }}
            />
        </div>
    )
}

export default SignsPeriod
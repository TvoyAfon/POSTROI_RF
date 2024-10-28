import React, { useEffect, useRef } from 'react'

const ScrollingComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const scrollSpeed = useRef(0)
    const isScrolling = useRef(false)
    const isCtrlPressed = useRef(false)

    const handleScroll = (event: WheelEvent) => {
        if (scrollRef.current) {
            // Проверяем, нажата ли клавиша Ctrl
            if (isCtrlPressed.current) {
                scrollSpeed.current = 0 // Останавливаем прокрутку
                return // Выходим из функции
            }

            // Обновляем скорость на основании прокрутки
            scrollSpeed.current += event.deltaY * 0.01 // Увеличиваем коэффициент для большей чувствительности
            scrollRef.current.scrollTop += scrollSpeed.current // Прокручиваем по инерции

            isScrolling.current = true // Указываем, что прокрутка активна

            // Запускаем новую анимацию инерционного скролла
            requestAnimationFrame(inertiaScroll)
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey) {
            isCtrlPressed.current = true // Устанавливаем флаг, если Ctrl нажата
        }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === 'Control') {
            isCtrlPressed.current = false // Сбрасываем флаг, если Ctrl отпущена
        }
    }
    const inertiaScroll = () => {
        if (isScrolling.current) {
            if (scrollSpeed.current !== 0) {
                // Прокручиваем содержимое на основе скорости
                if (scrollRef.current) {
                    scrollRef.current.scrollTop += scrollSpeed.current
                }

                // Уменьшаем скорость для создания эффекта инерции
                scrollSpeed.current *= 0.985 // Увеличиваем затухание для плавности
            }

            // Если скорость стала достаточно маленькой, останавливаем инерцию
            if (Math.abs(scrollSpeed.current) < 0.1) {
                scrollSpeed.current = 0
                isScrolling.current = false // Устанавливаем флаг прокрутки
            } else {
                requestAnimationFrame(inertiaScroll) // Продолжаем анимацию
            }
        }
    }

    useEffect(() => {
        window.addEventListener('wheel', handleScroll)
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('wheel', handleScroll)
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    useEffect(() => {
        const stopInertia = () => {
            scrollSpeed.current = 0 // Останавливаем инерцию при окончании прокрутки
            isScrolling.current = false // Устанавливаем флаг прокрутки
        }

        window.addEventListener('mouseup', stopInertia)
        return () => {
            window.removeEventListener('mouseup', stopInertia)
        }
    }, [])

    return (
        <div ref={scrollRef} style={{ overflowY: 'auto', maxHeight: '100vh' }}>
            {children}
        </div>
    )
}

export default ScrollingComponent
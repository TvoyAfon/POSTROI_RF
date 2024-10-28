import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface InertialScrollProps {
  children: ReactNode
}

const Scroll: React.FC<InertialScrollProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<number>(0)
  const [scrollY, setScrollY] = useState<number>(0)
  const [velocity, setVelocity] = useState<number>(0)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY
      setVelocity((prev) => prev + delta)
    }

    const handleAnimationFrame = () => {
      setScrollY((prev) => {
        const newScroll = prev + velocity
        return newScroll
      })

      // Десятая часть скорости каждый кадр
      setVelocity((prev) => (Math.abs(prev) < 0.1 ? 0 : prev * 0.9))

      if (velocity !== 0) {
        animationRef.current = requestAnimationFrame(handleAnimationFrame)
      } else {
        cancelAnimationFrame(animationRef.current)
      }
    }

    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel)
      animationRef.current = requestAnimationFrame(handleAnimationFrame)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel)
      }
      cancelAnimationFrame(animationRef.current)
    }
  }, [velocity])

  return (
    <div
      ref={scrollRef}
      style={{
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          transform: `translateY(${scrollY}px)`,
          transition: 'transform 1s', // Для плавности
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Scroll
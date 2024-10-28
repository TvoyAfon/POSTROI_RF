import { useEffect } from 'react'

const useStopScrolling = (isActive: boolean) => {
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('stop-scrolling')
    } else {
      document.body.classList.remove('stop-scrolling')
    }

    // Clean up function to remove class if component unmounts
    return () => {
      document.body.classList.remove('stop-scrolling')
    }
  }, [isActive])
}

export default useStopScrolling
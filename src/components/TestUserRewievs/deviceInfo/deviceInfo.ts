import { useEffect, useState } from 'react'

const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    browser: '',
    os: '',
    userAgent: '',
  })

  useEffect(() => {
    const userAgent = navigator.userAgent

    // Определяем браузер
    let browser
    if (userAgent.indexOf('Firefox') > -1) {
      browser = 'Mozilla Firefox'
    } else if (userAgent.indexOf('Chrome') > -1) {
      browser = 'Google Chrome'
    } else if (userAgent.indexOf('Safari') > -1) {
      browser = 'Apple Safari'
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
      browser = 'Internet Explorer'
    } else {
      browser = 'Unknown'
    }

    // Определяем операционную систему
    let os
    if (userAgent.indexOf('Win') > -1) {
      os = 'Windows'
    } else if (userAgent.indexOf('Mac') > -1) {
      os = 'MacOS'
    } else if (userAgent.indexOf('Linux') > -1) {
      os = 'Linux'
    } else if (userAgent.indexOf('Android') > -1) {
      os = 'Android'
    } else if (userAgent.indexOf('like Mac') > -1) {
      os = 'iOS'
    } else {
      os = 'Unknown'
    }

    // Сохраняем информацию о браузере, ОС и userAgent
    setDeviceInfo({
      browser,
      os,
      userAgent,
    })
  }, [])

  return deviceInfo
}

export default useDeviceInfo

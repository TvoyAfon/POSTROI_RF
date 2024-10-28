import jsCookie from 'js-cookie'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes/AppRoutes'
import ChatContainer from './components/Chat/ChatContainer'
import Navbar from './components/Navbar/Navbar'
import { useIP } from './components/TestUserRewievs/utils/useIp'
import { cacheController } from './controllers/chat-controllers/cache.controller'
import { useAuth } from './hooks/auth/useAuth'

import { useGetGeoByIp } from './hooks/useGetGeoByIp'
import useScrollToTopOnReload from './hooks/useToTop/useToTop'
import { useGetDataByAddress } from './hooks/yandex/useGetDataByAddress'
import { changeCityCoords } from './store/slices/CurrentCitySlice'
import { RootState } from './store/store'
import { generateRandomNumber } from './utils/random'

function App() {
  const auth = useAuth()
  const cityFromCookie = localStorage.getItem('currentCity')
  const { isAuthed, user } = useSelector((state: RootState) => state.auth)
  const { data } = useGetDataByAddress(user?.city_name || cityFromCookie) /* определяем с бэкэнда геолокацию города */
  const [ip, setIp] = useState('')
  const dispatch = useDispatch()
  useIP()


  useEffect(() => {
    if (!data || data.length === 0) return
    const timer = setTimeout(() => {
      dispatch(changeCityCoords({ lat: data[0].coordinates[1], lon: data[0].coordinates[0] }))
    }, 200)
    return () => clearTimeout(timer) // Очищаем таймер при обновлении или размонтировании
  }, [data])



  useEffect(() => {
    if (user?.id) return
    const ipFromCookie = jsCookie.get('x-real-ip')
    if (!ipFromCookie) return
    setIp(ipFromCookie)
  }, [user?.id])

  useGetGeoByIp(ip)

  useScrollToTopOnReload()
  useEffect(() => {
    auth()
    cacheController.clearCache()
  }, [])

  useEffect(() => {
    if (!isAuthed) return

    if (!localStorage.getItem('client_device_id')) {
      localStorage.setItem('client_device_id', String(generateRandomNumber()))
    }
  }, [isAuthed])

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <ChatContainer />
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}
export default App

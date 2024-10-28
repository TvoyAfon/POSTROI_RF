import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import { RootState } from '../../store/store'
import MainPage from '../MainPage/MainPage'
import TestUserRewievsIcon from '../TestUserRewievs/TestUserRewievsIcon'
import { routes } from './routes'
import ChatHelp from '../ChatHelp/ChatIcon'

const AppRoutes: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const location = useLocation()

  const transitions = useTransition(location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 150 },
  })

  return (
   /* Добавлена анимация плавного перехода между страницами с помощью тега animated */
    <div className='app_routes' style={{ position: 'relative' }}>
      {transitions((style, item) => (
        <animated.div style={{ ...style, position: 'absolute', width: '100%' }}>
          <Routes key={location.key} location={item}>

            {routes.map(route => (
              <Route
                path={route.path}
                key={route.path}
                element={
                  <div>
                    {route.auth && !user ? <MainPage /> : <route.element />}
                    <TestUserRewievsIcon />
                   <ChatHelp/>
                  </div>
                }
              />
            ))}
          </Routes>
        </animated.div>
      ))}
    </div>

  )
}

export default AppRoutes;


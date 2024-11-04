import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES_AUTHED_NAVBAR } from '../../routes/routes'
import { addOpenModalClickFlag } from '../../store/slices/closeModalClick/closeModalClickSlice'
import { RootState } from '../../store/store'
import UserLocation from '../Navbar/UserLocation/UserLocation'
import CompactOrderCard from '../OrdersAndProjectsPage/MapSection/CompactOrderCard'
import YandexMap from '../ui/InputYandexMap/YandexMap'
import Loader from '../ui/Loader/Loader'
import CardOrderInfo from './CardOrderInfo/CardOrderInfo'
import styles from './SearchOrder.module.scss'
import SearchOrderHeader from './SearchOrderHeader/SearchOrderHeader'
import SearchOrderOverlay from './SearchOrderOverlay/SearchOrderOverlay'
import { useGetAllOrders } from './hooks/useGetAllOrders'

const SearchOrder: React.FC = () => {
  const dispatch = useDispatch()
  const [openSearchOrderMap, setOpenSearchOrderMap] = useState<boolean>(false)
  const [openMap, setOpenMap] = useState<boolean>(false)
  const { searchRadius } = useSelector((state: RootState) => state.searchOrderRadius)
  const { city } = useSelector((state: RootState) => state.currentCity)
  const { user } = useSelector((state: RootState) => state.auth)
  const nav = useNavigate()
  const { ordersList, isOrdersLoading } = useSelector((state: RootState) => state.orders)
  useGetAllOrders() /* Заносим данные в редакс */

  const handleCloseMap = () => {
    setOpenSearchOrderMap(false)
    dispatch(addOpenModalClickFlag(true))
  }
  const handleOpenMap = () => {
    setOpenMap(true)
  }

  useEffect(() => {
    if (user?.id) {
      nav(ROUTES_AUTHED_NAVBAR.ordersAndProjects)
    }
  }, [user?.id])

  /* useGetOrdersByCategory(categoryOrder, subCategoryOrder, 'Найти заказ') */

  return (
    <>
      <div
        className={styles['searchorder_container']}
        style={!openMap ? { display: 'flex', justifyContent: 'center', paddingTop: 120 } : {}}>
        <SearchOrderOverlay
          style={openMap ? { zIndex: 9, left: '0px', width: 620, height: 828, border: '1px solid rgba(0,0,0,0.15)', top: '90px' } : {}} >
          <SearchOrderHeader
            city={city}
            handleOpenMap={handleOpenMap}
            openMap={openMap}
            searchRadius={searchRadius}
            setOpenMap={setOpenMap}
            setOpenSearchOrderMap={setOpenSearchOrderMap} />
          <section
            style={{ overflowX: "hidden", display: 'grid', gridTemplateColumns: !openMap ? '1fr' : '1fr 1fr', gap: 24, overflowY: 'scroll', height: !openMap ? 570 : 670 }}>
            {isOrdersLoading ? (
              <Loader
                text='Загрузка заказов'
                style={!openMap ? {
                  display: 'flex',
                  justifyContent: 'center'
                } : {
                  position: 'absolute', top: '45%', left: '30%'
                }}
              />
            ) : ordersList.length ? (
              !openMap ? (  // Здесь проверяем, открыта ли карта
                <>
                  {ordersList.map(order => (
                    <CardOrderInfo
                      openMap={false}
                      key={order.id}
                      {...order}
                    />
                  ))}
                </>
              ) : (
                ordersList.map(order => (
                  <CompactOrderCard key={order.id} {...order} />
                ))
              )
            ) : (
              <span style={!openMap ?
                { textAlign: 'center' } :
                { position: 'absolute', top: '45%', left: '30%' }}
                className='textSizeL'>
                Заказов не найдено
              </span>
            )}
          </section>
        </SearchOrderOverlay >
      </div>
      {openMap &&
        <YandexMap
          isYandexMapForOrders={true}
          styleContainer={{ height: 2000, width: '100%' }} />}
      {openSearchOrderMap &&
        <UserLocation
          isOpenMap={openSearchOrderMap}
          handleCloseMap={handleCloseMap} />
      }
    </>
  )
}

export default SearchOrder

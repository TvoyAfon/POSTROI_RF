import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrders, setIsOrdersLoading } from '../../../store/slices/orders/ordersSlice'
import { RootState } from '../../../store/store'
import { getFormattedOrders, getMyFormattedOrders } from '../../../utils/order-formatting'

export const useGetOrdersByCategory = (category: string, sub_category: string, currentSection: string) => {
    const { ordersPage, myOrdersPage } = useSelector((state: RootState) => state.orders)
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)


    useEffect(() => {
        const getOrdersByCategory = async () => {
            if (currentSection === 'Найти заказ') {
                try {
                    dispatch(setIsOrdersLoading(true))

                    if (category === 'Выберите категорию заказов') {
                        const allOrders = await getFormattedOrders({
                            limit: 100,
                            page: ordersPage
                        })
                        if (allOrders) dispatch(addOrders({ orders: allOrders, addFlag: 'rewrite' }))
                    } else if (category) {
                        const filteredOrders = await getFormattedOrders({
                            limit: 100,
                            page: ordersPage,

                            ...(sub_category ? { sub_category } : {})
                        })
                        if (filteredOrders) {
                            dispatch(addOrders({ orders: filteredOrders, addFlag: 'rewrite' }))
                        }
                    }
                } catch (error) {
                    console.error(error, 'ошибка поиска по категории')
                } finally {
                    dispatch(setIsOrdersLoading(false))
                }
            }
            else if (currentSection === 'Мои заказы') {
                if (!user?.id) return
                const myFilteredOrders = await getMyFormattedOrders({
                    client_id: user?.id,
                    limit: 100,
                    page: myOrdersPage,

                })
                console.log(myFilteredOrders)
            }
        }

        // Вызов функции
        getOrdersByCategory()
    }, [category, sub_category, ordersPage, dispatch]) // Добавьте ordersPage и dispatch в зависимостях
}
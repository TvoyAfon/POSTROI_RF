import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import plus_svg from '../../assets/images/other/add-circle.svg'
import caret from '../../assets/images/other/caret-bottom-solid.svg'
import { useModal } from '../../hooks/useModal'
import { ROUTES_NAVBAR } from '../../routes/routes'

import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../hooks/useDebounce'
import { projectService } from '../../services/project/project.service'
import { setCitiesByDefault } from '../../store/slices/CurrentCitySlice'
import { addMyOrders } from '../../store/slices/orders/ordersSlice'
import { RootState } from '../../store/store'
import { getMyFormattedOrders } from '../../utils/order-formatting'
import UserLocation from '../Navbar/UserLocation/UserLocation'
import FilterOrder from '../SearchOrder/FilterOrder/FilterOrder'
import { useSearchOrdersByCity } from '../SearchOrder/hooks/useSearchOrdersByCity'
import { useSearchOrdersByName } from '../SearchOrder/hooks/useSearchOrdersByName'
import CityAndRadius from '../SearchOrder/SearchOrderHeader/CityAndRadius/CityAndRadius'
import SearchOrderModal from '../SearchOrder/SearchOrderHeader/SearchOrderModal/SearchOrderModal'
import SearchMyOrderFilter from '../SearchOrder/SearchOrderHeader/ui/SearchMyOrderFilter'
import SearchOrderFilter from '../SearchOrder/SearchOrderHeader/ui/SearchOrderFilter.tsx/SearchOrderFilter'
import Button from '../ui/Button/Button'
import YandexMap from '../ui/InputYandexMap/YandexMap'
import SearchOrderInput from '../ui/OrderInput/SearchOrderInput'
import CompactOrderCard from './MapSection/CompactOrderCard'
import OrderHeader from './OrderHeader/OrderHeader'
import NewProjectModal from './OrderProject/modal/NewProjectModal'
import styles from './OrdersAndProjects.module.scss'
import MyOrdersFilter from './section/filters/MyOrdersFilter'
import OrdersFilter from './section/filters/OrdersFilter'
import MyOrderSection from './section/MyOrderSection'
import MyProjectSection from './section/MyProjectSection'
import OrderSection from './section/OrderSection'
import OrderSubSection from './section/subsection/OrderSubSection'


export enum Sections {
	ORDERS = 'Заказы',
	PROJECTS = 'Проекты',
	MYORDERS = 'Мои заказы',
	MYPROJECTS = 'Мои проекты'
}

const OrdersAndProjectsPage = () => {
	const nav = useNavigate()
	const [openMap, setOpenMap] = useState(false)
	const [openYandexMap, setOpenYandexMap] = useState(false)
	const [currentCategory, setCurrentCategory] = useState('Заказы')
	const [currentSubCategory, setCurrentSubCategory] = useState('Найти заказ')
	const [isOpenModal, setIsOpenModal] = useState(false)
	const dispatch = useDispatch()
	const { handleClose, isOpen } = useModal()
	const [openNewProject, setOpenNewProject] = useState(false)
	const [currentButton, setCurrentButton] = useState('Список')

	const sectionRef = useRef<HTMLDivElement>(null)
	const [search, setSearch] = useState('')
	const { ordersList, myOrdersList, myOrdersPage } = useSelector((state: RootState) => state.orders)
	const { categoryOrder } = useSelector((state: RootState) => state.categoriesForFilterSlice)

	const { user } = useSelector((state: RootState) => state.auth)

	const { data, isLoading } = useQuery({
		queryKey: ['projects'],
		queryFn: () => projectService.getProjects(),  /* список проектов */
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	})

	useEffect(() => {
		(async () => {
			if (!user?.id) return
			try {
				console.log('вызвался 2')
				const formattedOrders = await getMyFormattedOrders({
					client_id: user.id,
					limit: 100,
					page: myOrdersPage
				})
				if (!formattedOrders) return
				dispatch(addMyOrders({ orders: formattedOrders, addFlag: 'rewrite' }))
			}
			catch (error) {
				console.log(error)
			}
			finally {

			}
		})()

	}, [user?.id])

	useEffect(() => {
		if (!data) return
		localStorage.setItem('count_projects', String(data.length))
	}, [])

	const subSectionComponent = useMemo(() => {
		if (currentCategory === Sections.ORDERS && currentSubCategory === 'Найти заказ') {
			return <OrderSection sectionRef={sectionRef} searchQuery={search} />
		}
		if (currentCategory === Sections.ORDERS && currentSubCategory === Sections.MYORDERS) {
			return <MyOrderSection sectionRef={sectionRef} searchQuery={search} />
		}
		if (currentCategory === Sections.PROJECTS) {
			return <MyProjectSection data={data} isLoading={isLoading} />
		}
		return null // Default return if no component matches
	}, [currentCategory, currentSubCategory, sectionRef, search])

	const handleCurrentCategoryClick = (subCategory: string) => {
		setCurrentSubCategory(subCategory)
	}

	const handleCloseModalCity = () => {
		dispatch(setCitiesByDefault())
		setOpenMap(false)
	}

	const compactCards = useMemo(() => {
		const currentCards = {
			[Sections.MYORDERS]: myOrdersList,
			[Sections.ORDERS]: ordersList,
		}[currentCategory]


		return currentCards && currentCards.length > 0 ? currentCards : []
	}, [currentCategory, myOrdersList, ordersList])

	const handleOpenYandexMap = () => {
		setCurrentButton('Карта')
		setOpenYandexMap(true)
	}
	const handleCloseYandexMap = () => {
		setCurrentButton('Список')
		setOpenYandexMap(false)

	}

	const handleSearchOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const debouncedOrdersValue = useDebounce(search, 400)
	/*	useGetOrdersByCategory(categoryOrder, subCategoryOrder, currentSubCategory) */
	useSearchOrdersByName(debouncedOrdersValue!, currentCategory)
	useSearchOrdersByCity(user?.city_name, 'Заказы')

	return (
		<>
			{
				openMap && <UserLocation
					isOpenMap={openMap}
					handleCloseMap={handleCloseModalCity} />}
			{isOpen && <FilterOrder handleCloseFilter={handleClose} />
			}
			{
				openNewProject &&
				<NewProjectModal
					onClose={() => setOpenNewProject(false)} />
			}
			{!openYandexMap ?
				<div
					className={styles['container_overlay']}
					style={{ paddingTop: 185, display: 'flex', justifyContent: 'center' }}>
					<div className={styles.container}>
						{currentCategory === 'Заказы' &&
							<OrderSubSection
								currentCategory={currentSubCategory}
								handleCurrentCategoryClick={handleCurrentCategoryClick} />}
						<OrderHeader
							setCurrentCategory={setCurrentCategory}
							currentCategory={currentCategory}
							style={{ position: 'absolute', top: -57, left: 0 }} />
						<div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
							<CityAndRadius
								style={{ width: 'auto' }}
								setOpenSearchOrderMap={setOpenMap}
							/>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Button
									onClick={handleCloseYandexMap}
									style={{ width: 77, fontWeight: 400, fontSize: 14, backgroundColor: currentButton === 'Список' ? '#383940' : '#F4F3F1', color: currentButton === 'Список' ? 'white' : '#383940' }}>Список</Button>
								<Button
									onClick={handleOpenYandexMap}
									style={{ width: 77, fontWeight: 400, fontSize: 14, backgroundColor: currentButton === 'Карта' ? '#383940' : '#F4F3F1', color: currentButton === 'Карта' ? 'white' : '#383940' }}>Карта</Button>
							</div>
							{currentCategory === Sections.MYORDERS || currentCategory === Sections.PROJECTS ?
								<Button onClick={() => setOpenNewProject(true)}>
									<img src={plus_svg} alt="plus" />
									<span style={{ fontWeight: 800, whiteSpace: 'nowrap' }}>Новый проект</span>
								</Button> : null}
							<SearchOrderInput
								onChange={handleSearchOrder}
								style={{ width: '80%' }} placeholder='         Поиск заказов' />
							{currentCategory === Sections.ORDERS && currentSubCategory === 'Найти заказ' &&
								<SearchOrderFilter />}
						</div>
						{currentCategory === Sections.ORDERS && currentSubCategory === 'Найти заказ' &&
							<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
								<span
									style={{ cursor: 'pointer' }}
									className='textSizeL'
									onClick={() => setIsOpenModal(true)} >{categoryOrder}</span>
								<img src={caret} alt="caret" />
							</div>}
						{isOpenModal &&
							<SearchOrderModal
								style={{ top: 475 }}
								onClose={() => setIsOpenModal(false)} />}
						<div style={{ display: "flex", gap: 14, alignItems: 'center' }}>
							{currentSubCategory === 'Найти заказ' && currentCategory === 'Заказы' && <OrdersFilter />}
							{currentSubCategory === 'Мои заказы' && currentCategory === 'Заказы' &&
								<div style={{ display: 'flex', gap: 580 }}>
									<div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
										<MyOrdersFilter />
										{currentSubCategory === 'Мои заказы' &&
											<Button onClick={() => nav(ROUTES_NAVBAR.createOrder)}>
												<img src={plus_svg} alt="plus" />
												<span style={{ fontWeight: 800 }}>Создать заказ</span>
											</Button>}
									</div>
									<SearchMyOrderFilter />
								</div>
							}
						</div>
						<section ref={sectionRef} style={{ overflowY: 'scroll', height: 580 }}>
							{subSectionComponent}
						</section>
					</div>
				</div> :
				<div style={{ position: 'relative' }}>
					<div className={styles['containerWithYandexMap']}>
						<div className={styles['containerWithYandexMap_header']}>
							<CityAndRadius
								setOpenSearchOrderMap={setOpenMap}
							/>
							<Button
								onClick={handleCloseYandexMap}
								style={{ width: 77, fontWeight: 400, fontSize: 14, backgroundColor: currentButton === 'Список' ? '#383940' : '#F4F3F1', color: currentButton === 'Список' ? 'white' : '#383940' }}>Список</Button>
							<Button
								onClick={handleOpenYandexMap}
								style={{ width: 77, fontWeight: 400, fontSize: 14, backgroundColor: currentButton === 'Карта' ? '#383940' : '#F4F3F1', color: currentButton === 'Карта' ? 'white' : '#383940' }}>Карта</Button>
						</div>
						<section className={styles['containerWithYandexMap_cards']}>
							{compactCards?.map(card => (
								<CompactOrderCard
									key={card.id}
									{...card} />
							))}
						</section>
					</div>
					{openYandexMap &&
						<YandexMap
							isYandexMapForOrders={true}
							styleContainer={{ height: 2000, width: '100%' }} />}
				</div>
			}
		</>
	)
}

export default OrdersAndProjectsPage
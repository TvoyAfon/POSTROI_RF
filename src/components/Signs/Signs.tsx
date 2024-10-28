import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import plus_svg from '../../assets/images/other/add-circle.svg'
import { ROUTES_NAVBAR } from '../../routes/routes'
import { RootState } from '../../store/store'
import UserLocation from '../Navbar/UserLocation/UserLocation'
import CityAndRadius from '../SearchOrder/SearchOrderHeader/CityAndRadius/CityAndRadius'
import Button from '../ui/Button/Button'
import YandexMap from '../ui/InputYandexMap/YandexMap.tsx'
import Line from '../ui/Line/Line'
import SearchOrderInput from '../ui/OrderInput/SearchOrderInput'
import styles from './Signs.module.scss'
import FilterSigns from './SignsCard/ui/FilterSigns.tsx'
import SignsSection from './section/SignsSection.tsx'


const Signs: React.FC = () => {
	const navigate = useNavigate()
	const { user } = useSelector((state: RootState) => state.auth)
	const [openSearchOrderMap, setOpenSearchOrderMap] = useState<boolean>(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [openMap, setOpenMap] = useState(false)
	const [nav, setNav] = useState<string>('my')
	const { cards } = useSelector((state: RootState) => state.signsData)
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

	const handleCloseMap = () => {
		setOpenSearchOrderMap(false)
	}

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	} /* ЛОГИКА ПОИСКОВОГО ЗАПРОСА ПО ИМЕНИ КАРТОЧКИ */
	// Логика поиска
	const filteredCards = useMemo(() => {
		return cards.filter(card =>
			card.data.taskName.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}, [cards, searchTerm])

	// Фильтрация по категории
	const filteredByCategory = useMemo(() => {
		return selectedCategory
			? filteredCards.filter(card => card.data.categoryType === selectedCategory)
			: filteredCards
	}, [filteredCards, selectedCategory])

	const handleResetFilters = () => {
		setSelectedCategory(null)
		setSearchTerm('')
	}

	const countOfCards = filteredByCategory.length

	return (
		<>
			<div style={openMap ? { paddingTop: 65 } : {}} className={styles.signs}>
				<div style={openMap ? {
					width: 620,
					position: 'absolute',
					zIndex: 9,
					left: 0,
					top: 80,
					height: 828,
					border: '1px solid rgba(0,0,0,0.15)'
				} : {}} className={styles.signs_container}>
					{!openMap && <span className='textSizeL'>ОБЪЯВЛЕНИЯ</span>}
					<div style={{ display: 'flex', gap: 24 }}>
						<CityAndRadius
							setOpenSearchOrderMap={setOpenSearchOrderMap}
						/>
						<button
							onClick={() => setOpenMap(false)}
							style={{ color: openMap ? '#383940' : 'white', backgroundColor: !openMap ? '#383940' : '', fontSize: 14, fontWeight: 400, width: 77, height: 34 }}>Список
						</button>
						<button
							onClick={() => setOpenMap(true)}
							style={{ color: openMap ? 'white' : '#383940', backgroundColor: openMap ? '#383940' : '', fontSize: 14, fontWeight: 400, width: 77, height: 34 }}>Карта
						</button>
					</div>
					<div style={{ display: 'flex', gap: 18, alignItems: !openMap ? 'center' : '', flexDirection: !openMap ? 'row' : 'column' }}>
						<div style={{ display: 'flex', gap: 25 }}>
							<div onClick={() => setNav('all')} style={{ position: 'relative' }}>
								<span style={{ cursor: 'pointer', fontSize: 16, fontWeight: nav === 'all' ? 800 : 300, whiteSpace: 'nowrap' }}>Все объявления</span>
								<Line style={{ position: 'absolute', top: 10, border: nav === 'all' ? '1px solid #231F20' : '1px solid white' }} lineWidth='138px' />
							</div>
							{user && <div onClick={() => setNav('my')} style={{ position: 'relative' }}>
								<span style={{ cursor: 'pointer', fontSize: 16, fontWeight: nav === 'my' ? 800 : 300, whiteSpace: 'nowrap' }}>Мои объявления</span>
								<Line style={{ position: 'absolute', top: 10, border: nav === 'my' ? '1px solid  #231F20' : '1px solid white' }} lineWidth='143px' />
							</div>}
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: 25, borderRadius: 8, cursor: 'pointer' }}>
							<FilterSigns
								selectedCategory={selectedCategory}
								handleResetFilters={handleResetFilters}
								setSelectedCategory={setSelectedCategory}
								countOfCards={String(countOfCards)} />
							<SearchOrderInput
								onChange={handleChangeSearch}
								width={user === null && !openMap ? 525 : 480} />
						</div>
						{!openMap && <Button
							onClick={() => navigate(`${ROUTES_NAVBAR.createSigns}`)}>
							<img src={plus_svg} alt="circle" />
							<span style={{ fontSize: 16, fontWeight: 800 }}>Создать объявление</span>
						</Button>}
					</div>
					<SignsSection
						filteredCards={filteredByCategory}
						openMap={openMap} />
				</div>
			</div>
			{openSearchOrderMap &&
				<UserLocation
					isOpenMap={openSearchOrderMap}
					handleCloseMap={handleCloseMap} />
			}
			{openMap && <YandexMap styleContainer={{ width: '100%', height: 2000 }} />}
		</>
	)
}

export default Signs

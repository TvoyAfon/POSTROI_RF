import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import caret from '../../../assets/images/other/caret-bottom-solid.svg'
import useDebounce from '../../../hooks/useDebounce'
import { useModal } from '../../../hooks/useModal'
import { ISearchOrderHeader } from '../../../interface/searchOrderWithMap.props'
import { RootState } from '../../../store/store'
import SearchOrderInput from '../../ui/OrderInput/SearchOrderInput'
import { useSearchOrders } from '../hooks/useSearchOrders'
import styles from '../SearchOrder.module.scss'
import CityAndRadius from './CityAndRadius/CityAndRadius'
import SearchOrderModal from './SearchOrderModal/SearchOrderModal'
import SearchMyOrderFilter from './ui/SearchMyOrderFilter'

const
	SearchOrderHeader: React.FC<ISearchOrderHeader> = ({ openMap, setOpenSearchOrderMap, setOpenMap, handleOpenMap }) => {

		const { handleOpen, isOpen, handleClose } = useModal()
		const [searchTerm, setSearchTerm] = useState('')
		const categoryOrder = useSelector((state: RootState) => state.categoriesForFilterSlice)

		const handleSearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchTerm(e.target.value)
		}

		const debouncedValue = useDebounce(searchTerm, 400)
		useSearchOrders(debouncedValue!, 'Заказы', 'Москва')
		return (
			<>
				{isOpen && <SearchOrderModal
					style={{ top: 310 }}
					onClose={handleClose} />}
				<div style={openMap ? {
					display: 'flex',
					flexDirection: 'column',
					zIndex: 5,
					backgroundColor: 'white',
					width: 550
				} : {
					backgroundColor: 'white',
					zIndex: 3,
				}}
					className={styles.searchOrder_container}>
					<div className={styles.searchOrder_container_section} >
						{!openMap &&
							<div
								style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
								<div
									onClick={handleOpen}
									style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
									<h3
										className='textSizeL'
										style={{ cursor: 'pointer' }}>{categoryOrder.category1}
									</h3>
									<img style={{ cursor: 'pointer' }} src={caret} alt="caret" />
								</div>
								<SearchOrderInput
									value={searchTerm}
									onChange={handleSearchByName}
									width={!openMap ? 557 : 513} />
								<SearchMyOrderFilter />
							</div>}
						<div style={{ display: 'flex', gap: 22 }}>
							<CityAndRadius
								openMap={openMap}
								setOpenSearchOrderMap={setOpenSearchOrderMap} />
							<div style={{ display: 'flex', gap: 14 }}>
								<button
									onClick={() => setOpenMap(false)}
									style={{ color: openMap ? '#383940' : 'white', backgroundColor: !openMap ? '#383940' : '', fontSize: 14, fontWeight: 400, width: 77, height: 34 }}>Список
								</button>
								<button
									onClick={handleOpenMap}
									style={{ color: openMap ? 'white' : '#383940', backgroundColor: openMap ? '#383940' : '', fontSize: 14, fontWeight: 400, width: 77, height: 34 }}>Карта
								</button>
							</div>
							<div className={styles.input} style={{ position: 'relative' }}>
								<div
									style={{
										display: 'flex',
										gap: 20,
										alignItems: 'center',
										position: 'absolute',
										top: openMap ? 40 : -25,
										left: openMap ? -520 : '',
										backgroundColor: openMap ? 'white' : undefined,
										height: 80,
									}}>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

export default SearchOrderHeader

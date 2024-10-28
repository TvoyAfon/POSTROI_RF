import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { type YMapLocationRequest } from 'ymaps3'
import { reactify, YMap, YMapDefaultFeaturesLayer, YMapDefaultSchemeLayer, YMapListener, YMapMarker } from '../../../../lib/ymaps'
import markerDefault from '../../../assets/images/other/GEOMARKER.svg'
import markerCircle from '../../../assets/images/other/GEOMARKER_CIRCLE (1).svg'
import { useOutsideClick } from '../../../hooks/useOutside'
import { changeCityCoords } from '../../../store/slices/CurrentCitySlice'
import { RootState } from '../../../store/store'
import { zoomRange } from './settings/yandexMapSettings'
import styles from './YandexMap.module.scss'


const YandexMap: React.FC<{ styleContainer?: CSSProperties, isYandexMapForOrders?: boolean }> = ({ styleContainer, isYandexMapForOrders = false }) => {
  const { cityCoords } = useSelector((state: RootState) => state.currentCity)
  const dispatch = useDispatch()
  const [zoom, setZoom] = useState(13)
  const [coordinates, setCoordinates] = useState({ lat: cityCoords.lat, lon: cityCoords.lon })
  const { ordersList } = useSelector((state: RootState) => state.orders)
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null)
  const ref = useRef<HTMLImageElement>(null)
  const yMapRef = useRef(null)

  useEffect(() => {
    setCoordinates({ lat: cityCoords.lat, lon: cityCoords.lon })
  }, [cityCoords])

  useOutsideClick(ref, () => setSelectedMarkerId(null))

  // Handle the end of drag event for marker
  const handleDragEnd = useCallback((coords: any) => {
    setCoordinates({ lat: coords[1], lon: coords[0] })
    dispatch(changeCityCoords({ lat: coords[1], lon: coords[0] }))
  }, [dispatch])


  const LOCATION: YMapLocationRequest = useMemo(() => ({
    center: [coordinates.lon, coordinates.lat],
    zoom: zoom,
  }), [coordinates, zoom])

  const handleMarkerClick = useCallback((id: number) => {
    setSelectedMarkerId(id)
  }, [])

  const handleClickMap = useCallback((event: any) => {
    console.log(event)
    const [lon, lat] = event.entity.geometry.coordinates
    setCoordinates({ lat, lon })
    dispatch(changeCityCoords({ lat, lon }))
  }, [dispatch, coordinates])


  const handleUpdate = useCallback((event: any) => {
    setZoom(event.location.zoom)
  }, [zoom])

  return (
    <div
      id='yandexMap'
      className={styles['yandexMapContainer']}
      style={{ width: '850px', height: '350px', ...styleContainer }}>
      <YMap
        ref={yMapRef}
        zoomRange={zoomRange}
        key={`${coordinates.lon}-${coordinates.lat}`}
        location={reactify.useDefault(LOCATION)}
      >
        <YMapListener
          onUpdate={handleUpdate}
          onClick={handleClickMap} />
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        {!isYandexMapForOrders && (
          <YMapMarker
            onDragEnd={handleDragEnd}
            coordinates={reactify.useDefault([coordinates.lon, coordinates.lat])}
            draggable={true}
          >
            <FaMapMarkerAlt style={{ width: 30, height: 30, cursor: 'grab' }} />
          </YMapMarker>
        )}
        {isYandexMapForOrders && ordersList.map(order => (
          <YMapMarker
            key={order.id}
            draggable={false}
            coordinates={reactify.useDefault([order.longitude, order.latitude])}
            onClick={() => handleMarkerClick(order.id)}  // Using memoized handler
          >
            <img
              ref={ref}
              style={{ cursor: 'pointer', width: selectedMarkerId === order.id ? 50 : undefined, height: selectedMarkerId === order.id ? 50 : undefined }}
              src={selectedMarkerId === order.id ? markerDefault : markerCircle}
              alt="marker"
            />
          </YMapMarker>
        ))}

      </YMap>
    </div>
  )
}

export default YandexMap
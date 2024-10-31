import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom'
import { Categories, SubsectionsByCleaning, SubsectionsByTruckingAndServices, SubsectionsByWorkers } from '../../../common/categories'
import { ROUTES_NAVBAR } from '../../../routes/routes'
import { addOrderData } from '../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { addOrderCleaningData } from '../../../store/slices/data/OrderDataCleaning'
import { addOrderMaterialsData } from '../../../store/slices/data/OrderDataMaterials'
import { addOrderServicesData } from '../../../store/slices/data/OrderDataServices'
import { addGlobalOrderDataTaskname } from '../../../store/slices/data/OrderDataTaskname'
import { addOrderTruckingData } from '../../../store/slices/data/OrderDataTrucking'
import { addOrderWorkersData } from '../../../store/slices/data/OrderDataWorkers'
import { addOrderUniversalData } from '../../../store/slices/data/OrderUniversalData'
import { addSignsData } from '../../../store/slices/Signs/dataSigns/DataSignsSlice'
import { RootState } from '../../../store/store'
import styles from '../CreateOrder.module.scss'
import CreateOrderModal from '../CreateOrderModal/CreateOrderModal'

const CreateOrderName: React.FC = () => {

  const location = useLocation()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { categoryName, subCategoryName } = useSelector((state: RootState) => state.createOrderCategories)
  const { error } = useSelector((state: RootState) => state.createOrderValidation)

  const { data } = useSelector((state: RootState) => state.createOrderData)
  const { dataTrucking } = useSelector((state: RootState) => state.createOrderTruckingData)
  const { dataServices } = useSelector((state: RootState) => state.createOrderServicesData)
  const { dataCleaning } = useSelector((state: RootState) => state.createOrderCleaningData)
  const { dataWorkers } = useSelector((state: RootState) => state.createOrderWorkersData)
  const { dataMaterials } = useSelector((state: RootState) => state.createOrderMaterialsData)
  const { dataUniversal } = useSelector((state: RootState) => state.createOrderUniversalData)
  const { dataSigns } = useSelector((state: RootState) => state.signsData)
  const { globalOrderData } = useSelector((state: RootState) => state.globalOrderDatataskname)

  const universalCategories = [
    Categories.BuildExpertise,
    Categories.Rent,
    Categories.ProjectAndDesign,
    Categories.Geo
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const string = e.target.value
    if (string.length < 35) {
      dispatch(addGlobalOrderDataTaskname(string))
    }
  }

  useEffect(() => {


    if (categoryName === '') dispatch(addGlobalOrderDataTaskname(globalOrderData))
    if (categoryName === Categories.Building) {
      dispatch(addOrderData({
        ...data,
        category1: categoryName,
        taskName: globalOrderData
      }))

    }
    if (categoryName === Categories.TRUCKINGANDSERVCES) {
      if (subCategoryName === SubsectionsByTruckingAndServices.TRUCKING) {
        dispatch(addOrderTruckingData({
          ...dataTrucking,
          categoryType: categoryName,
          taskName: globalOrderData
        }))
      }
      else if (subCategoryName === SubsectionsByTruckingAndServices.CARS) {
        dispatch(addOrderServicesData({
          ...dataServices,
          categoryType: categoryName,
          taskName: globalOrderData
        }))
      }

    }

    if (categoryName === Categories.Cleaning) {
      if (subCategoryName === SubsectionsByCleaning.CLEANING_HOUSE) {
        dispatch(addOrderCleaningData({
          ...dataCleaning,
          categoryType: categoryName,
          taskName: globalOrderData
        }))
      }
    }
    if (categoryName === Categories.WORKERSANDSPEC) {
      if (subCategoryName === SubsectionsByWorkers.WORKERS) {
        dispatch(addOrderWorkersData({
          ...dataWorkers,
          categoryType: categoryName,
          taskName: globalOrderData
        }))
      }
    }
    if (categoryName === Categories.Materials) {
      dispatch(addOrderMaterialsData({
        ...dataMaterials,
        categoryType: categoryName,
        taskName: globalOrderData
      }))
    }
    if (universalCategories.includes(categoryName as Categories)) {
      dispatch(addOrderUniversalData({
        ...dataUniversal,
        categoryType: categoryName,
        taskName: globalOrderData
      }))
    }

    if (location.pathname === `${ROUTES_NAVBAR.createSigns}`) {
      dispatch(addSignsData({
        ...dataSigns,
        categoryType: categoryName,
        taskName: globalOrderData
      }))

    }
  }, [globalOrderData, location])

  const handleOpenModal = () => {
    setOpenModal(true)
  }


  return (
    <div className={styles.createOrderStep1}>
      <span style={{ fontSize: '20px', fontWeight: '600' }}>НАЗВАНИЕ  {location.pathname === '/create-signs' ? 'ОБЪЯВЛЕНИЯ' : 'ЗАКАЗА'}</span>
      <input onChange={handleChange} value={globalOrderData} type="text" />
      {error.inputTaskNameError && globalOrderData.length === 0 ? <error.inputTaskNameError /> : null}
      <div style={{ marginTop: '18px', marginBottom: '32px' }}>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '28px' }}>
          <span style={{ fontSize: '20px', fontWeight: '600' }} >КАТЕГОРИЯ</span>
          <div onClick={handleOpenModal} style={{ color: '#7099ED', cursor: 'pointer', position: 'relative' }}>
            <span style={{ color: '#7099ED', fontSize: 16 }}>Выбрать из списка</span>
            <hr style={{ border: '1px solid #7099ED', position: 'absolute', width: 150, top: 14 }} />
          </div>
          {error.categoriesError && <error.categoriesError />}
        </div>
        {categoryName !== '' && <span style={{ fontSize: 16, fontWeight: 300, backgroundColor: '#F4F3F1', padding: '4px 8px 4px 8px', borderRadius: 8, width: 230, marginTop: 18 }}>{categoryName}</span>}
      </div>
      {openModal && <CreateOrderModal setOpenModal={setOpenModal} />}
    </div>
  )
}

export default CreateOrderName

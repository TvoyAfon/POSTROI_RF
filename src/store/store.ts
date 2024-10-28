import { configureStore } from '@reduxjs/toolkit'
import resetPassword from './slices/AuthSlice/AuthResetPasswordSlice'
import authTelegram from './slices/AuthSlice/authTelegram/AuthTelegramSlice'
import favCategorySlice from './slices/CategoriesFavorites/CategoriesFavorites'
import categoriesForFilterSlice from './slices/CategoriesForFilter/CategoriesForFilterSlice'
import createOrderData from './slices/CreateOrder/data/CreateOrderDataSlice'
import createOrderReducer from './slices/CreateOrder/form/CreateOrderForm'
import createOrderCategories from './slices/CreateOrderCategoriesSlice'
import currentCityReducer from './slices/CurrentCitySlice'
import formReducer from './slices/FormSlice/FormSlice'
import registerReducer from './slices/RegisterSlice'
import resetReducer from './slices/ResetPasswordSlice/ResetPasswordSlice'
import signsDataReducer from './slices/Signs/dataSigns/DataSignsSlice'
import signsReducer from './slices/Signs/stepSigns/signsSlice'
import createOrderCleaning from './slices/categories/CreateOrderCleaning'
import createOrderMaterials from './slices/categories/CreateOrderMaterials'
import createOrderServices from './slices/categories/CreateOrderServices'
import createOrderTrucking from './slices/categories/CreateOrderTruckingSlice'
import createOrderUniversal from './slices/categories/CreateOrderUniversal'
import openCategoryVendorAndMat from './slices/categories/CreateOrderVendorAndMaterials/CreateOrderVendorAndMaterials'
import createOrderWorkers from './slices/categories/CreateOrderWorkers'
import currentPageMastersType from './slices/currentMastersPageType/currentPageTypeSlice'
import checkActiveModal from './slices/other/checkActiveModal'
import countProjectsSlice from './slices/other/countProjects'
import currentTabInProfile from './slices/other/currentTabInProfile'
import getEducationDegree from './slices/other/getEducationDegree'
import setBindSocials from './slices/other/setBindSocials'
import externalHashSlice from './slices/other/setExternalHash'
import yandexTokenSlice from './slices/other/setTokenYandex'
import triggerFetch from './slices/other/triggerFetch'
import createOrderValidation from './slices/validation/CreateOrderValidationSlice'

import createOrderCleaningData from './slices/data/OrderDataCleaning'
import createOrderMaterialsData from './slices/data/OrderDataMaterials'
import createOrderServicesData from './slices/data/OrderDataServices'
import createOrderTruckingData from './slices/data/OrderDataTrucking'
import createOrderWorkersData from './slices/data/OrderDataWorkers'
import createOrderUniversalData from './slices/data/OrderUniversalData'

import modalClickFlag from './closeModalClick/closeModalClickSlice'
import authSlice from './slices/AuthSlice/AuthSlice'
import calendarReducer from './slices/CalendarSlice/CalendarSlice'
import editModalClickFLag from './slices/EditModalFlag/EditModalFlagSlice'
import opemModalConfirm from './slices/ModalConfirmSlice/modalConfirmSlice'
import openUserLocationReducer from './slices/ModalUserLocationSlice/modalUserLocationSlice'
import resetColorNav from './slices/SetNavColorSlice'
import globalOrderDatataskname from './slices/data/OrderDataTaskname'
import createOrderHierarchySlice from './slices/other/categoriesList'
import openNavbarPopupSlice from './slices/other/openNavbarPopup'

import chatReducer from './slices/ChatSlice/ChatSlice'
import checkDirtyField from './slices/other/checkDirtyField'
import openWorkerDone from './slices/other/closeWorkerFormSlice'
import getStateMailRU from './slices/other/getStatefromMail'
import searchOrderRadius from './slices/searchOrder/searchRadiusSlice'

import formMasterReducer from './slices/FormMaster/formMasterSlice'
import formWorkerReducer from './slices/FormWorker/formWorkerSlice'
import projectReducer from './slices/ProjectsSlice/ProjectsSlice'
import orderCard from './slices/categories/orderCard/orderCardSlice'
import ordersReducer from './slices/orders/ordersSlice'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root', // ключ в локальном хранилище
  storage, // используем хранилище
}

const persistedReducer = persistReducer(persistConfig, favCategorySlice)

export const store = configureStore({
  reducer: {
    auth: authSlice,
    form: formReducer,      /* Для auth */
    resetPassword,
    register: registerReducer,
    reset: resetReducer,
    openNavbarPopupSlice,
    calendarReducer,
    modalClickFlag,
    checkDirtyField,
    orders: ordersReducer,
    editModalClickFLag,
    projects: projectReducer,
    chat: chatReducer,
    currentPageMastersType,
    openWorkerDone,
    getEducationDegree,
    triggerFetch,
    currentTabInProfile,
    countProjectsSlice,
    checkActiveModal,
    createOrderUniversal,
    setBindSocials,
    externalHashSlice,
    yandexTokenSlice,
    categoriesForFilterSlice,
    favCategories: persistedReducer,
    createOrderHierarchySlice,

    currentCity: currentCityReducer,
    resetColorNav,
    searchOrderRadius,
    openUserLocationReducer,
    openCategoryVendorAndMat,
    opemModalConfirm,

    authTelegram,
    getStateMailRU,   /* Телеграм авторизация */

    globalOrderDatataskname,
    createOrderTruckingData,
    createOrderData,
    createOrderServicesData,   /* все данные c катег.*/
    createOrderCleaningData,
    createOrderWorkersData,
    createOrderMaterialsData,
    createOrderUniversalData,

    createOrderValidation,
    createOrderCategories,

    createOrder: createOrderReducer,
    createOrderTrucking,         /* steps для категорий */
    createOrderServices,
    createOrderCleaning,
    createOrderMaterials,
    createOrderWorkers,

    signsReducer,
    signsData: signsDataReducer,
    orderCard,



    formWorkerReducer,
    formMasterReducer      /* Данные мастеро и разнорабочих */

  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})
const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { persistor }

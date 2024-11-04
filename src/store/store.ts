import { configureStore } from '@reduxjs/toolkit'
import resetPassword from './slices/AuthSlice/AuthResetPasswordSlice'
import authSlice from './slices/AuthSlice/AuthSlice'
import authTelegram from './slices/AuthSlice/authTelegram/AuthTelegramSlice'
import calendarReducer from './slices/CalendarSlice/CalendarSlice'
import favCategorySlice from './slices/CategoriesFavorites/CategoriesFavorites'
import categoriesForFilterSlice from './slices/CategoriesForFilter/CategoriesForFilterSlice'
import createOrderData from './slices/CreateOrder/data/CreateOrderDataSlice'
import createOrderReducer from './slices/CreateOrder/form/CreateOrderForm'
import createOrderCategories from './slices/CreateOrderCategoriesSlice'
import currentCityReducer from './slices/CurrentCitySlice'
import editModalClickFLag from './slices/EditModalFlag/EditModalFlagSlice'
import formReducer from './slices/FormSlice/FormSlice'
import opemModalConfirm from './slices/ModalConfirmSlice/modalConfirmSlice'
import openUserLocationReducer from './slices/ModalUserLocationSlice/modalUserLocationSlice'
import registerReducer from './slices/RegisterSlice'
import resetReducer from './slices/ResetPasswordSlice/ResetPasswordSlice'
import resetColorNav from './slices/SetNavColorSlice'
import signsDataReducer from './slices/Signs/dataSigns/DataSignsSlice'
import signsReducer from './slices/Signs/stepSigns/signsSlice'
import openCategoryVendorAndMat from './slices/categories/CreateOrderVendorAndMaterials/CreateOrderVendorAndMaterials'
import modalClickFlag from './slices/closeModalClick/closeModalClickSlice'
import currentPageMastersType from './slices/currentMastersPageType/currentPageTypeSlice'
import createOrderHierarchySlice from './slices/other/categoriesList'
import checkActiveModal from './slices/other/checkActiveModal'
import countProjectsSlice from './slices/other/countProjects'
import currentTabInProfile from './slices/other/currentTabInProfile'
import getEducationDegree from './slices/other/getEducationDegree'
import openNavbarPopupSlice from './slices/other/openNavbarPopup'
import setBindSocials from './slices/other/setBindSocials'
import externalHashSlice from './slices/other/setExternalHash'
import yandexTokenSlice from './slices/other/setTokenYandex'
import triggerFetch from './slices/other/triggerFetch'
import createOrderValidation from './slices/validation/CreateOrderValidationSlice'

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


    createOrderData,

    createOrderValidation,
    createOrderCategories,

    createOrder: createOrderReducer,
    /* steps для форм заказа */
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

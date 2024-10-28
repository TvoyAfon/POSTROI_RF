import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCreateOrderDone } from '../../hooks/stepsValidation/useCreateOrderDone'
import { useStepValidationSigns } from '../../hooks/stepsValidationSigns/useStepValidationSigns'
import useKeyPress from '../../hooks/useKeyPress'
import useLeaveModal from '../../hooks/useLeaveModal/useLeaveModal'
import { changeCategoryName } from '../../store/slices/CreateOrderCategoriesSlice'
import { addGlobalOrderDataTaskname } from '../../store/slices/data/OrderDataTaskname'
import { isLogoClickFlag, openConfirmModalSigns } from '../../store/slices/ModalConfirmSlice/modalConfirmSlice'
import { setColorNav } from '../../store/slices/SetNavColorSlice'
import { addSignsCard } from '../../store/slices/Signs/dataSigns/DataSignsSlice'
import { changeSignsStep } from '../../store/slices/Signs/stepSigns/signsSlice'
import { addCategoryError, addClickFlag, addInputTaskNameError } from '../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../store/store'
import CreateOrderDone from '../CreateOrder/CreateOrderDone/CreateOrderDone'
import CreateOrderOverlay from '../CreateOrder/CreateOrderOverlay/CreateOrderOverlay'
import BreadCrumbs from '../ui/BreadCrumbs/BreadCrumbs'
import LeaveConfirmModal from '../ui/LeaveConfirmModal/LeaveConfirmModal'
import OrderHeader from '../ui/OrderHeader/OrderHeader'
import styles from './Signs.module.scss'
import SignsBox from './SignsBox/SignsBox'

const CreateSigns: React.FC = () => {
  const stepSigns = useSelector((state: RootState) => state.signsReducer)
  const dispatch = useDispatch()
  const { isOpenConfirmModalSigns } = useSelector((state: RootState) => state.opemModalConfirm)
  const { isLogoClick } = useSelector((state: RootState) => state.opemModalConfirm)
  const navigate = useNavigate()
  const createOrderDone = useCreateOrderDone()
  const { isDirtyFieldForOrder } = useSelector((state: RootState) => state.checkDirtyField)
  const { user } = useSelector((state: RootState) => state.auth)
  const checkSignsStep = useStepValidationSigns()
  const { dataSigns } = useSelector((state: RootState) => state.signsData)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useKeyPress('Enter', () => buttonRef.current?.click())

  const handleClickLeave = () => {
    if (isLogoClick) {
      navigate('/')
      dispatch(isLogoClickFlag(false))
      dispatch(setColorNav(''))
      dispatch(changeCategoryName(''))
    }
    else
      navigate(-1)
    dispatch(setColorNav(''))
    dispatch(changeCategoryName(''))
    /* СДЕЛАТЬ ОЧИСТКУ У ОБЬЯВЛЕНИЙ */
  }

  useLeaveModal(isDirtyFieldForOrder)

  const { categoryName } = useSelector((state: RootState) => state.createOrderCategories)

  const handleContinue = () => {
    if (categoryName === '') dispatch(addCategoryError(true))

    dispatch(addClickFlag(true))
    dispatch(addInputTaskNameError(dataSigns.taskName))
    if (categoryName !== '') checkSignsStep()

    if (stepSigns.stepComponentNumber === 5) { /* Если форма === 5 по счету.То при клике на опубликовать данные с форм добавляются в массив карточек */
      if (user) { dispatch(addSignsCard()) }  /* Если пользователь авторизован */

    }
  }
  const handleBack = () => {
    if (stepSigns.stepComponentNumber < 2) {
      dispatch(openConfirmModalSigns(true))
      return
    }
    dispatch(changeSignsStep(stepSigns.stepComponentNumber - 1))
  }

  const handleClickStay = () => {
    dispatch(openConfirmModalSigns(false))
  }

  useEffect(() => {
    dispatch(addGlobalOrderDataTaskname(''))
  }, [])

  useEffect(() => {
    dispatch(openConfirmModalSigns(false))
  }, [])

  return (
    <>
      {createOrderDone ?
        <CreateOrderDone signsOrOrder='signs' /> :
        <div
          className={styles['createSigns_container']}
        >
          <BreadCrumbs
            subsubsubCategory={dataSigns.subsubsubCategoryType}
            subsubCategory={dataSigns.subsubCategoryType}
            subCategory={dataSigns.subCategoryType}
            category={dataSigns.categoryType} />
          <div
            className={styles['boxAndForms']}
            style={{ display: 'flex', gap: 24 }}>
            <SignsBox />
            <div className={styles['createsigns_formsstep']}>
              {stepSigns.stepComponentNumber === 5 && <OrderHeader />}
              <CreateOrderOverlay
                isLoading={false}
                currentCategoryStep={stepSigns.stepComponentNumber === 5}
                ref={buttonRef}
                handleBack={handleBack}
                handleContinue={handleContinue}
                typeOrder='signs'>
                <stepSigns.stepComponent />
              </CreateOrderOverlay>
            </div>
          </div>
          {isOpenConfirmModalSigns &&
            <LeaveConfirmModal
              handleClickLeave={handleClickLeave}
              handleClickStay={handleClickStay} />}
        </div>}
    </>
  )
}
export default CreateSigns

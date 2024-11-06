import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCreateOrderDone } from '../../hooks/stepsValidationOrder/useCreateOrderDone'
import { useStepValidationSigns } from '../../hooks/stepsValidationSigns/useStepValidationSigns'
import useKeyPress from '../../hooks/useKeyPress'
import useLeaveModal from '../../hooks/useLeaveModal/useLeaveModal'
import { changeCategoryName } from '../../store/slices/CreateOrderCategoriesSlice'
import { isLogoClickFlag, openConfirmModalSigns } from '../../store/slices/ModalConfirmSlice/modalConfirmSlice'
import { setColorNav } from '../../store/slices/SetNavColorSlice'
import { addSignsCard } from '../../store/slices/Signs/dataSigns/DataSignsSlice'
import { changeSignsStep } from '../../store/slices/Signs/stepSigns/signsSlice'
import { addCategoryError, addClickFlag, addInputTaskNameError } from '../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../store/store'
import BreadCrumbs from '../ui/BreadCrumbs/BreadCrumbs'
import LeaveConfirmModal from '../ui/LeaveConfirmModal/LeaveConfirmModal'
import OrderHeader from '../ui/OrderHeader/OrderHeader'
import styles from './Signs.module.scss'
import SignsBox from './SignsBox/SignsBox'
import SignsDone from './SignsDone/SignsDone'
import SignsOverlay from './SignsOverlay/SignsOverlay'

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
    dispatch(openConfirmModalSigns(false))
  }, [])

  return (
    <>
      {createOrderDone ?
        <SignsDone isSigns={true} /> :
        <div
          className={styles['createSigns_container']}
        >
          <BreadCrumbs
            category4={dataSigns.subsubsubCategoryType}
            category3={dataSigns.subsubCategoryType}
            category2={dataSigns.subCategoryType}
            category1={dataSigns.categoryType} />
          <div
            className={styles['boxAndForms']}
            style={{ display: 'flex', gap: 24 }}>
            <SignsBox />
            <div className={styles['createsigns_formsstep']}>
              {stepSigns.stepComponentNumber === 5 && <OrderHeader />}
              <SignsOverlay
                isLoading={false}
                currentCategoryStep={stepSigns.stepComponentNumber === 5}
                ref={buttonRef}
                handleBack={handleBack}
                handleContinue={handleContinue}
                typeOrder='signs'>
                <stepSigns.stepComponent />
              </SignsOverlay>
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

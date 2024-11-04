import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import arrowRightIcon from '../../assets/images/chat_images/arrow-right.svg'
import arrow_back from '../../assets/images/createOrder_img/arrow-left-02-grey.svg'
import { useCreateOrderDone } from '../../hooks/stepsValidationOrder/useCreateOrderDone'
import { useStepValidationOrder } from '../../hooks/stepsValidationOrder/useStepValidationOrder'
import useKeyPress from '../../hooks/useKeyPress'
import useLeaveModal from '../../hooks/useLeaveModal/useLeaveModal'
import { orderService } from '../../services/order/order'
import { clearOrderData } from '../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { changeStep, resetAllSteps } from '../../store/slices/CreateOrder/form/CreateOrderForm'
import { isLogoClickFlag, openConfirmModalSearch } from '../../store/slices/ModalConfirmSlice/modalConfirmSlice'
import { addMyOrder } from '../../store/slices/orders/ordersSlice'
import { setSelectedHierarchy } from '../../store/slices/other/categoriesList'
import { setColorNav } from '../../store/slices/SetNavColorSlice'
import { addCategoryError, addClickFlag } from '../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../store/store'
import { getFormattedOrder } from '../../utils/order-formatting'
import SignsDone from '../Signs/SignsDone/SignsDone'
import BreadCrumbs from '../ui/BreadCrumbs/BreadCrumbs'
import Button from '../ui/Button/Button'
import CreateOrderFooter from '../ui/CreateOrderFooter/CreateOrderFooter'
import LeaveConfirmModal from '../ui/LeaveConfirmModal/LeaveConfirmModal'
import UncorrectFormat from '../ui/Modal/UncorrectFormat'
import styles from './CreateOrder.module.scss'
import CreateOrderBox from './CreateOrderBox'
import { flexRow, stylesButtonOrder } from './forms/styles/stylesCreateOrder'
import { useCreateOrder } from './hooks/useCreateOrder'

const CreateOrder: React.FC = () => {
  const nav = useNavigate()
  const step = useSelector((state: RootState) => state.createOrder)
  const dispatch = useDispatch()
  const dataOrder = useSelector((state: RootState) => state.createOrderData)
  const continueButtonRef = useRef<HTMLButtonElement>(null)
  const orderValidationSteps = useStepValidationOrder()
  const orderDone = useCreateOrderDone()
  const { isDirtyFieldForOrder } = useSelector((state: RootState) => state.checkDirtyField)
  const { isLogoClick } = useSelector((state: RootState) => state.opemModalConfirm)
  const { isOpenConfirmModal } = useSelector((state: RootState) => state.opemModalConfirm)
  const orderData = useSelector((state: RootState) => state.createOrderData)
  const { user } = useSelector((state: RootState) => state.auth)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const data = useCreateOrder()

  const handleContinue = async () => {
    if (!dataOrder.data.category1) {
      dispatch(addCategoryError(true))
    } else dispatch(addCategoryError(false))

    dispatch(addClickFlag(true))
    const isDone = orderValidationSteps()
    if (!isDone) return


    if (!data) return
    const body = data.body
    const params = data.params

    if (!params.contact_phone?.trim()) {
      return setError(true)
    }
    else setError(false)

    try {
      setLoading(true)
      const response = await orderService.create(body, params)

      if (!response || !user?.id) return

      const orderInfo = await orderService.info({
        client_id: user.id,
        order_id: response.order_id
      })
      if (!orderInfo) return

      const formattedOrder = await getFormattedOrder(orderInfo)
      dispatch(addMyOrder(formattedOrder))
      dispatch(changeStep(step.stepComponentNumber + 1))
    } catch (error) {
      setLoading(false)
      console.log('Не удалось создать заказ', error)
    }
    finally {
      setLoading(false)
    }

  }

  useKeyPress('Enter', () => continueButtonRef.current?.click())
  useLeaveModal(isDirtyFieldForOrder)

  const handleBack = () => {
    dispatch(changeStep(step.stepComponentNumber - 1))
    if (step.stepComponentNumber === 1) {
      nav(-1)
    }
  }


  useEffect(() => {
    dispatch(openConfirmModalSearch(false))
  }, [])


  const changeBorderRadius = () => {
    if (step.stepComponentNumber === 6) {
      return '32px 32px 0px 0px'
    }
    return '32px 32px 32px 32px'
  }
  const handleClickLeave = () => {
    if (isLogoClick) {
      nav('/')
      dispatch(isLogoClickFlag(false))
      dispatch(setColorNav(''))
      dispatch(resetAllSteps())
      dispatch(setSelectedHierarchy({
        category1: '',
        category2: '',
        category3: '',
        category4: '',
        id: null
      }))
      dispatch(clearOrderData())
    }
    else
      nav(-1)
    dispatch(setColorNav(''))
    dispatch(resetAllSteps())
    dispatch(setSelectedHierarchy({
      category1: '',
      category2: '',
      category3: '',
      category4: '',
      id: null
    }))
    dispatch(clearOrderData())
  }

  const handleClickStay = () => {
    dispatch(openConfirmModalSearch(false))
  }

  return (
    <>
      {error && <UncorrectFormat
        onClose={() => setError(false)}
        text='Подтвердите ваш номер телефона' />}
      {orderDone ? <SignsDone isSigns={false} /> :
        <div className={styles['create_order']} style={{ display: 'flex', justifyContent: 'center', paddingTop: 145, paddingBottom: 32 }}>
          <div className={styles['create_order_content']} style={{ display: 'flex', gap: 16, position: 'relative' }}>
            <BreadCrumbs
              category1={orderData.data.category1}
              category2={orderData.data.category2}
              category3={orderData.data.category3}
              category4={orderData.data.category4}
            />
            <CreateOrderBox />
            <div
              style={{ borderRadius: changeBorderRadius() }}
              className={styles.createOrderForm}>
              <step.stepComponent />
              {step.stepComponentNumber === 6 ?
                <CreateOrderFooter
                  loading={loading}
                  handleBack={handleBack}
                  handleContinue={handleContinue} /> :
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <Button
                    style={stylesButtonOrder}
                    onClick={handleBack}>
                    <div style={flexRow}>
                      <img src={arrow_back} alt="back" />
                      <span>Назад</span>
                    </div>
                  </Button>
                  <Button
                    ref={continueButtonRef}
                    style={{ width: 148, borderRadius: 6 }}
                    onClick={handleContinue} >
                    <div style={flexRow}>
                      <span>Продолжить</span>
                      <img src={arrowRightIcon} alt="continue" />
                    </div>
                  </Button>
                </div>
              }
            </div>
          </div>
          {isOpenConfirmModal && <LeaveConfirmModal handleClickLeave={handleClickLeave} handleClickStay={handleClickStay} />}
        </div>}
    </>
  )
}

export default CreateOrder
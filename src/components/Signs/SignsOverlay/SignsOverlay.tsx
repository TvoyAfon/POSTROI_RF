import { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import back_svg from '../../../assets/images/createOrder_img/arrow-left-02.svg'
import next_svg from '../../../assets/images/createOrder_img/arrow-rightOrder.svg'
import { ICreateOrder } from '../../../interface/createOrder.props'
import { RootState } from '../../../store/store'
import ErrorSignature from '../../Auth/ui/ErrorSignature'
import Button from '../../ui/Button/Button'
import Loader from '../../ui/Loader/Loader'
import styles from './SignsOverlay.module.scss'
import { useChangeBorderRadius } from './utils/useChangeBorderRadius'


interface ICreateOrderOverlayProps extends ICreateOrder {
  isLoading: boolean
  errorMessage?: string
}

const SignsOverlay = forwardRef<HTMLButtonElement, ICreateOrderOverlayProps>(
  ({ children, currentCategoryStep, handleBack, handleContinue, isLoading, errorMessage = '' }, ref) => {
    const { categoryName, subCategoryName } = useSelector((state: RootState) => state.createOrderCategories)


    return (
      <>
        <div style={{ borderRadius: useChangeBorderRadius() }} className={styles.overlay}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <span style={{ fontWeight: '300', color: 'gray', fontSize: 16 }}>
              {`${categoryName} > ${subCategoryName}`}
            </span>
            {children}
            {
              errorMessage
              &&
              <ErrorSignature>
                {errorMessage}
              </ErrorSignature>
            }
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={
                handleBack}
              style={{ width: 144, height: 36, backgroundColor: '#F4F3F1', marginTop: 32 }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingRight: 10 }}>
                <img src={back_svg} alt="back" />
                <span style={{ color: 'gray' }}>Назад</span>
              </div>
            </Button>
            <Button
              ref={ref}
              onClick={handleContinue}
              style={{ width: 154, height: 36, marginTop: 32, paddingRight: 3 }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingRight: 10 }}>
                <span>{
                  currentCategoryStep
                    ?
                    !isLoading
                      ?
                      'Опубликовать'
                      : <Loader
                        text='Подождите...'
                        color='#fff'
                        style={{
                          marginLeft: '25px'
                        }}
                      />
                    :
                    'Далее'
                }</span>
                <img src={next_svg} alt="next" />
              </div>
            </Button>
          </div>
        </div >
      </>
    )
  }
)

export default SignsOverlay
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'


export const useCreateOrderFooter = () => {
  const step = useSelector((state: RootState) => state.createOrder)
  const stepTrucking = useSelector((state: RootState) => state.createOrderTrucking)
  const stepServices = useSelector((state: RootState) => state.createOrderServices)
  const stepCleaning = useSelector((state: RootState) => state.createOrderCleaning)
  const stepMaterials = useSelector((state: RootState) => state.createOrderMaterials)
  const stepWorkers = useSelector((state: RootState) => state.createOrderWorkers)
  const stepUniversal = useSelector((state: RootState) => state.createOrderUniversal)

  if (step.stepComponentNumber === 6) return true
  if (stepTrucking.stepComponentNumber === 7) return true
  if (stepServices.stepComponentNumber === 7) return true
  if (stepCleaning.stepComponentNumber === 7) return true
  if (stepMaterials.stepComponentNumber === 6) return true
  if (stepWorkers.stepComponentNumber === 7) return true
  if (stepUniversal.stepComponentNumber === 6) return true
}
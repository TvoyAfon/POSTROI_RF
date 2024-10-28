import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../../store/store'


export const useBackToMain = () => {
	const step = useSelector((state: RootState) => state.createOrder)
	const stepTrucking = useSelector((state: RootState) => state.createOrderTrucking)
	const stepServices = useSelector((state: RootState) => state.createOrderServices)
	const stepCleaning = useSelector((state: RootState) => state.createOrderCleaning)
	const stepMaterials = useSelector((state: RootState) => state.createOrderMaterials)
	const stepWorkers = useSelector((state: RootState) => state.createOrderWorkers)
	const nav = useNavigate()

	if (step.stepComponentNumber === 7) return nav('/')
	if (stepTrucking.stepComponentNumber === 8) return nav('/')
	if (stepServices.stepComponentNumber === 8) return nav('/')
	if (stepCleaning.stepComponentNumber === 8) return nav('/')
	if (stepMaterials.stepComponentNumber === 7) return nav('/')
	if (stepWorkers.stepComponentNumber === 8) return nav('/')


}
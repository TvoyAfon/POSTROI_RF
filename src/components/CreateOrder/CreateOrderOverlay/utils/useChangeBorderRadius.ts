
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../../../store/store'

export const useChangeBorderRadius = () => {
	const location = useLocation()
	const step = useSelector((state: RootState) => state.createOrder)
	const stepTrucking = useSelector((state: RootState) => state.createOrderTrucking)
	const stepServices = useSelector((state: RootState) => state.createOrderServices)
	const stepCleaning = useSelector((state: RootState) => state.createOrderCleaning)
	const stepMaterials = useSelector((state: RootState) => state.createOrderMaterials)
	const stepWorkers = useSelector((state: RootState) => state.createOrderWorkers)
	const stepUniversal = useSelector((state: RootState) => state.createOrderUniversal)
	const stepSigns = useSelector((state: RootState) => state.signsReducer)

	if (location.pathname === '/createorder') {
		if (step.stepComponentNumber === 6) return '0px 32px 0px 0px'
		if (stepTrucking.stepComponentNumber === 7) return '0px 32px 0px 0px'
		if (stepServices.stepComponentNumber === 7) return '0px 32px 0px 0px'
		if (stepCleaning.stepComponentNumber === 7) return '0px 32px 0px 0px'
		if (stepWorkers.stepComponentNumber === 7) return '0px 32px 0px 0px'
		if (stepMaterials.stepComponentNumber === 6) return '0px 32px 0px 0px'
		if(stepUniversal.stepComponentNumber === 6 ) return '0px 32px 0px 0px'
	}
	if (location.pathname === '/create-signs') {
		if (stepSigns.stepComponentNumber === 5) return '0px 32px 32px 32px'
	}
	return '32px'
}


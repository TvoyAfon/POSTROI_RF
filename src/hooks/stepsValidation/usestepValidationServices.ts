import { useDispatch, useSelector } from 'react-redux'
import { changeServiceStep } from '../../store/slices/categories/CreateOrderServices'
import { openModal } from '../../store/slices/FormSlice/FormSlice'
import { RootState } from '../../store/store'

export const useStepValidationServices = () => {
	const stepServices = useSelector((state: RootState) => state.createOrderServices)
	const dispatch = useDispatch()
	const { dataServices } = useSelector((state: RootState) => state.createOrderServicesData)
	const { user } = useSelector((state: RootState) => state.auth)
	const { globalOrderData } = useSelector((state: RootState) => state.globalOrderDatataskname)


	return () => {
		if (stepServices.stepComponentNumber === 7 && user) {
			return true
		}

		if (globalOrderData.length !== 0 && stepServices.stepComponentNumber === 1) {
			dispatch(changeServiceStep(stepServices.stepComponentNumber + 1))
			return false
		}
		if (dataServices.description.length !== 0 && stepServices.stepComponentNumber === 2) {
			dispatch(changeServiceStep(stepServices.stepComponentNumber + 1))
			return false
		}
		if (dataServices.address.length !== 0 && dataServices.telephone.length > 2 && dataServices.telephone.length > 11 && stepServices.stepComponentNumber === 3) {
			dispatch(changeServiceStep(stepServices.stepComponentNumber + 1))
			return false
		}
		if ((dataServices.workTime.length !== 0 || dataServices.descretion) && dataServices.date.length !== 0 && stepServices.stepComponentNumber === 4) {

			dispatch(changeServiceStep(stepServices.stepComponentNumber + 1))
			return false
		}

		if (dataServices.payMethod !== null && stepServices.stepComponentNumber === 5) {
			dispatch(changeServiceStep(stepServices.stepComponentNumber + 1))
			return false
		}
		if (stepServices.stepComponentNumber === 6 || stepServices.stepComponentNumber === 7 && user !== null) {
			dispatch(changeServiceStep(stepServices.stepComponentNumber + 1))
			return false
		}
		else if (stepServices.stepComponentNumber === 6 || stepServices.stepComponentNumber === 7 && user === null) {
			dispatch(openModal('authModal'))
			return false
		}


		if (stepServices.stepComponentNumber === 7 && user !== null) {
			/*const photo = filesServices.find(el => el.type.startsWith('image/'))
			dispatch(createServicesCard({
				...dataServices,
				prewievPhoto: photo ? photo : null,
				files: filesServices,
				where: dataServices.address
			}))*/
			return true
		}

		return false
	}
}
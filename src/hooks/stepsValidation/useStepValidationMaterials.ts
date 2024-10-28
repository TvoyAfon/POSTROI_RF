
import { useDispatch, useSelector } from 'react-redux'
import { changeMaterialsStep } from '../../store/slices/categories/CreateOrderMaterials'
import { openModal } from '../../store/slices/FormSlice/FormSlice'
import { RootState } from '../../store/store'

export const useStepValidationMaterials = () => {
	const { dataMaterials } = useSelector((state: RootState) => state.createOrderMaterialsData)
	const dispatch = useDispatch()
	const stepMaterials = useSelector((state: RootState) => state.createOrderMaterials)
	const { user } = useSelector((state: RootState) => state.auth)
	const { globalOrderData } = useSelector((state: RootState) => state.globalOrderDatataskname)

	return () => {
		if (stepMaterials.stepComponentNumber === 6 && user) {
			return true
		}

		if (globalOrderData.length !== 0 && stepMaterials.stepComponentNumber === 1) {
			dispatch(changeMaterialsStep(stepMaterials.stepComponentNumber + 1))
			return false
		}
		if (dataMaterials.address.length !== 0 && stepMaterials.stepComponentNumber === 2) {
			dispatch(changeMaterialsStep(stepMaterials.stepComponentNumber + 1))
			return false
		}
		if (dataMaterials.description.length !== 0 && dataMaterials.delivery !== null && (dataMaterials.date.length !== 0 || dataMaterials.personally === true) && stepMaterials.stepComponentNumber === 3) {
			dispatch(changeMaterialsStep(stepMaterials.stepComponentNumber + 1))
			return false
		}
		if (dataMaterials.payMethod.length !== 0 && stepMaterials.stepComponentNumber === 4) {
			dispatch(changeMaterialsStep(stepMaterials.stepComponentNumber + 1))
			return false
		}
		if (stepMaterials.stepComponentNumber === 5 || stepMaterials.stepComponentNumber === 6 && user !== null) {
			dispatch(changeMaterialsStep(stepMaterials.stepComponentNumber + 1))
			return false
		} else if (stepMaterials.stepComponentNumber === 5 || stepMaterials.stepComponentNumber === 6 && user === null) {
			dispatch(openModal('authModal'))
			return false
		}

		if (stepMaterials.stepComponentNumber === 6 && user !== null) {
			/*const photo = filesMaterials.find(el => el.type.startsWith('image/'))
			dispatch(createMaterialsCard({
				...dataMaterials,
				prewievPhoto: photo ? photo : null,
				files: filesMaterials,
				where: dataMaterials.address
			}))*/
			return true
		}

		return false
	}
}
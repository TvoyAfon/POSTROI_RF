import { useDispatch, useSelector } from 'react-redux'
import { changeWorkersStep } from '../../store/slices/categories/CreateOrderWorkers'
import { openModal } from '../../store/slices/FormSlice/FormSlice'
import { RootState } from '../../store/store'

export const useStepValidationWorkers = () => {
	const dispatch = useDispatch()
	const stepWorkers = useSelector((state: RootState) => state.createOrderWorkers)
	const { user } = useSelector((state: RootState) => state.auth)

	const { dataWorkers } = useSelector((state: RootState) => state.createOrderWorkersData)


	return () => {
		if (stepWorkers.stepComponentNumber === 7 && user) {
			return true
		}

		if (dataWorkers.taskName.length !== 0 && stepWorkers.stepComponentNumber === 1) {
			dispatch(changeWorkersStep(stepWorkers.stepComponentNumber + 1))
			return false
		}

		if ((dataWorkers.workersType.loader || dataWorkers.workersType.worker) && stepWorkers.stepComponentNumber === 2) {
			dispatch(changeWorkersStep(stepWorkers.stepComponentNumber + 1))
			return false
		}

		if (dataWorkers.description.length !== 0 && stepWorkers.stepComponentNumber === 3) {
			dispatch(changeWorkersStep(stepWorkers.stepComponentNumber + 1))
			return false
		}

		if (dataWorkers.where.length !== 0 && dataWorkers.when.length !== 0 && stepWorkers.stepComponentNumber === 4) {
			dispatch(changeWorkersStep(stepWorkers.stepComponentNumber + 1))
			return false
		}

		if (stepWorkers.stepComponentNumber === 5 && dataWorkers.payMethod !== null) {
			dispatch(changeWorkersStep(stepWorkers.stepComponentNumber + 1))
			return false
		}
		if (stepWorkers.stepComponentNumber === 6) {
			dispatch(changeWorkersStep(stepWorkers.stepComponentNumber + 1))
			return false
		}
		if (stepWorkers.stepComponentNumber === 6 || stepWorkers.stepComponentNumber === 7 && user !== null) {
			dispatch(changeWorkersStep(stepWorkers.stepComponentNumber + 1))
			return false
		}
		else if (stepWorkers.stepComponentNumber === 6 || stepWorkers.stepComponentNumber === 7 && user === null) {
			dispatch(openModal('authModal'))
			return false
		}

		if (stepWorkers.stepComponentNumber === 7 && user !== null) {
			/*const photo = filesWorkers.find(el => el.type.startsWith('image/'))
			dispatch(createWorkersCard({
				...dataWorkers,
				prewievPhoto: photo ? photo : null,
				files: filesWorkers,
				where: dataWorkers.where
			}))*/
			return true
		}

		return false
	}
}



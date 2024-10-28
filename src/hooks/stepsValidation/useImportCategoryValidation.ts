import { useStepValidationTrucking } from '../../hooks/stepsValidation/useStepValditationTrucking'
import { useStepValidationBuilding } from '../../hooks/stepsValidation/useStepValidationBuilding'
import { useStepValidationCleaning } from '../../hooks/stepsValidation/useStepValidationCleaning'
import { useStepValidationMaterials } from '../../hooks/stepsValidation/useStepValidationMaterials'
import { useStepValidationWorkers } from '../../hooks/stepsValidation/useStepValidationWorkers'
import { useStepValidationServices } from '../../hooks/stepsValidation/usestepValidationServices'

export const useImportCategoryValidation = () => {

	return {
		useStepValidationTrucking,
		useStepValidationBuilding,
		useStepValidationCleaning,
		useStepValidationMaterials,
		useStepValidationWorkers,
		useStepValidationServices
	}
}
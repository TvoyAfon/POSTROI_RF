
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../../../store/store'

export const useChangeBorderRadius = () => {
	const location = useLocation()

	const stepSigns = useSelector((state: RootState) => state.signsReducer)

	if (location.pathname === '/create-signs') {
		if (stepSigns.stepComponentNumber === 5) return '0px 32px 32px 32px'
	}
	return '32px'
}


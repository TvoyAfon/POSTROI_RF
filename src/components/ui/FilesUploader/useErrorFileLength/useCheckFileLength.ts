import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'


export const useCheckFileLength = () => {
	const { files } = useSelector((state: RootState) => state.createOrderData)
	const { filesTrucking } = useSelector((state: RootState) => state.createOrderTruckingData)
	const { filesServices } = useSelector((state: RootState) => state.createOrderServicesData)
	const { filesCleaning } = useSelector((state: RootState) => state.createOrderCleaningData)
	const { filesWorkers } = useSelector((state: RootState) => state.createOrderWorkersData)
	const { filesMaterials } = useSelector((state: RootState) => state.createOrderMaterialsData)
	const { dataSigns } = useSelector((state: RootState) => state.signsData)

	const [isShowText, setIsShowText] = useState(false)

	if (files.length === 0) setIsShowText(false)
	if (filesTrucking.length === 0) setIsShowText(false)
	if (filesCleaning.length === 0) setIsShowText(false)
	if (filesWorkers.length === 0) setIsShowText(false)
	if (filesServices.length === 0) setIsShowText(false)
	if (filesMaterials.length === 0) setIsShowText(false)
	if (dataSigns.filesSigns.length === 0) setIsShowText(false)
	else setIsShowText(true)

	return isShowText
}
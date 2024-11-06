import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'


export const useCheckFileLength = () => {
	const { files } = useSelector((state: RootState) => state.createOrderData)

	const { dataSigns } = useSelector((state: RootState) => state.signsData)

	const [isShowText, setIsShowText] = useState(false)

	if (files.length === 0) setIsShowText(false)

	if (dataSigns.filesSigns.length === 0) setIsShowText(false)
	else setIsShowText(true)

	return isShowText
}
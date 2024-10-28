import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addOrderData } from '../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { addClickFlag } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CheckBoxContract from './ui/CheckBoxContract'
import CheckBoxNotice from './ui/CheckBoxNotice'
import CheckBoxOffers from './ui/CheckBoxOffers'

const CreateOrderSettings: React.FC = () => {

	const dispatch = useDispatch()
	const { data } = useSelector((state: RootState) => state.createOrderData)

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	const handleClickNotice = () => {
		dispatch(addOrderData({
			...data, settings: {
				...data.settings,
				push: !data.settings?.push
			}
		}))
	}
	const handleClickOffers = () => {
		dispatch(addOrderData({
			...data, settings: {
				...data.settings,
				rating: !data.settings?.rating
			}
		}))
	}
	const handleClickContract = () => {
		dispatch(addOrderData({
			...data, settings: {
				...data.settings,
				contract: !data.settings?.contract
			}
		}))
	}
	const handleClickDocument = () => {
		dispatch(addOrderData({
			...data, settings: {
				...data.settings,
				document: !data.settings?.document
			}
		}))
	}
	const handleCurrentSocials = (socials: string[]) => {
		dispatch(addOrderData(({
			...data, currentSocials: socials
		})))
	}

	const handleClickSend = (value: boolean) => {
		dispatch(addOrderData(({
			...data, is_send: value
		})))
	}


	return (
		<div className='flex-column'>
			<span className='textSizeM'>Уведомления</span>
			<CheckBoxNotice
				handleClickSend={handleClickSend}
				socialsValue={data.currentSocials}
				handleCurrentSocials={handleCurrentSocials}
				value={data.is_send}
				onClick={handleClickNotice} />
			<CheckBoxOffers value={data.settings.rating}
				onClick={handleClickOffers} />
			<CheckBoxContract
				onClickDoc={handleClickDocument}
				valueDocument={data.settings.document}
				valueContract={data.settings.contract}
				onClick={handleClickContract} />
		</div>
	)
}
export default CreateOrderSettings

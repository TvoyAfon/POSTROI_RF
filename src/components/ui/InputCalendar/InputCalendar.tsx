import moment from 'moment'
import 'moment/locale/ru'
import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import calendar_svg from '../../../assets/images/createOrder_img/Group 55.svg'
import { IInputCalendar } from '../../../interface/inputCalendar.props'
import { addDateFlag, addDateRange } from '../../../store/slices/CalendarSlice/CalendarSlice'
import { RootState } from '../../../store/store'
import styles from './InputCalendar.module.scss'
import { translateDate } from './utils'

const InputCalendar: React.FC<IInputCalendar> = ({ onChange, dataValue, style }) => {
	const minDate = new Date()
	const dispatch = useDispatch()
	const { dateRange } = useSelector((state: RootState) => state.calendarReducer)
	const [showCalendar, setShowCalendar] = useState(false)
	const calendarRef = useRef<HTMLDivElement>(null)
	const startDate = moment(dateRange[0]).format('LL')
	const endDate = moment(dateRange[1]).format('LL')
	const val = `${translateDate(startDate)} - ${translateDate(endDate)}`
	const [isFirstRender, setIsFirstRender] = useState(true)

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false)
			return
		}
		onChange && onChange(val, dateRange[0], dateRange[1])
	}, [dateRange])


	const handleClose = () => {
		setShowCalendar(!showCalendar)
	}

	const handleDateChange = (newDate: any) => {
		setShowCalendar(false)
		dispatch(addDateRange(newDate))
		dispatch(addDateFlag(true))
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
				setShowCalendar(false)
			}
		}

		if (showCalendar) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [showCalendar])

	return (
		<div ref={calendarRef} className={styles.inputCalendar} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
			<input
				style={{ width: '75%', backgroundColor: '#F4F3F1', ...style }}
				value={dataValue}
				name='date'
				type='text'
				placeholder='Дата'
				disabled
			/>
			<button style={{ backgroundColor: '#7099ED', display: 'flex', alignItems: 'center', padding: 10 }} onClick={handleClose}>
				<img src={calendar_svg} alt="Calendar icon" />
			</button>
			<div>
				{showCalendar && (
					<Calendar
						minDate={minDate}
						minDetail='month'
						selectRange={true}
						onChange={handleDateChange}
						value={dateRange as any}
						className={styles.react_calendar}
					/>
				)}

			</div>
		</div>
	)
}

export default InputCalendar
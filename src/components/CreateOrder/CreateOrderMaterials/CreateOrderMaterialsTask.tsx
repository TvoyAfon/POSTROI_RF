import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderMaterialsData } from '../../../store/slices/data/OrderDataMaterials'
import { addClickFlag, addInputDescriptionError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import { RootState } from '../../../store/store'
import CheckboxButton from '../../ui/CheckboxButton/CheckboxButton'
import CreateOrderTextArea from '../../ui/CreateOrderTextArea/CreateOrderTextArea'
import FilesUploader from '../../ui/FilesUploader/FilesUploader'
import InputCalendar from '../../ui/InputCalendar/InputCalendar'
import RadioButton from '../../ui/RadioButton/RadioButton'
import ToggleButton from '../../ui/ToggleButton/ToggleButton'
import Tooltip from '../../ui/Tooltip/Tooltip'

const CreateOrderMaterialsTask: React.FC = () => {
	const { dateFlag } = useSelector((state: RootState) => state.calendarReducer)
	const [check, setCheck] = useState(false)

	useEffect(() => {
		dispatch(addClickFlag(false))
	}, [])

	useEffect(() => {
		dispatch(addOrderMaterialsData({ ...dataMaterials, personally: check }))
	}, [check])

	const { dataMaterials } = useSelector((state: RootState) => state.createOrderMaterialsData)
	const { error } = useSelector((state: RootState) => state.createOrderValidation)
	const dispatch = useDispatch()

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(addOrderMaterialsData({ ...dataMaterials, description: e.target.value }))
		dispatch(addInputDescriptionError(e.target.value))
	}

	const onChangeDate = (date: string, dateObjStart: Date, dateObjEnd: Date) => {
		dispatch(addOrderMaterialsData({ ...dataMaterials, date: date, dateObjEnd, dateObjStart }))
	}

	return (
		<div className='flex-column '>
			<section className='flex-column gap-medium'>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Напишите какой товар вам необходим, либо прикрепите файл со списком товаров
				</span>
				<span>Укажите название товара и количество. (напишите максимально правильно название товара, так поставщики смогут  быстрее понять, что вам нужно и ответить)
				</span>
				<div>	<CreateOrderTextArea value={dataMaterials.description} onChange={handleChange} placeholder='Текст' />
					{error.inputDescriptionError && dataMaterials.description.length === 0 && <error.inputDescriptionError />}</div>
				<FilesUploader />
				<div style={{ display: 'flex', gap: 16 }}>
					<CheckboxButton checked={dataMaterials.similarItem} onClick={() => dispatch(addOrderMaterialsData({ ...dataMaterials, similarItem: !dataMaterials.similarItem }))} label='Возможно заменить товар на аналогичный?' />
					<Tooltip>Всплывающая подсказка</Tooltip>
				</div>
			</section>
			<section className='flex-column gap-medium'>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Нужна доставка?</span>
				<RadioButton checked={dataMaterials.delivery === 'no'} onClick={() => dispatch(addOrderMaterialsData({ ...dataMaterials, delivery: 'no' }))} label='Нет' />
				<RadioButton checked={dataMaterials.delivery === 'yes'} onClick={() => dispatch(addOrderMaterialsData({ ...dataMaterials, delivery: 'yes' }))} label='Да' />
				{error.radioButtonError && dataMaterials.delivery === null && <error.radioButtonError />}
			</section>
			<section className='flex-column gap-medium'>
				<span style={{ fontWeight: 700, fontSize: 16 }}>Когда нужны строительные материалы</span>
				<div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'start' }}>
					<ToggleButton onChange={() => setCheck(!check)} label='Обсудим с поставщиком лично' />
				</div>
				<InputCalendar
					dataValue={dataMaterials.date}
					onChange={onChangeDate} />
				{error.inputDateError && !dateFlag && <error.inputDateError />}
			</section>
		</div>
	)
}

export default CreateOrderMaterialsTask

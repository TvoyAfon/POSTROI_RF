import React from 'react'
import { useSelector } from 'react-redux'
import loc_svg from '../../../assets/images/createOrder_img/location.svg'
import { formatDateForOrder } from '../../../common/commonTime'
import { RootState } from '../../../store/store'
import FileFormat from '../../ui/FileFormat/FileFormat'
import Line from '../../ui/Line/Line'
import { flexRow } from './styles/stylesCreateOrder'


const CreateOrderDemo: React.FC = () => {
	const { data, files } = useSelector((state: RootState) => state.createOrderData)

	console.log(data)

	// Функция для проверки, является ли файл изображением
	const isImageFile = (fileName: string) => {
		const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg']
		const extension = fileName.split('.').pop()?.toLowerCase()
		if (extension)
			return imageExtensions.includes(extension)
	}

	const imageFiles = files.filter(file => isImageFile(file.name))
	const otherFiles = files.filter(file => !isImageFile(file.name))

	return (
		<div style={{ overflowY: 'auto', maxHeight: 580 }} className='flex-column'>
			<span className='textSizeL'>{data.taskName.toUpperCase()}</span>
			<span>{data.description}</span>
			{imageFiles.length > 0 && (
				<div>
					<h4 style={{ color: 'gray' }}>Фото</h4>
					<div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
						{imageFiles.map(file => (
							<div
								key={file.name}>
								<img
									src={URL.createObjectURL(file)}
									alt={file.name}
									style={{ width: '160px', height: '112px', objectFit: 'cover', borderRadius: 16 }} />
							</div>
						))}</div>
				</div>
			)}

			{otherFiles.length > 0 && (
				<div >
					<h4 style={{ color: 'gray' }}>Файлы</h4>
					<div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
						{otherFiles.map(file => (
							<div key={file.name}>
								<FileFormat fileName={file.name} />
							</div>
						))}
					</div>
				</div>
			)}

			<Line lineWidth='100%' />
			<div style={flexRow}>
				<span>Когда:</span>
				<span className='textSizeM'> начать : {formatDateForOrder(String(data.dateObjStart))}</span>
				,
				<span className='textSizeM'>закончить : {formatDateForOrder(String(data.dateObjEnd))}</span>
			</div>
			<div style={flexRow} >
				<span>Адрес:</span>
				<div style={flexRow}>
					<span className='textSizeM'>{data.address}</span>
					<img src={loc_svg} alt="location" />
				</div>
			</div>
		</div>
	)
}

export default CreateOrderDemo
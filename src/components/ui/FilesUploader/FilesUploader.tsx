import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { addOrderFiles } from '../../../store/slices/CreateOrder/data/CreateOrderDataSlice'
import { addSignsData } from '../../../store/slices/Signs/dataSigns/DataSignsSlice'
import { RootState } from '../../../store/store'
import FileCard from './FileCard'
import styles from './FilesUploader.module.scss'

const FilesUploader: React.FC = () => {

	const location = useLocation()
	const dispatch = useDispatch()
	const { files } = useSelector((state: RootState) => state.createOrderData)
	const { dataSigns } = useSelector((state: RootState) => state.signsData)


	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filesInput = e.target.files

		if (!filesInput) return
		const newFiles = Array.from(filesInput)

		const uniqueNewFiles = newFiles.filter(newFile =>
			!dataSigns.filesSigns.some(f => f.name === newFile.name) &&
			!files.some(f => f.name === newFile.name)
		)

		if (location.pathname === '/create-signs') {
			if (dataSigns.filesSigns.length < 10) dispatch(addSignsData({
				...dataSigns,
				filesSigns: [...dataSigns.filesSigns, ...uniqueNewFiles]
			}))
		}

		if (files.length < 10) dispatch(addOrderFiles([...files, ...uniqueNewFiles]))
	}


	const handleDeleteFile = (file: File) => {
		// Проверяем, находится ли текущий путь на странице '/create-signs'
		if (location.pathname === '/create-signs') {
			// Фильтруем список файлов, исключая тот, который нужно удалить
			const updatedFiles = dataSigns.filesSigns.filter(f => f.name !== file.name)

			dispatch(addSignsData({
				...dataSigns,
				filesSigns: updatedFiles
			}))
		} else {

			dispatch(addOrderFiles(files.filter(f => f.name !== file.name)))
		}
	}
	return (
		<div className={styles.filesUploader}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
				{<span style={{ fontSize: 14, fontWeight: 600, color: '#8E8E93' }}>Фото</span>}
				<div
					style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
					{location.pathname === '/createorder' && files.map((file, index) => (
						<FileCard isOnlyFiles={false} onDelete={() => handleDeleteFile(file)} key={index} file={file} />
					))}
					{location.pathname === '/create-signs' && dataSigns.filesSigns.map((file, index) => (
						<FileCard isOnlyFiles={false} onDelete={() => handleDeleteFile(file)} key={index} file={file} />
					))}
				</div>

			</div>
			<div
				style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
				<span style={{ fontSize: 14, fontWeight: 600, color: '#8E8E93' }}>Файлы</span>
				<div style={{ display: 'flex', flexDirection: 'row', gap: 24, paddingLeft: 20 }}>{location.pathname === '/createorder' && files.map((file, index) => (
					<FileCard isOnlyFiles onDelete={() => handleDeleteFile(file)} key={index} file={file} />
				))}

					{location.pathname === '/create-signs' && dataSigns.filesSigns.map((file, index) => (
						<FileCard isOnlyFiles onDelete={() => handleDeleteFile(file)} key={index} file={file} />
					))}
				</div>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '24px', alignItems: 'center', marginTop: 40 }}>
				<label className={styles.filesUploader_input} htmlFor='fileupload'>
					<input id='fileupload' onChange={handleFileUpload} type='file' /></label>
				<span style={{ fontSize: 16, fontWeight: 300 }} >Прикрепите фото до 5 шт или файл с инструкцией, проектом и т.п.</span>
			</div>
		</div>
	)
}

export default FilesUploader

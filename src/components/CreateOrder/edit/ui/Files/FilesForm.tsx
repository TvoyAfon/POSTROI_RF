import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react'
import attachFile from '../../../../../assets/images/chat_images/attach.svg'
import { FILES_FORMATS_ACCEPT } from '../../../../../config/config'
import { getDocumentType } from '../../../../Chat/utils/utils'
import Button from '../../../../ui/Button/Button'
import InvalidField from '../InvalidField'
import DocumentCard from './DocumentCard'
import PhotoCard from './PhotoCard'
import { IFile } from './types'

export interface IFilesFormProps {
	onAddFiles?: (files: IFile[]) => void
	onDeleteFile?: (file: IFile) => void
	files: IFile[]
}

const FilesForm: FC<IFilesFormProps> = ({ files, onAddFiles, onDeleteFile }) => {
	const fileRef = useRef<HTMLInputElement>(null)
	const [userFiles, setUserFiles] = useState<IFile[]>(files)
	const [isFilesLengthError, setIsFilesLengthError] = useState<boolean>(false)

	useEffect(() => {
		setUserFiles(files)
	}, [files])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(e.target.files || [])
		const totalFiles = selectedFiles.length + userFiles.length

		if (totalFiles > 10) {
			setIsFilesLengthError(true)
			return
		}

		const newFiles = selectedFiles.map<IFile>(file => ({
			blob: file,
			url: null,
		}))

		setUserFiles(prev => [...prev, ...newFiles])
		onAddFiles?.(newFiles)
		setIsFilesLengthError(false)
	}

	const filesCategories = useMemo(() => {
		const photos = userFiles.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file.blob.name))
		const documents = userFiles.filter(file => {
			const extension = file.blob.name.split('.').pop()?.toLowerCase() || ''
			return ['docx', 'doc', 'pdf', 'xls', 'txt'].includes(extension)
		})
		return { photos, documents }
	}, [userFiles])

	const handleDeleteFile = (fileToDelete: IFile) => {
		onDeleteFile?.(fileToDelete)
		setUserFiles(prev => prev.filter(file => file.blob.name !== fileToDelete.blob.name))
	}

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '16px'
		}}>
			<div style={{
				display: 'flex',
				gap: '22px'
			}}>
				<input
					ref={fileRef}
					type='file'
					multiple
					accept={FILES_FORMATS_ACCEPT}
					style={{ display: 'none' }}
					onChange={handleChange}
				/>
				<Button onClick={() => fileRef.current?.click()} variant='pale' icon={attachFile}>
					Фото и файлы
				</Button>
				<span style={{
					color: '#231F20',
					marginTop: '10px'
				}}>Прикрепите фото или файлы с интрукцией, проектом и т.п. (до 10 шт)</span>
			</div>
			{['Фото', 'Файлы'].map((category, index) => (
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '16px'
				}} key={index}>
					<span style={{
						color: '#8E8E93',
						fontWeight: '600'
					}}>{category}</span>
					<div style={{
						display: 'flex',
						gap: '8px',
						flexWrap: 'wrap',
						justifyContent: 'space-between'
					}}>
						{(category === 'Фото' ? filesCategories.photos : filesCategories.documents).map(file => (
							category === 'Фото' ? (
								<PhotoCard key={file.blob.name} src={URL.createObjectURL(file.blob)} onDelete={() => handleDeleteFile(file)} />
							) : (
								<DocumentCard
									key={file.blob.name}
									filename={file.blob.name}
									onDelete={() => handleDeleteFile(file)}
									fileType={getDocumentType(file.blob.name)}
								/>
							)
						))}
					</div>
				</div>
			))}
			{isFilesLengthError && <InvalidField>Количество фотографий и файлов не должно превышать 10-ти</InvalidField>}
		</div>
	)
}

export default FilesForm
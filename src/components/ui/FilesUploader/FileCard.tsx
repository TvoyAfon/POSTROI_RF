import React, { useEffect, useState } from 'react'
import word_svg from '../../../assets/images/createOrder_img/WORD (3).svg'
import pdf_svg from '../../../assets/images/createOrder_img/pdf.svg'
import txt_svg from '../../../assets/images/createOrder_img/txt.svg'
import excel_svg from '../../../assets/images/createOrder_img/xls.svg'
import { IOrderFile } from '../../../interface/createOrder.props'
import FileDeleteButton from '../FileDeleteButton/FileDeleteButton'
import styles from './FilesUploader.module.scss'
import { getImageSource } from './utils'

const formatIcons = {
	pdf: pdf_svg,
	word: word_svg,
	excel: excel_svg,
	txt: txt_svg
}

const FileCard: React.FC<IOrderFile> = ({ file, onDelete, isOnlyFiles }) => {
	const [imgSource, setImgSource] = useState<string>('')
	const [openImageContainer, setOpenImageContainer] = useState(false)
	const [openContainer, setOpenContainer] = useState(false)
	const [height, setHeight] = useState(false)

	const handleMove = () => {
		setTimeout(() => {
			setOpenContainer(true)
		}, 300)
	}
	const handleHoverText = () => {
		if (file.name.length > 80) setHeight(true)
	}

	const handleMouseLeave = () => {
		setOpenContainer(false)
		setHeight(false)
	}

	useEffect(() => {
		(async () => {
			if (file.type.includes('image') && !isOnlyFiles) {
				setImgSource(await getImageSource(file))
			}
		})()
	}, [file])

	const checkFileFormat = (file: File) => {

		if (file.type.includes('pdf') && isOnlyFiles) return <img src={formatIcons.pdf} alt="" />
		if (file.type.includes('word') && isOnlyFiles) return <img src={formatIcons.word} alt="" />
		if (file.type.includes('excel') && isOnlyFiles) return <img src={formatIcons.excel} alt="" />
		if (file.type.includes('txt') && isOnlyFiles) return <img src={formatIcons.excel} alt="" />

		if (!file.type.includes('pdf') && !file.type.includes('word') && !file.type.includes('excel') && !file.type.includes('txt') && !file.type.includes('image')) return


		return <div
			className={styles.filecard_image_container}
			onMouseLeave={() => setOpenImageContainer(false)}
			onMouseMove={() => setOpenImageContainer(true)}
			style={{ position: 'relative' }}>
			{!isOnlyFiles && file.type.includes('image') && <img
				className={styles.filecard_image}
				style={{ width: 160, height: 112, objectFit: 'cover', borderRadius: 16 }}
				src={imgSource}
				alt="imgSource" />}
			{openImageContainer && <FileDeleteButton style={{ position: 'absolute', bottom: -10, left: -15 }} handleDelete={() => onDelete(file)} />}
		</div>
	}

	return (<>
		{!file.type.includes('image') && isOnlyFiles ?
			<div
				onMouseEnter={handleHoverText}
				className={styles.fileCard_container}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMove}
				style={{ height: height ? 140 : '' }}>
				<div style={{ display: 'flex', gap: 8 }}>
					<div style={{ fontSize: '10px' }}> {checkFileFormat(file)}
					</div>
					<span style={{ fontSize: 10, fontWeight: 300, overflow: 'hidden' }}>
						{file.name}
					</span>
				</div>
				{openContainer && <FileDeleteButton handleDelete={() => onDelete(file)} />}
			</div> :
			<div style={{ position: 'relative' }}>
				{checkFileFormat(file)}
			</div>}
	</>
	)
}
export default FileCard

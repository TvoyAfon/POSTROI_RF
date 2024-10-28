
import React from 'react'
import word_svg from '../../../assets/images/createOrder_img/WORD (3).svg'
import pdf_svg from '../../../assets/images/createOrder_img/pdf.svg'
import txt_svg from '../../../assets/images/createOrder_img/txt.svg'
import excel_svg from '../../../assets/images/createOrder_img/xls.svg'
import styles from './FileFormat.module.scss'

// Create a mapping of file extensions to their corresponding SVG images
const fileTypeIcons: { [key: string]: string } = {
	doc: word_svg,
	docx: word_svg,
	pdf: pdf_svg,
	txt: txt_svg,
	xls: excel_svg,
	xlsx: excel_svg,
}

interface IFileFormat {
	fileName: string
}

const FileFormat: React.FC<IFileFormat> = ({ fileName }) => {

	const extension = fileName.split('.').pop()?.toLowerCase()
	const icon = extension ? fileTypeIcons[extension] : null

	return (
		<div
			className={styles['fileFormat']}>
			{icon && <img
				style={{ width: 40, height: 40 }}
				src={icon}
				alt={fileName} />}
			<span>{fileName}</span>
		</div>
	)
}

export default FileFormat
import { FC } from 'react'
import { IMAGE_REG_EXP } from '../../../../../../config/config'
import { downloadFile } from '../../../../../../utils/utils'
import { getFileMeta } from '../../../../utils/utils'
import File from './File'
import styles from './Files.module.scss'

const Files: FC<{ filesLinks: string[] }> = ({ filesLinks }) => {
	const handleDownload = (fileLink: string) => {
		downloadFile(fileLink, getFileMeta(fileLink).filename)
	}

	return (
		<div className={styles.files}>
			{
				filesLinks.map(link => (
					<File
						imgStyle={
							IMAGE_REG_EXP.test(link) ?
								{ borderRadius: '8px', marginTop: '-2px' }
								:
								{ marginTop: '-4px' }
						}
						key={link}
						link={getFileMeta(link).url}
						filename={getFileMeta(link).filename}
						onClick={() => handleDownload(link)}
					/>
				))
			}
		</div>
	)
}

export default Files
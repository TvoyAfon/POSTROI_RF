import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { FILES_REG_EXP } from '../../../../../../../config/config'
import { RootState } from '../../../../../../../store/store'
import { downloadFile } from '../../../../../../../utils/utils'
import { getFilename, getFilesFromMessgaes } from '../../../../../utils/utils'
import NoContacts from '../../../../ChatList/ui/NoContacts'
import File from '../../../Messages/Files/File'

const Files = () => {
	const { messages } = useSelector((state: RootState) => state.chat)

	const files = useMemo(() => getFilesFromMessgaes(messages, FILES_REG_EXP), [])

	const handleDownload = (url: string) => {
		downloadFile(url, getFilename(url))
	}

	return (
		<div>
			{
				!files.length
					?
					<NoContacts
						defaultText='Ещё никто не отправлял файлы в эту группу.'
						spanStyle={{
							whiteSpace: 'nowrap',
							marginRight: 'auto'
						}}
					/>
					:
					files.map(url => (
						<File
							style={{
								background: '#F4F3F1',
								width: '160px',
							}}
							imgStyle={{
								marginTop: '-4px'
							}}
							key={url}
							filename={getFilename(url)}
							onClick={() => handleDownload(url)}
							link={url}
						/>
					))
			}
		</div>
	)
}

export default Files
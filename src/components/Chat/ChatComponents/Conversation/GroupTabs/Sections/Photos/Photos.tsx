import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { IMAGE_REG_EXP } from '../../../../../../../config/config'
import { RootState } from '../../../../../../../store/store'
import { downloadFile } from '../../../../../../../utils/utils'
import { getFilename, getFilesFromMessgaes } from '../../../../../utils/utils'
import NoContacts from '../../../../ChatList/ui/NoContacts'
import Photo from './Photo'

const Photos = () => {
	const { isFullScreen, messages } = useSelector((state: RootState) => state.chat)
	const photos = useMemo(() => getFilesFromMessgaes(messages, IMAGE_REG_EXP), [])

	const handleDownload = (url: string) => {
		downloadFile(url, getFilename(url))
	}

	return (
		<div style={{
			display: 'flex',
			flexWrap: 'wrap',
			gap: '8px',
			marginTop: !isFullScreen ? '16px' : '0'
		}}>
			{
				!photos.length
					?
					<NoContacts
						mainStyle={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
						spanStyle={{
							textAlign: 'center',
							whiteSpace: 'nowrap'
						}}
						defaultText='Ещё никто не отправлял фотографии в эту группу.'
					/>
					:
					photos.map(url => (
						<Photo
							onClick={() => handleDownload(url)}
							key={url}
							src={url}
						/>
					))
			}
		</div>
	)
}

export default Photos
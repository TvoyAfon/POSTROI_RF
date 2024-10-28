import React, { SetStateAction, useState } from 'react'
import attachmentIcon from '../../../../../assets/images/profile/attachment.svg'
import Button from '../../../../ui/Button/Button'
import UncorrectFormat from '../../../../ui/Modal/UncorrectFormat'

const PassportPhoto: React.FC<{ setPhoto: React.Dispatch<SetStateAction<File | undefined>> }> = ({ setPhoto }) => {

	const [error, setError] = useState(false)

	const handleClick = () => {
		document.getElementById('load_photo')?.click()
	}
	const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file?.type.startsWith('image/')) {
			setPhoto(file)
		}
		else return setError(true)
	}
	return (
		<>
			{error && <UncorrectFormat onClose={() => setError(false)} text='Неверный формат фото' />}
			<div style={{
				display: 'flex',
				gap: '22px'
			}}>
				<input
					id='load_photo'
					onChange={handleUploadPhoto}
					type="file"
					style={{ display: 'none' }} />
				<Button
					onClick={handleClick}
					variant='pale'
					icon={attachmentIcon}
					style={{
						fontSize: '14px'
					}}>Фото паспорта</Button>
				<span style={{
					fontWeight: 300,
					color: '#262626',
					fontSize: '16px',
					width: '281px'
				}}>Прикрепите фото главной страницы паспорта</span>
			</div>
		</>
	)
}

export default PassportPhoto
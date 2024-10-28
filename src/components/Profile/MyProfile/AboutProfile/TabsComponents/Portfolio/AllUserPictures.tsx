import React from 'react'
import Loader from '../../../../../ui/Loader/Loader'
import { IFiles } from './hooks/useFetchPhotos'


const AllUserPictures: React.FC<{ files: IFiles, loadingPh: boolean }> = ({ files, loadingPh }) => {

	return (
		<div className='flex-column gap-small'>
			<div className='textSizeL'>Все фотографии
				<span className='textSizeL' style={{ color: 'gray' }}> {files ? files.count_files : 0}
				</span>
			</div>
			<div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', height: 200, overflowY: 'scroll' }}>
				{!loadingPh ? files.files.map(el => (
					<img style={{ width: 182, height: 182, borderRadius: 8 }} src={el} />
				)) :
					<Loader text='Загрузка фото...' style={{ fontSize: 16, margin: 20 }} />
				}
			</div>
		</div>
	)
}

export default AllUserPictures

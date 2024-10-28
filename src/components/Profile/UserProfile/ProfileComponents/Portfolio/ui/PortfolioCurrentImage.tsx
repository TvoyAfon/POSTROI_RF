import React, { useState } from 'react'
import AlbumImagePopUp from '../../../../MyProfile/AboutProfile/TabsComponents/Portfolio/modal/AlbumImagePopUp'

interface IPortfolioCurrentImage {
	photoLink: string,
	albumId: number,
	photoName: string,
	checkMyAlbum?: boolean
}

const PortfolioCurrentImage: React.FC<IPortfolioCurrentImage> = ({ photoLink, albumId, photoName, checkMyAlbum }) => {
	const [focus, setFocus] = useState(false)
	return (
		<>
			<div onMouseEnter={() => setFocus(true)} style={{ position: 'relative', width: 182, height: 182 }}>
				<img style={{ width: 182, height: 182 }} src={photoLink} alt={String(albumId)} />
				{checkMyAlbum && <>
					{focus && <AlbumImagePopUp
						photoName={photoName}
						photoLink={photoLink}
						albumId={albumId} />}
				</>}
			</div>
		</>
	)
}

export default PortfolioCurrentImage

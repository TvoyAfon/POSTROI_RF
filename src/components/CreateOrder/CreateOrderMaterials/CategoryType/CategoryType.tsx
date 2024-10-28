import React, { useState } from 'react'
import CategoryTypeMaterials from './CategoryTypeMaterials'
import CategoryTypeVendor from './CategoryTypeVendor'
import CategoryVendorInfo from './CategoryVendorPage/CategoryVendorInfo'
import { useNavigate } from 'react-router-dom'
import { ROUTES_CATEGORY } from '../../../../routes/routes'
import styles from './CategoryType.module.scss'

const CategoryType: React.FC = () => {
	const [openVendorInfo, setOpenVendorInfo] = useState(false)
	const navigate = useNavigate()
	const handleRegisterVendor = () => {
		navigate(ROUTES_CATEGORY.registerVendors)
	}
	const handleCloseRegister = () => {
		navigate(ROUTES_CATEGORY.vendorsandmaterials)
	}

	const handleOpenVendorInfo = () => {
		setOpenVendorInfo(true)
	}
	const handleCloseVendorInfo = () => {
		setOpenVendorInfo(false)
	}

	return (
		<div style={{ position: 'relative' }}>
			<div className={styles['categoryType_overlay']} style={{ paddingTop: 145,display:'flex',justifyContent:'center' }}>
				{!openVendorInfo ? <div 
				className={styles['categoryType']} 
				style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
					<CategoryTypeVendor
						handleRegisterVendor={handleRegisterVendor}
						handleCloseRegister={handleCloseRegister}
						handleOpenVendorInfo={handleOpenVendorInfo}
					/>
					<CategoryTypeMaterials />
				</div> :
					<div style={{display:'flex',justifyContent:'center'}}>
						<CategoryVendorInfo onClose={handleCloseVendorInfo}/>
					</div>}
			</div>
		</div>
	)
}
export default CategoryType

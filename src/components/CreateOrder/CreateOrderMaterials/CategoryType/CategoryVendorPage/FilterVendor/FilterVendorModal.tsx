import React from 'react'
import { IDefaultModal } from '../../../../../../interface/modal.props'
import Button from '../../../../../ui/Button/Button'
import CloseButton from '../../../../../ui/CloseButton/CloseButton'
import Line from '../../../../../ui/Line/Line'
import OverLay from '../../../../../ui/OverLay'
import styles from './FilterVendor.module.scss'
import FilterVendorMaterials from './FilterVendorField/FilterVendorMaterials'
import FilterVendorOnMarket from './FilterVendorField/FilterVendorOnMarket'
import FilterVendorPlace from './FilterVendorField/FilterVendorPlace'
import FilterVendorRegion from './FilterVendorField/FilterVendorRegion'


const FilterVendorModal: React.FC<IDefaultModal> = ({ onClose }) => {

	return (
		<>
			<OverLay />
			<div
				className={styles['filtervendorModal']}
			>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span className='textSizeL'>ФИЛЬТРЫ ПОСТАВЩИКОВ</span>
					<CloseButton onClick={onClose} />
				</div>
				<div className='flex-column' style={{ paddingBottom: 100, paddingTop: 32 }}>
					<FilterVendorPlace />
					<FilterVendorRegion />
					<FilterVendorMaterials />
					<FilterVendorOnMarket />
				</div>
				<Line lineWidth='100%' />
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button>Очистить все</Button>
					<Button>Показать 12 вариантов</Button>
				</div>
			</div>
		</>

	)
}

export default FilterVendorModal

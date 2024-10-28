import React from 'react'
import settings_svg from '../../../../../../../../assets/images/other/edit_services_settings.svg'
import { sectionsOfCategories } from '../../../../../../../../common/categories'
import { useModal } from '../../../../../../../../hooks/useModal'
import { ROUTES_PATH } from '../../../../../../../../routes/routes'
import CheckboxButton from '../../../../../../../ui/CheckboxButton/CheckboxButton'
import PageNameArrow from '../../../../../../../ui/PageName&Arrow/PageNameArrow'
import styles from '../../../../AboutProfile.module.scss'
import SettingsServicesModal from '../SettingsServicesModal'


const EditServices: React.FC = () => {
	const { handleClose, handleOpen, isOpen } = useModal()

	return (
		<>
			{isOpen && <SettingsServicesModal onClose={handleClose} />}
			<div className={styles['overlay_editServices']} style={{ display: 'flex', justifyContent: 'center', paddingTop: 140 }}>
				<div className={styles['editServices']}>
					<PageNameArrow
						style={{ position: 'absolute', top: -40, left: 0 }}
						pageName='РЕДАКТОР УСЛУГ'
						routeBack={ROUTES_PATH.myProfile} />
					<div className='flex-column gap-medium'>
						<div style={{ display: 'flex', gap: 24 }}>
							<span className='textSizeL'>{sectionsOfCategories[0].name}
							</span>
							<img onClick={handleOpen} src={settings_svg} alt="st" />
						</div>
						<div className='flex-column gap-small'>
							{sectionsOfCategories[0].subSection.map(section => (
								<div style={{ display: 'flex', gap: 24 }}>
									<CheckboxButton labelStyle={{ fontWeight: 700 }} label={section} />
								</div>
							))}
						</div>
					</div>
					<div style={{ display: 'flex', gap: 24 }}>
						<span className='textSizeL'>{sectionsOfCategories[1].name}</span>
						<img src={settings_svg} alt="st" />
					</div>
				</div>
			</div>
		</>
	)
}

export default EditServices

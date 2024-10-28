import { useRef, useState } from 'react'
import { useOutsideClick } from '../../../../hooks/useOutside'
import Line from '../../../ui/Line/Line'
import ModalContainer from '../../../ui/Modal/ModalContainer'
import RadioButton from '../../../ui/RadioButton/RadioButton'

const SearchOrderModalNotice: React.FC<{ onClose: () => void }> = ({ onClose }) => {

	const socials = ['E-mail', 'Вконтакте', 'Telegram', 'WhatsApp']
	const [currentSocial, setCurrentSocial] = useState('')
	const ref = useRef<HTMLDivElement>(null)
	useOutsideClick(ref, onClose)
	return (
		<ModalContainer
			zIndex={11}
			style={{ top: 180, borderRadius: 16, padding: 24, left: 170, width: 235 }}>
			<div ref={ref} className='flex-column gap-medium'>
				{socials.map((el, index) => (
					<RadioButton
						checked={currentSocial === el}
						onClick={() => setCurrentSocial(el)}
						labelStyle={{ fontWeight: currentSocial === el ? '800' : undefined }}
						key={index}
						label={el} />
				))}
				<Line lineWidth='100%' />
				<RadioButton
					checked={currentSocial === 'Без уведомлений'}
					onClick={() => setCurrentSocial('Без уведомлений')}
					labelStyle={{ fontWeight: currentSocial === 'Без уведомлений' ? '800' : undefined }}
					label='Без уведомлений' />
			</div>
		</ModalContainer>
	)
}

export default SearchOrderModalNotice

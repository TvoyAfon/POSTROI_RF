import React, { useState } from 'react'
import img_signs from '../../../assets/images/signs/img_signs.png'
import Button from '../../ui/Button/Button'
import styles from '../Signs.module.scss'
import SignsEditCard from './modal/SignsEditCard'

const MySignsCard: React.FC<{ openMap: boolean }> = ({ openMap }) => {
	const [openEditCard, setOpenEditCard] = useState(false)

	return (
		<>
			{openEditCard && <SignsEditCard />}
			<div style={openMap ?
				{ width: 240, height: 335, display: 'flex', flexDirection: 'column', overflowY: 'hidden', overflowX: 'hidden', padding: 16 } :
				{ gap: 32 }}
				className={styles.signsCard}>
				<img style={!openMap ? { width: 240, height: 240 } : { width: 208, height: 160, paddingBottom: 16 }} src={img_signs} alt="img" />
				<section style={{ display: 'flex', flexDirection: !openMap ? 'row' : 'column', gap: 12 }}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: !openMap ? 16 : 16, cursor: 'pointer' }}>
						<span className='textSizeL'>ШТУКАТУРКА ФАСАДА</span>
						<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
							<span style={{ fontSize: 16, fontWeight: 300 }}>От</span>
							<span style={{ fontSize: 16, fontWeight: 800 }}>35000 ₽</span>
						</div>
						{!openMap && <div style={{ overflowY: 'hidden', textOverflow: 'ellipsis', height: 100, fontSize: 16, fontWeight: 300 }}>
							Бригада штукатуров выполнит выравнивание стен и потолков: Цены на работу: Стены от 400 рублей м2; Откосы от 400рублей м.п; Потолки от 500рублей м2. 2 -х комнатная квартира - 3 дня (площадь по стенам 195 м2) 3 -х комнатная квартира - 4 дня ( площадь по стенам 275 м2) Коттедж – 6 дней (площадь по стенам 570 м2) Работы с соблюдением полной геометрии помещений. Улучшенная и высококачественная штукатурка по СНиП. Максимальная погрешность 2мм на 3 метра, в плоскости и в геометрии. Опыт в строительстве 12 лет. Замер бесплатно. Договор, гарантия 2 года. Звоните с 9 до 21 ежедневно. Штукатурить стены, полусухая стяжка пола, мокрая стяжка пола, оштукатуривание стен, штукатурные работы, внутренняя штукатурка, штукатурка под обои, штукатурка, штукатурка с глянцеванием, штукатурка гипсовой штукатуркой, штукатурка по маякам, механизировать штукатурку стен, механизированная штукатурка, машинная штукатурка, отделка стен штукатуркой, штукатурка машиной, механическая штукатурка, гипсовой смесью, штукатурка цементная, цементно-песчаная штукатурка, штукатурка для влажных помещений, штукатурка стен внутри, улучшенная штукатурка, высококачественная штукатурка, штукатурка углов, штукатурка откосов, штукатурка потолков, финишная штукатурка, полы наливные
						</div>}
						<span style={{ fontSize: 16, fontWeight: !openMap ? 800 : 300, textOverflow: 'ellipsis', overflow: 'hidden' }}>Кемеровская область, СНТ Денисовский, участок 544.</span>
						{!openMap && <span style={{ color: '#8E8E93', fontSize: 16, fontWeight: 800 }}>Строительство и ремонт {'>'} Строительные работы</span>}
					</div>
					{!openMap && <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
						<Button onClick={() => setOpenEditCard(true)} style={{ padding: 10, fontSize: 14, fontWeight: 400 }} >Редактировать</Button>
						<Button style={{ backgroundColor: '#8E8E93', padding: 10, fontSize: 14, fontWeight: 400 }}>Удалить</Button>
					</div>}
				</section>
			</div>
		</>
	)
}

export default MySignsCard

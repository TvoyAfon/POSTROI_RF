import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { categories } from '../../../common/categories'
import { ICreateOrderModal } from '../../../interface/modal.props'
import { changeCategoryName } from '../../../store/slices/CreateOrderCategoriesSlice'


import { addCategoryError } from '../../../store/slices/validation/CreateOrderValidationSlice'
import CloseButton from '../../ui/CloseButton/CloseButton'
import OverLay from '../../ui/OverLay'
import styles from './CreateOrderModal.module.scss'

const CreateOrderModal: React.FC<ICreateOrderModal> = ({ setOpenModal }) => {

	const dispatch = useDispatch()
	const [selectedCategory, setSelectedCategory] = useState<string>('')

	const handleChangeCategory = () => {
		dispatch(addCategoryError(false))
		dispatch(changeCategoryName(selectedCategory))
		setOpenModal(false)

	}

	return (
		<>
			<OverLay />
			<div className={styles.modal}>
				<div className={styles.modal_container}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span style={{ fontSize: '20px', fontWeight: '600' }}>Выберите категорию из списка</span>
						<CloseButton style={{ width: 31, height: 31 }} onClick={() => setOpenModal(false)} />
					</div>
					<ul>
						{categories.map((category, index) => (
							<li className={styles.modal_container_li} style={{ backgroundColor: selectedCategory === category ? '#383940' : '', color: selectedCategory === category ? 'white' : '' }}
								key={index}
								onClick={() => setSelectedCategory(category)}>{category}
							</li>
						))}
					</ul>
					<button onClick={handleChangeCategory}>Выбрать</button>
				</div>
			</div>
		</>
	)
}
export default CreateOrderModal

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

export const useGetTextInBox = () => {
	const { stepComponentNumber } = useSelector((state: RootState) => state.createOrder)
	const [text, setText] = useState('')

	useEffect(() => {
		switch (stepComponentNumber) {
			case 1:
				setText('Выберите категорию в которой будет размещен заказ')
				break
			case 2:
				setText('Напишите название заказа. Опишите задачу. Можете прикрепить документы и фотографии.')
				break
			case 3:
				setText('Укажите место выполнения работ, дату и контактный телефон. Также укажите удобный для Вас способ связи с исполнителем.')
				break
			case 4:
				setText('Выберите удобный для вас способ оплаты.')
				break
			case 5:
				setText('Здесь вы можете настроить способ получения уведомлений об откликах специалистов на ваш заказ. Указать рейтинг специалистов которые могут откликаться на заказ. И необходимостъ договора и закрывающих документов.')
				break
			case 6:
				setText('Так будут видеть вашу заявку исполнители')
				break
			default:
				setText('') // или какое-то другое значение по умолчанию
		}
	}, [stepComponentNumber]) // Добавляем зависимость

	return text
}
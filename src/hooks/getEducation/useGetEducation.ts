import debounce from 'debounce'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { userService } from '../../services/user/user.service'

export const useGetEducation = (search_filter: string, client_id: number) => {
    const [educationData, setEducationData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // Создаем функцию для получения данных образования
    const fetchEducationData = useCallback(async () => {
        if (!search_filter) return // Не выполнять запрос, если фильтр пустой

        try {
            setLoading(true)
            setError(false)
            const response = await userService.educationSearch(client_id, search_filter)
            setEducationData(response.data)
        } catch (error) {
            console.error('Не удалось получить список учреждений', error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [client_id, search_filter])

    // Дебаунс функции запроса данных
    const debouncedFetchEducationData = useMemo(() => debounce(fetchEducationData, 500), [fetchEducationData])

    useEffect(() => {
        debouncedFetchEducationData() // Запускаем дебаунс-функцию 
        // Очистка дебаунса при размонтировании компонента
        return () => {
            debouncedFetchEducationData.clear()
        }
    }, [debouncedFetchEducationData])

    return { error, loading, educationData }
}
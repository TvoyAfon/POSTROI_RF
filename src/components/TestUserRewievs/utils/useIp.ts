import jsCookie from 'js-cookie'
import { useEffect, useState } from 'react'

export const useIP = () => {
    const [ip, setIp] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any>()

    useEffect(() => {
        const fetchIP = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json')
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setIp(data.ip)

                jsCookie.set('x-real-ip', data.ip)
            
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchIP()
    }, [])

    return { ip, loading, error }
}
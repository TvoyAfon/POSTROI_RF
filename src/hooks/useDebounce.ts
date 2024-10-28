import { useEffect, useState } from "react"

export default function useDebounce(value: string | undefined | null, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(
        () => {
            if (!value) return
            const handler = setTimeout(() => {
                setDebouncedValue(value)
            }, delay)

            return () => {
                clearTimeout(handler)
            }
        },
        [value]
    )

    return debouncedValue
}
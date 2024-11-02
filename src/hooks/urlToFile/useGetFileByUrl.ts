import { useQuery } from 'react-query'

export const useGetFileByUrl = (url: string, fileName: string) => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['getFileByUrl', url],
		queryFn: async () => {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return await response.blob() // Получаем blob
		},
		select: (blob) => {
			// Превращаем blob в файл
			const file = new File([blob], fileName, { type: blob.type })
			return file
		}
	})

	return { file: data, error, isLoading }
}
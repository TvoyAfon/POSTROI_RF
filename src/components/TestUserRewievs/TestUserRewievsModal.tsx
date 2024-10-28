import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutside'
import { IDefaultModal } from '../../interface/modal.props'
import { reportService } from '../../services/report/report.service'
import ErrorSignature from '../Auth/ui/ErrorSignature'
import AttachPhoto from '../ui/AttachPhoto/AttachPhoto'
import Button from '../ui/Button/Button'
import CloseButton from '../ui/CloseButton/CloseButton'
import CreateOrderTextArea from '../ui/CreateOrderTextArea/CreateOrderTextArea'
import Loader from '../ui/Loader/Loader'
import ModalContainer from '../ui/Modal/ModalContainer'
import styles from './TestRewievs.module.scss'
import { getOSAndBrowser } from './utils/getBrowserAndOs'
import { useIP } from './utils/useIp'

interface IReport {
	wish: string
	problem: string
	files: File[] // Set this to an empty array instead of null
	browser: string
	os: string
	ip: string
}

const TestUserRewievsModal: React.FC<IDefaultModal> = ({ onClose }) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const [report, setReport] = useState<IReport>({
		wish: '',
		problem: '',
		files: [], // Initialize to an empty array
		browser: '',
		os: '',
		ip: ''
	})

	const { ip } = useIP()
	useOutsideClick(ref, onClose!)

	useEffect(() => {
		const { browser, os } = getOSAndBrowser()
		setReport((prevReport) => ({
			...prevReport,
			browser,
			os
		}))
	}, [])

	const handleDeletePhoto = (fileToDelete: File) => {
		setReport((prev) => ({
			...prev,
			files: prev.files.filter(file => file !== fileToDelete) // Remove the selected file
		}))
	}

	const handleChangeProblem = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReport(prev => ({ ...prev, problem: e.target.value }))
	}

	const handleChangeWish = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReport(prev => ({ ...prev, wish: e.target.value }))
	}

	const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files)
			// Check that the maximum number of files is not exceeded
			if (files.length + report.files.length <= 3) {
				setReport(prev => ({
					...prev,
					files: prev.files.concat(files) // Use concat to add new files
				}))
			}
		}
	}

	const handleSubmit = async () => {
		try {
			setLoading(true)
			setError(false)

			const reportData = {
				problem: report.problem,
				wish: report.wish,
				device_id: `browser: ${report.browser}, os: ${report.os}`,
				ip
			}

			const formData = new FormData()
			if (report.files.length > 0) {
				report.files.forEach(file => {
					formData.append('files', file)
					console.log(file)
				})                                     /* Не отправляет фото */
				await reportService.sendReport(reportData, formData) // Passing FormData with attached files
			} else {
				await reportService.sendReport(reportData) // Call without formData if there are no files
			}
			onClose && onClose()
			alert('Запрос успешно отправлен.')
		} catch (error) {
			console.log('Ошибка отправки запроса', error)
			setError(true)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={styles['testuserReviewsModal_overlay']}>
			<ModalContainer style={{ width: 746, position: 'fixed', top: '50%', left: '50%' }} isOnOverlay={true} zIndex={11}>
				<div ref={ref} className={styles['testUserRewievsModal']}>
					<CloseButton style={{ position: 'absolute', right: 0 }} onClick={onClose} />
					<div className={styles['testUserRewievsModal_container']}>
						<div className='flex-column gap-medium'>
							<span>ОПИШИТЕ ПРОБЛЕМУ</span>
							<CreateOrderTextArea onChange={handleChangeProblem} placeholder='Ваша проблема' style={{ height: 154 }} />
							<AttachPhoto handleDeletePhoto={handleDeletePhoto} handleChangePhoto={handleChangePhoto} files={report.files} />
							<span>ВАШИ ПОЖЕЛАНИЯ</span>
							<CreateOrderTextArea onChange={handleChangeWish} placeholder='Ваши пожелания' style={{ height: 154 }} />
							<Button onClick={handleSubmit} disabled={loading}>
								{loading ? <Loader /> : 'Отправить'}
							</Button>
							{error && <ErrorSignature>Произошла ошибка.Попробуйте снова.</ErrorSignature>}
						</div>
					</div>
				</div>
			</ModalContainer>
		</div>
	)
}

export default TestUserRewievsModal

import { REPORT_SERVICE_URL } from '../../config/config'
import { sendAsync } from '../send-async'
import { URLConstructor } from '../url'

interface IReportService {
	wish?: string,
	problem?: string,
	device_id: string,
	ip: string,
}

interface IGetAllReports {
	token: string,
	offset?: number,
	limit?: number
}

class ReportService {
	url = new URLConstructor(`${REPORT_SERVICE_URL}/bug`)

	async sendReport(schema: IReportService, files?: FormData) {
		return await sendAsync('post', this.url.constructURL('send', schema), files)
	}

	async getAllReports(schema: IGetAllReports) {
		return await sendAsync('get', this.url.constructURL('all', schema), {})
	}
}

export const reportService = new ReportService()
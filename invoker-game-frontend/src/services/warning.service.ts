import axiosInstance from '../api'

export const WarningService = {
	async createNewWarning() {
		const res = await axiosInstance.post('warning/create-warning')
		return res.data
	},
}

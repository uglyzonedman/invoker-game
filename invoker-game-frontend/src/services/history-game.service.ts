import axiosInstance from '../api'

export const HistoryGameService = {
	async createHistory(result: any) {
		const res = await axiosInstance.post('history-game/create-history', {
			result,
		})
		return res.data
	},

	async getAllHistoryGameByUser() {
		const res = await axiosInstance.get('history-game/get-all-by-user')
		return res.data
	},
}

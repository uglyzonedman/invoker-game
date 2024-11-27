import axiosInstance from '../api'

export const HistoryGameService = {
	async createHistory(resultId: number) {
		const res = await axiosInstance.post('history-game/create-history', {
			resultId,
		})
		return res.data
	},

	async getAllHistoryGameByUser() {
		const res = await axiosInstance.get('history-game/get-all-by-user')
		return res.data
	},
}

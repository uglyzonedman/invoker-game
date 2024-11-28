import axiosInstance from '../api'

export const ResultGameService = {
	async getAllResults() {
		const res = await axiosInstance.get('result-game/all')
		return res.data
	},

	async createResult({
		result,
		gameMode,
		warning,
	}: {
		result: number
		gameMode: any
		warning: boolean
	}) {
		const res = await axiosInstance.post('result-game/create-result', {
			gameMode,
			result,
			warning,
		})
		return res.data
	},
}

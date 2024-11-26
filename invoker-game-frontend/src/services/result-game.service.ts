import axiosInstance from '../api'

export const ResultGameService = {
	async getAllResults() {
		const res = await axiosInstance.get('result-game/all')
		return res.data
	},

	async createResult({ result, gameMode }: { result: number; gameMode: any }) {
		const res = await axiosInstance.post('result-game/create-result', {
			gameMode,
			result,
		})
		return res.data
	},
}

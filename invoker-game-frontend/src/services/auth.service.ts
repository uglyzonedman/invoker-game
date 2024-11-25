import axiosInstance from '../api'

export const AuthService = {
	async register({ login, password }: { login: string; password: string }) {
		const response = await axiosInstance.post('auth/register', {
			login,
			password,
		})
		return response.data
	},
}

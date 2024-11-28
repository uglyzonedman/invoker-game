import axios from 'axios'
import Cookies from 'js-cookie'
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	timeout: 10000,
})

axiosInstance.interceptors.request.use(
	config => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		const refreshToken = Cookies.get('refreshToken')
		if (error.response.status == 401) {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BASE_URL}/auth/login/refresh-token`,
					{
						refreshToken,
					}
				)
				Cookies.set('accessToken', response.data.accessToken, {
					expires: 1 / (24 * 60),
					path: '/',
				})
				Cookies.set('refreshToken', response.data.refreshToken, {
					expires: 7,
					path: '/',
				})
				return axiosInstance.request(originalRequest)
			} catch (error) {
				localStorage.removeItem('user')
				Cookies.remove('accessToken')
				Cookies.remove('refreshToken')
			}
		}
	}
)

export default axiosInstance

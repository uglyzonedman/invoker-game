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

// axiosInstance.interceptors.response.use(
// 	response => {
// 		return response
// 	},
// 	error => {
// 		if (error.response?.status === 401) {
// 			console.error('Unauthorized! Redirecting to login...')
// 			window.location.href = '/login'
// 		}
// 		return Promise.reject(error)
// 	}
// )

export default axiosInstance

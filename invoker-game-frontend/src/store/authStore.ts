import { create } from 'zustand'
import axiosInstance from '../api'
import Cookies from 'js-cookie'

// Тип для токенов
interface Tokens {
	accessToken: string
	refreshToken: string
}

// Тип для пользователя
interface User {
	id: string
	name: string
	email: string
	[key: string]: any // Дополнительные поля, если они есть
}

// Тип для параметров функции login
interface LoginParams {
	login: string
	password: string
}

// Тип состояния хранилища
interface AuthState {
	user: User | null // Информация о пользователе
	token: Tokens | null // Токены
	isAuthenticated: boolean // Статус авторизации
	error: string | null // Ошибка авторизации

	// Методы
	login: (params: LoginParams) => Promise<void>
	logout: () => void
	checkAuth: () => void
}

// Создание хранилища с типизацией
const useAuthStore = create<AuthState>(set => ({
	user: null,
	token: null,
	isAuthenticated: false,
	error: null,

	// Авторизация
	login: async ({ login, password }: LoginParams) => {
		try {
			const response = await axiosInstance.post('auth/login', {
				login,
				password,
			})

			const { user, tokens } = response.data as { user: User; tokens: Tokens }
			const accessToken = tokens.accessToken
			const refreshToken = tokens.refreshToken

			set({
				user,
				token: tokens,
				isAuthenticated: true,
				error: null,
			})

			// Сохраняем токены
			Cookies.set('accessToken', accessToken)
			Cookies.set('refreshToken', refreshToken)
			localStorage.setItem('user', JSON.stringify(user))
		} catch (error: any) {
			set({
				user: null,
				token: null,
				isAuthenticated: false,
				error: error.response?.data?.message || 'Ошибка авторизации',
			})
		}
	},

	// Выход
	logout: () => {
		set({
			user: null,
			token: null,
			isAuthenticated: false,
		})

		Cookies.remove('accessToken')
		Cookies.remove('refreshToken')
		localStorage.removeItem('user')
	},

	// Проверка токена
	checkAuth: () => {
		const token = Cookies.get('accessToken')
		if (token) {
			set({ isAuthenticated: true })
		} else {
			set({ isAuthenticated: false })
		}
	},
}))

export default useAuthStore

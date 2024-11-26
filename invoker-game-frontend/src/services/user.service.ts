import axiosInstance from '../api'

export const UserService = {
	async getProfile() {
		const response = await axiosInstance.get('user/profile')
		return response.data
	},
	async updateProfile({
		avatarPath,
		login,
	}: {
		avatarPath: string
		login: string
	}) {
		const response = await axiosInstance.put('user/update-profile', {
			avatarPath,
			login,
		})
		return response.data
	},

	async updateKeyboardProfile({ keyboards }: { keyboards: any[] }) {
		const response = await axiosInstance.put('user/update-keyboard', {
			keyboards,
		})
		return response.data
	},
	async updateAvatar({ photo }: { photo: any }) {
		const formData = new FormData()
		formData.append('photo', photo)

		const response = await axiosInstance.post('user/upload-avatar', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		return response.data
	},
}

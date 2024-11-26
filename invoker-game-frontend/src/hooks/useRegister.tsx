import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../services/auth.service'
import { Bounce, toast } from 'react-toastify'

export const useRegister = ({
	login,
	password,
}: {
	login: string
	password: string
}) => {
	const { mutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: () =>
			AuthService.register({ login: login, password: password }),
		onSuccess: () => {
			toast.success('Вы успешно создали аккаунт', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
				transition: Bounce,
			})
		},
		onError: (err: any) => {
			toast.error(err.response.data.message, {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
				transition: Bounce,
			})
		},
	})

	return { mutate }
}

import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../services/auth.service'

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
	})

	return { mutate }
}

import useAuthStore from '../store/authStore'

export const useUser = () => {
	const user = useAuthStore(state => state.user)
	return user
}

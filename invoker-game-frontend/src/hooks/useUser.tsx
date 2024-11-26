import { useMutation, useQuery } from '@tanstack/react-query'
import useAuthStore from '../store/authStore'
import { UserService } from '../services/user.service'

export const useUser = () => {
	const user = useAuthStore(state => state.user)
	return user
}

export const useProfile = () => {
	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryKey: ['get-profile-by-id'],
		queryFn: () => UserService.getProfile(),
	})

	return { profile, isLoadingProfile }
}

export const useUpdateProfile = () => {
	const { mutate: updateProfileFunc } = useMutation({
		mutationKey: ['update-profile'],
		mutationFn: ({
			avatarPath,
			login,
		}: {
			avatarPath: string
			login: string
		}) => UserService.updateProfile({ avatarPath, login }),
	})
	return { updateProfileFunc }
}
export const useUpdateKeyboardProfile = () => {
	const { mutate: updateKeyboardFunc } = useMutation({
		mutationKey: ['updateKeyboardProfile'],
		mutationFn: ({ keyboards }: { keyboards: any[] }) =>
			UserService.updateKeyboardProfile({ keyboards }),
	})
	return { updateKeyboardFunc }
}
export const useUpdateAvatar = () => {
	const { mutateAsync: updateAvatarFunc } = useMutation({
		mutationKey: ['update-avatar'],
		mutationFn: ({ photo }: { photo: string }) =>
			UserService.updateAvatar({ photo }),
	})
	return { updateAvatarFunc }
}

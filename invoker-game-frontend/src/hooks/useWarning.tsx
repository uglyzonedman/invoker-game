import { useMutation } from '@tanstack/react-query'
import { WarningService } from '../services/warning.service'

export const useCreateWarning = () => {
	const { mutate: createWarningFunc } = useMutation({
		mutationFn: () => WarningService.createNewWarning(),
		mutationKey: ['create-warning'],
	})
	return { createWarningFunc }
}

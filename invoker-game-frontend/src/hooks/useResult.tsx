import { useMutation, useQuery } from '@tanstack/react-query'
import { ResultGameService } from '../services/result-game.service'
import { HistoryGameService } from '../services/history-game.service'

export const useGetAllResults = () => {
	const { data: getAll } = useQuery({
		queryKey: ['get-all-results'],
		queryFn: () => ResultGameService.getAllResults(),
	})

	return { getAll }
}

export const useCreateResult = () => {
	const { mutate: createResultFunc } = useMutation({
		mutationKey: ['create-result'],
		mutationFn: ({ result, gameMode }: { result: number; gameMode: any }) =>
			ResultGameService.createResult({ gameMode, result }),
		onSuccess: async res => {
			await HistoryGameService.createHistory(res)
		},
	})

	return { createResultFunc }
}

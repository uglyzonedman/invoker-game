import { useQuery } from '@tanstack/react-query'
import { HistoryGameService } from '../services/history-game.service'

export const useGetAllHistoryById = () => {
	const { data: getAllHistory } = useQuery({
		queryKey: ['get-all-history-by-id'],
		queryFn: () => HistoryGameService.getAllHistoryGameByUser(),
	})

	return {
		getAllHistory,
	}
}

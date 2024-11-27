import { useGetAllResults } from '../../hooks/useResult'

const LeaderBoard = () => {
	const { getAll } = useGetAllResults()
	console.log(getAll)
	const getMedalClass = (index: number) => {
		if (index === 0) return 'bg-yellow-500' // Gold
		if (index === 1) return 'bg-gray-300' // Silver
		if (index === 2) return 'bg-yellow-900' // Bronze
		return 'bg-gray-700' // Default for other positions
	}

	return (
		<div className='max-w-[1280px] w-full mt-4 mx-auto'>
			<div className='w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-xl'>
				<h3 className='text-2xl text-white font-bold mb-4'>Таблица лидеров</h3>
				<div className='space-y-4'>
					{getAll?.map((item: any, index: number) => (
						<div
							key={index}
							className={`flex items-center justify-between p-4 rounded-lg ${getMedalClass(
								index
							)}`}
						>
							<div className='flex items-center space-x-4'>
								<div className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-600'>
									<span className='text-white font-semibold'>{index + 1}</span>
								</div>
								<img
									className='w-10 h-10 rounded-full object-cover'
									src={`${import.meta.env.VITE_BASE_URL}/user/get-avatar/${
										item?.user?.avatarPath
									}`}
									alt={item?.user?.login}
								/>

								<h3 className='text-white font-semibold'>
									{item?.user?.login}
								</h3>
							</div>
							<div className='text-white text-lg font-bold'>
								{item?.result} с
							</div>
							{/* VAC badge */}
							{item.user.vacBan && (
								<div className='relative flex items-center'>
									<span className='text-red-500 font-bold text-base uppercase tracking-wider vac-badge font-bold border-red-600 border-[1px] border-solid px-3 py-2'>
										VAC
									</span>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default LeaderBoard

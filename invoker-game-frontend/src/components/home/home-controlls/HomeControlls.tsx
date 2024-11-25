import { customKeys } from '../../../consts/custom-keys'

const HomeControlls = ({
	countKeys,
	currentStep,
	startGame,
	currentTimer,
	incorrectKeyCount,
}: {
	currentTimer: number
	startGame: boolean
	countKeys: number
	currentStep: number
	incorrectKeyCount: number
}) => {
	return (
		<div className=''>
			<div className='border-[1px] border-solid border-white w-[200px]  px-4 py-2'>
				<h2 className='text-lg font-bold text-white text-center mb-3'>
					Управление
				</h2>
				<div className=''>
					{customKeys.map(key => (
						<div
							className='flex items-center justify-between mb-2'
							key={key.id}
						>
							<p className='text-white font-bold'>
								<span style={{ color: key.textColor }}>
									{key.key.toUpperCase()}
								</span>{' '}
								- {key.name}
							</p>
							<img
								src={key.photo}
								width={24}
								height={24}
								className='rounded-full ml-3'
							/>
						</div>
					))}
				</div>
			</div>
			{startGame && (
				<div className='border-[1px] border-solid border-white w-[200px]  px-4 py-2 mt-5'>
					<h2 className='text-lg font-bold text-white text-center mb-3'>
						Статистика
					</h2>
					<p className='text-base font-medium text-white  mb-3'>
						Кнопок нажато: {countKeys}
					</p>
					<p className='text-base font-medium text-white  mb-3'>
						Этап: {currentStep}
					</p>
					<p className='text-base font-medium text-white  mb-3'>
						Таймер: {currentTimer} c
					</p>
					<p className='text-base font-medium text-white  mb-3'>
						Ошибок: {incorrectKeyCount}
					</p>
				</div>
			)}
		</div>
	)
}

export default HomeControlls

import hight from '../../assets/high.gif'
import medium from '../../assets/medium.gif'
import easy from '../../assets/easy.gif'
import { Link } from 'react-router-dom'
import { useProfile } from '../../hooks/useUser'

const InvokerMastery = () => {
	const { profile } = useProfile()

	const levels = [
		{
			id: 1,
			title: 'Easy',
			description: 'Доступны подсказки. Максимальное количество кнопок - 3.',
			imgSrc: easy,
			isUnlocked: true,
			link: 'easy',
		},
		{
			id: 2,
			title: 'Medium',
			description: 'Подсказок нет. Максимальное количество кнопок - 3.',
			imgSrc: medium,
			isUnlocked: false,
			link: '',
		},
		{
			id: 3,
			title: 'Absolute',
			description: 'Абсолютный контроль. Доминируйте в любой ситуации.',
			imgSrc: hight,
			isUnlocked: false,
			link: '',
		},
	]

	// Filter the levels to show only the unlocked ones, and limit to the first available one
	const availableLevels = levels.filter(level => level.isUnlocked)

	// If profile is false, show no level
	if (!profile) {
		return (
			<div className='text-center text-white'>
				Доступ закрыт. Пожалуйста, авторизуйтесь.
			</div>
		)
	}

	// If there is no unlocked level, show a message
	if (availableLevels.length === 0) {
		return <div className='text-center text-white'>Нет доступных уровней.</div>
	}

	// Only show one available level
	const level = availableLevels[0]

	return (
		<div className='max-w-[1280px] w-full mt-2 mx-auto'>
			<div className='p-5 text-white'>
				<h1 className='text-3xl font-bold text-center mb-8'>
					Invoker's Mastery
				</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					<div
						key={level.id}
						className={`max-w-sm bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700 ${
							level.isUnlocked ? 'hover:shadow-2xl' : 'opacity-50'
						} transition-shadow duration-300`}
					>
						<img
							className='w-full h-56 object-cover'
							src={level.imgSrc}
							alt={level.title}
						/>
						<div className='p-5'>
							<h3 className='text-xl font-bold text-white mb-3'>
								{level.title}
							</h3>
							<p className='text-gray-300'>{level.description}</p>
							<Link
								to={level.link}
								className={`block text-center mt-5 w-full py-2 px-4 font-medium rounded-lg transition-colors duration-300 ${
									level.isUnlocked
										? 'bg-blue-500 text-white hover:bg-blue-600'
										: 'bg-gray-500 text-gray-400 cursor-not-allowed'
								}`}
							>
								{level.isUnlocked ? 'Выбрать уровень' : 'Заблокировано'}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InvokerMastery

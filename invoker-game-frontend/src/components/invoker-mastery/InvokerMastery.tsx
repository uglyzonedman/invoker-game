import hight from '../../assets/high.gif'
import medium from '../../assets/medium.gif'
import easy from '../../assets/easy.gif'
import { Link } from 'react-router-dom'
import { useProfile, useUser } from '../../hooks/useUser'

const InvokerMastery = () => {
	const user = useUser()
	const { profile } = useProfile(user)

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

	const availableLevels = levels.filter(level => level.isUnlocked)

	if (!profile) {
		return (
			<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
				<div className='bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md text-center'>
					<h2 className='text-2xl font-bold mb-4'>Доступ закрыт</h2>
					<p className='mb-6'>
						Пожалуйста, авторизуйтесь, чтобы получить доступ к этому ресурсу.
					</p>
					<button
						className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none transition'
						onClick={() => alert('Перенаправление на страницу авторизации')}
					>
						Авторизоваться
					</button>
				</div>
			</div>
		)
	}

	if (profile.vacBan) {
		return (
			<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
				<div className='bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md text-center'>
					<h2 className='text-2xl font-bold mb-4'>Доступ закрыт</h2>
					<p className='mb-6'>
						Вы получили{' '}
						<span className='text-red-500 font-semibold'>VAC Ban</span>. Доступ
						к этому ресурсу недоступен.
					</p>
					<button
						className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none transition'
						onClick={() =>
							(window.location.href =
								'https://www.youtube.com/watch?v=yAgsZqci9Vo')
						}
					>
						Понятно
					</button>
				</div>
			</div>
		)
	}

	if (availableLevels.length === 0) {
		return <div className='text-center text-white'>Нет доступных уровней.</div>
	}

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

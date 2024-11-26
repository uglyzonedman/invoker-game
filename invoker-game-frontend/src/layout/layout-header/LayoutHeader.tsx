import { AiOutlineHome, AiOutlineLogin, AiOutlineTrophy } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useProfile, useUser } from '../../hooks/useUser'

const LayoutHeader = () => {
	const user = useUser()
	const { profile } = useProfile()

	return (
		<header className='bg-gray-900 shadow-lg py-4'>
			<div className='max-w-[1280px] w-full mx-auto px-4'>
				<div className='flex justify-between items-center'>
					<Link
						to={'/'}
						className='text-white text-[36px] font-bold tracking-wider'
						style={{
							fontFamily: "'Dota 2 Title', sans-serif",
							textShadow: '0 2px 4px rgba(255, 223, 0, 0.7)',
						}}
					>
						有馬 貴将
					</Link>
					<nav>
						<ul className='flex items-center'>
							<li className='ml-8 flex items-center'>
								<AiOutlineHome
									color='#fff'
									className='text-gold text-2xl mr-2'
								/>
								<Link
									className='text-white font-medium text-xl hover:text-gold transition-all duration-300 flex items-center'
									to='/'
								>
									Главная
								</Link>
							</li>
							<li className='ml-8 flex items-center'>
								<AiOutlineTrophy
									color='#fff'
									className='text-gold text-2xl mr-2'
								/>
								<Link
									className='text-white font-medium text-xl hover:text-gold transition-all duration-300 flex items-center'
									to='/leaderboard'
								>
									Таблица лидеров
								</Link>
							</li>
							<li className='ml-8 flex items-center'>
								{user ? (
									<div className='flex items-center'>
										<img
											width={32}
											height={32}
											className='rounded-full'
											src={`${import.meta.env.VITE_BASE_URL}/user/get-avatar/${
												profile?.avatarPath
											}`}
										/>
										<Link
											className='text-white text-base  ml-3'
											to={'/profile'}
										>
											{profile?.login}
										</Link>
									</div>
								) : (
									<>
										<AiOutlineLogin
											color='#fff'
											className='text-gold text-2xl mr-2'
										/>
										<Link
											className='text-white font-medium text-xl hover:text-gold transition-all duration-300 flex items-center'
											to='/auth/login'
										>
											Войти
										</Link>
									</>
								)}
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default LayoutHeader

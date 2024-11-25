import { Link, Outlet } from 'react-router-dom'
import { AiOutlineHome, AiOutlineTrophy, AiOutlineLogin } from 'react-icons/ai'

const Layout = () => {
	return (
		<div className='flex flex-col min-h-screen relative'>
			<header className='bg-gray-900 shadow-lg py-4'>
				<div className='max-w-[1280px] w-full mx-auto px-4'>
					<div className='flex justify-between items-center'>
						<h1
							className='text-white text-[36px] font-bold tracking-wider'
							style={{
								fontFamily: "'Dota 2 Title', sans-serif",
								textShadow: '0 2px 4px rgba(255, 223, 0, 0.7)',
							}}
						>
							有馬 貴将
						</h1>
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
										to='/'
									>
										Таблица лидеров
									</Link>
								</li>
								<li className='ml-8 flex items-center'>
									<AiOutlineLogin
										color='#fff'
										className='text-gold text-2xl mr-2'
									/>
									<Link
										className='text-white font-medium text-xl hover:text-gold transition-all duration-300 flex items-center'
										to='/auth'
									>
										Войти
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
			<main className='flex-grow relative bg-gray-950 text-white'>
				<Outlet />
			</main>
			<footer className='bg-gray-900 text-white py-4 mt-auto'>
				<div className='max-w-[1280px] w-full mx-auto'>
					<p className='text-center'>©uglyzonedman 2024 BOSS KFC</p>
				</div>
			</footer>
		</div>
	)
}

export default Layout

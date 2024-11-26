import { Outlet } from 'react-router-dom'
import LayoutHeader from './layout-header/LayoutHeader'
import LayoutFooter from './layout-footer/LayoutFooter'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
	return (
		<div className='flex flex-col min-h-screen relative'>
			<ToastContainer />
			<LayoutHeader />
			<main className='flex-grow relative bg-gray-950 text-white'>
				<Outlet />
			</main>
			<LayoutFooter />
		</div>
	)
}

export default Layout

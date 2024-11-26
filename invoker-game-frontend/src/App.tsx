import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './components/home/Home'
import Auth from './components/auth/Auth'
import InvokerMastery from './components/invoker-mastery/InvokerMastery'
import InvokerMasteryType from './components/invoker-mastery/invoker-mastery-type/InvokerMasteryType'
import Profile from './components/profile/Profile'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='auth/:type' element={<Auth />} />
					<Route path='invoker-mastery' element={<InvokerMastery />} />
					<Route
						path='invoker-mastery/:type'
						element={<InvokerMasteryType />}
					/>
					<Route path='profile' element={<Profile />} />
				</Route>
			</Routes>
		</Router>
	)
}

export default App

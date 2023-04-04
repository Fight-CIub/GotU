import CustomAlert from 'Components/CustomAlert/CustomAlert'
import Auth from 'Pages/Auth/Auth'
import Login from 'Pages/Auth/Login/Login'
import Register from 'Pages/Auth/Register/Register'
import Landing from 'Pages/Landing/Landing'
import NotFound from 'Pages/NotFound/NotFound'
import Offers from 'Pages/Offers/Offers'
import SingularOffer from 'Pages/SingularOffer/SingularOffer'
import Profile from 'Pages/User/Profile/Profile'
import { Settings } from 'Pages/User/Settings/Settings'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProfileOffers from 'Pages/User/Profile/ProfileOffers/ProfileOffers'

const App = () => {
	return (
		// <Header />
		<>
			<CustomAlert />
			{/* <Landing /> */}
			<Routes>
				<Route
					path='/'
					element={<Landing />}
				/>
				<Route
					path='offers/'
					element={<Offers />}
				/>
				<Route
					path='offers/page/:pageNumber'
					element={<Offers />}
				/>
				<Route
					path='offers/offer/:offerId'
					element={<SingularOffer />}
				/>
				<Route
					path='auth'
					element={<Auth />}
				>
					<Route
						path='login'
						element={<Login />}
					/>
					<Route
						path='register'
						element={<Register />}
					/>
				</Route>
				<Route
					path='profile/:userName'
					element={<Profile />}
				/>
				<Route
					path='profile/:userName/offers'
					element={<ProfileOffers />}
				/>
				<Route path='user'>
					<Route
						path='settings'
						element={<Settings />}
					/>
				</Route>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</>
	)
}

export default App

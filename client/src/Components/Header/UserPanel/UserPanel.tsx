import React from 'react'
import { useSelector } from 'react-redux'
import Logged from './Logged'
import UnLogged from './UnLogged'

const UserPanel = () => {
	const isUserLoggedIn = useSelector((state: any) => state.user.isUserLoggedIn)
	return (
		<div className='header__user-panel'>
			{isUserLoggedIn ? <Logged /> : <UnLogged />}
		</div>
	)
}

export default UserPanel

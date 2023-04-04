import { createSlice } from '@reduxjs/toolkit'
import { UserData } from './User'

const initialState: UserData = {
	isUserLoggedIn: localStorage.getItem('userAuthStatus') ? true : false,
	user: localStorage.getItem('userData')
		? JSON.parse(localStorage.getItem('userData')!)
		: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserAuthStatus: (state, action) => {
			state.isUserLoggedIn = action.payload
		},
		setUserData: (state, action) => {
			state.user = action.payload
		},
		clearUserData: (state) => {
			state.user = null
			state.isUserLoggedIn = false
			localStorage.removeItem('userData')
			localStorage.removeItem('userAuthStatus')
		},
	},
})

export const { setUserAuthStatus, setUserData, clearUserData } =
	userSlice.actions

export default userSlice.reducer

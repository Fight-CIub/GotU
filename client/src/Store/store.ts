import { configureStore } from '@reduxjs/toolkit'

import { userSlice } from './features/User/userSlice'
import { customAlertSlice } from './features/CustomAlert/CustomAlertSlice'
import { SearchBarSlice } from './features/SearchBar/SearchBarSlice'

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		customAlert: customAlertSlice.reducer,
		searchBar: SearchBarSlice.reducer,
	},
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

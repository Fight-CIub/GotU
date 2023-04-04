import { User } from 'Assets/Models/User'

export interface UserData {
	isUserLoggedIn: boolean
	user: User | null
}

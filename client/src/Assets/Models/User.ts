export interface User {
	[x: string]: any
	id: string
	displayName: string
	email: string
	authToken?: string
	emailVerified: boolean
	metadata: {
		lastSignInTime: string
		creationTime: string
	}
	phoneNumber?: string
	photoURL: string
}

import { initializeApp } from 'firebase/app'
export const config = {
	SERVER_URL: 'http://localhost:8000/api',
}

export const firebase = initializeApp(firebaseConfig)

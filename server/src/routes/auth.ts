import express, { Request, Response } from 'express'

import firebase from './../config/firebase'

//import { getAuth } from 'firebase/auth'

const router = express.Router()

router.post('/register', async (req: Request, res: Response) => {
	const { email, password, displayName } = req.body
	console.log(displayName)
	try {
		const user = await firebase.auth().createUser({
			email: email,
			password: password,
			displayName: displayName,
		})
		console.log(user)
		res.status(201).json({ user })
	} catch (error) {
		res.status(400).json({ error })
		console.error(error)
	}

	try {
	} catch (error) {}
})

module.exports = router

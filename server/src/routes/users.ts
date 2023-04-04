import express, { Request, Response } from "express"
import { User } from "../models/user"
import firebase from "./../config/firebase"

const router = express.Router()

//Adding new user to database
router.post("/add", async (req: Request, res: Response) => {
	const { email, displayName, uid } = req.body

	try {
		const user = {
			email: email,
			displayName: displayName,
			metadata: {
				creationTime: new Date().getTime()
			}
		}
		const userCreation = await firebase.database().ref(`users/${uid}`).set(user)

		res.status(201).json({ user })
	} catch (error) {
		res.status(400).json({ error })
		console.error(error)
	}
})

//Editing user data
router.post("/edit", async (req: Request, res: Response) => {
	const user: User = req.body
	try {
		await firebase
			.database()
			.ref(`users/${user.uid}`)
			.set(user)
			.then((response) => {
				res.status(201).json({ user })
			})
	} catch (error) {
		res.status(400).json({ error })
	}
})

//Deleting user account
router.post("/delete", async (req: Request, res: Response) => {
	const user: User = req.body

	try {
		await firebase.database().ref(`users/${user.uid}`).remove()

		res.status(201).json({ message: "accountdeleted" })
	} catch (error) {
		res.status(400).json({ error })
	}
})

//Getting all users data
router.get("/getAllUsersData", async (req: Request, res: Response) => {
	try {
		const usersData = await firebase.database().ref(`users`).get()

		res.send(usersData.toJSON())
	} catch (error) {
		console.log(error)
	}
})

//Getting user data
router.get("/getUserData/:uid", async (req: Request, res: Response) => {
	const user = req.params.uid

	try {
		await firebase
			.database()
			.ref(`users/${user}/`)
			.once("value", (snapshot) => {
				// console.log(snapshot.val())
				const data = { ...snapshot.val(), uid: user }
				// console.log()
				res.status(201).send(JSON.stringify(data))
			})
	} catch (error) {
		console.log(error)
	}
})

router.get("/getUserDataFromName/:userName", async (req: Request, res: Response) => {
	const userName = req.params.userName

	try {
		await firebase
			.database()
			.ref(`users/`)
			.orderByChild("displayName")
			.equalTo(userName)
			.once("value", (snapshot) => {
				const data = { ...snapshot.val() }
				const userData = Object.values(data)[0] as object
				const dataToReturn = { ...userData, uid: Object.keys(data)[0] }
				res.status(201).send(dataToReturn)
			})
	} catch (error) {
		console.log("err getUserDataFromName", error)
	}
})

module.exports = router

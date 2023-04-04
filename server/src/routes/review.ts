import express, { Request, Response } from "express"
import firebase from "./../config/firebase"

const router = express.Router()

//Adding review to database
router.post("/addReview/:id", async (req: Request, res: Response) => {
	const offerId = req.params.id
	const review = req.body
	try {
		const newReview = await firebase.database().ref(`offers/${offerId}/reviews/`).set({ review })
		res.status(201).json({ review })
	} catch (error) {
		res.status(400).json({ error })
	}
})

//Getting all reviews from offer
router.get("/getAllReviews/:id", async (req: Request, res: Response) => {
	const offerId = req.params.id
	try {
		const reviews = await firebase.database().ref(`offers/${offerId}/reviews`).get()

		res.send(reviews.toJSON())
	} catch (error) {
		console.log(error)
	}
})

//Getting random reviews (up to 3) from random offer (up to 3)
router.get("/getRandomReviews/:id", async (req: Request, res: Response) => {
	const userId = req.params.id

	try {
		let data
		let offersData: Object[] = []
		let reviews: Object[] = []
		let reviewerName: string[] = []
		let offerName: string[] = []
		let dataToReturn: Object[] = []

		//Getting random offer and adding it to array
		const getRandomOffer = (data: Object): Object => {
			let randomOffer = Object.values(data)[Math.floor(Math.random() * Object.values(data).length)] as Object

			//Adding up to 3 random offers to array
			if (offersData.length < 3) {
				if (!offersData.includes(randomOffer)) {
					offersData.push(randomOffer)
				}
				getRandomOffer(data)
			}
			return false
		}

		//Getting offer title and adding it to array
		const getTitle = (data: Object) => {
			let offerTitle = Object.values(data)[9]

			offerName.push(offerTitle)
		}

		//Getting username by id and adding it to array
		const getUsernameById = (uid: string) => {
			let getUsername = Object.values(uid)[0]

			reviewerName.push(getUsername)

			return false
		}

		//Getting random review from offer and adding it to array
		const getRandomReview = (data: Object): Object => {
			let randomReview = Object.values(data)[Math.floor(Math.random() * Object.values(data).length)] as Object

			reviews.push(randomReview)

			return false
		}

		//Connection to database to get random offers
		const offer = await firebase
			.database()
			.ref("offers/")
			.orderByChild("createdBy")
			.equalTo(userId)
			.once("value", (snapshot) => {
				data = { ...snapshot.val() }
				getRandomOffer(data)
			})

		//Connection to database to get random review, title and username
		for (let i = 0; i < offersData.length; i++) {
			let offersId = Object.values(offersData[i])[3]

			const review = await firebase
				.database()
				.ref(`offers/${offersId}/reviews`)
				.once("value", (snapshot) => {
					data = { ...snapshot.val() }
					getRandomReview(data)
				})

			let uid = Object.values(reviews[i])[2]

			const username = await firebase
				.database()
				.ref(`users/${uid}`)
				.once("value", (snapshot) => {
					data = { ...snapshot.val() }
					getUsernameById(data)
				})

			const title = await firebase
				.database()
				.ref(`offers/${offersId}`)
				.once("value", (snapshot) => {
					data = { ...snapshot.val() }
					getTitle(data)
				})

			//Creating JSONlike object to send it to client
			dataToReturn[i] = {
				comment: Object.values(reviews[i])[0],
				rate: Object.values(reviews[i])[1],
				ratedBy: uid,
				reviewerName: reviewerName[i],
				offerTitle: offerName[i]
			}
		}

		//send reviews to client
		res.status(201).send(dataToReturn)
	} catch (error) {
		console.log(error)
	}
})

module.exports = router

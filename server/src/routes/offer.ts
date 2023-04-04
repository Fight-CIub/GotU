import express, { Request, Response } from 'express'
import { Offer } from '../models/offer'
import firebase from './../config/firebase'

const router = express.Router()

//Adding new offer to database
router.post('/add', async (req: Request, res: Response) => {
	const offer: Offer = req.body
	try {
		const newOffer = await firebase
			.database()
			.ref(`offers/${offer.id}`)
			.set(offer)
		res.status(201).json({ offer })
	} catch (error) {
		res.status(400).json({ error })
	}
})

//Getting all offers
router.get('/getAllOffers', async (req: Request, res: Response) => {
	try {
		const allOffers = await firebase.database().ref('offers').get()

		res.send(allOffers.toJSON())
	} catch (error) {
		console.log(error)
	}
})

//Getting one certain offer
router.get('/getOffer/:id', async (req: Request, res: Response) => {
	const offerId = req.params.id
	try {
		await firebase
			.database()
			.ref(`offers/${offerId}`)
			.once('value', (snapshot) => {
				res.status(201).send(snapshot.toJSON())
			})
	} catch (error) {
		console.log(error)
	}
})

//Editing offer data
router.post('/edit', async (req: Request, res: Response) => {
	const offer: Offer = req.body
	try {
		const editedOffer = await firebase
			.database()
			.ref(`offers/${offer.id}`)
			.set(offer)
		res.status(201).json({ message: 'offerchanged' })
	} catch (error) {
		res.status(400).json({ error })
	}
})

//Archiving offer
router.post('/archive', async (req: Request, res: Response) => {
	const offer: Offer = req.body
	try {
		await firebase
			.database()
			.ref(`offers/${offer.id}/status`)
			.set(offer.status)
		res.status(201).json({ message: 'offerarchived' })
	} catch (error) {
		res.status(400).json({ error })
	}
})

//Deleting offer
router.post('/delete', async (req: Request, res: Response) => {
	const offer: Offer = req.body
	try {
		await firebase.database().ref(`offers/${offer.id}`).remove()
		res.status(201).json({ message: 'offerdeleted' })
	} catch (error) {
		res.status(400).json({ error })
	}
})

router.get('/getOffersFromUser/:id', async (req: Request, res: Response) => {
	const userId = req.params.id

	try {
		await firebase
			.database()
			.ref(`offers`)
			.orderByChild('createdBy')
			.equalTo(userId)
			.once('value', (snapshot) => {
				const offersFromUser = snapshot.toJSON()
				res.status(201).send(offersFromUser)
			})
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
